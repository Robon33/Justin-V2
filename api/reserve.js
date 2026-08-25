// Vercel Serverless Function — receives reservation requests, enforces the daily seating
// capacity, and emails accepted requests via Resend.
// Requires env vars (set in Vercel dashboard > Project > Settings > Environment Variables):
//   RESEND_API_KEY        -> your Resend API key
//   RESERVATION_TO        -> the email address that should receive reservations
//   RESERVATION_FROM      -> the verified "from" address (Resend requires a verified domain,
//                            e.g. "Justin Café <reservations@justincafe.fr>")
//   RESERVATION_CAPACITY  -> max number of guests per day, all time slots combined (default 120)
//   KV_REST_API_URL / KV_REST_API_TOKEN -> Vercel KV (Upstash Redis) REST credentials, used to
//                            track guests already booked per day. Add a KV store to the Vercel
//                            project (Storage tab) and these are injected automatically. If
//                            absent, the capacity check is skipped rather than blocking every
//                            reservation — the form still works, just without the cap.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, guests, date, time, message } = req.body || {};

  if (!name || !email || !phone || !guests || !date || !time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Basic email format sanity check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const guestsNum = Number(guests);
  if (!Number.isFinite(guestsNum) || guestsNum <= 0) {
    return res.status(400).json({ error: 'Invalid guests count' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESERVATION_TO;
  const from = process.env.RESERVATION_FROM;

  if (!apiKey || !to || !from) {
    console.error('Missing RESEND_API_KEY, RESERVATION_TO or RESERVATION_FROM env vars');
    return res.status(500).json({ error: 'Server not configured' });
  }

  const capacity = Number(process.env.RESERVATION_CAPACITY) || 120;
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;
  const capacityKey = `reservations:${date}`;
  let capacityReserved = false;

  if (kvUrl && kvToken) {
    try {
      const newTotal = await kvCommand(kvUrl, kvToken, ['INCRBY', capacityKey, guestsNum]);
      capacityReserved = true;
      await kvCommand(kvUrl, kvToken, ['EXPIRE', capacityKey, 60 * 60 * 24 * 60]);

      if (newTotal > capacity) {
        await kvCommand(kvUrl, kvToken, ['DECRBY', capacityKey, guestsNum]);
        capacityReserved = false;
        return res.status(409).json({
          error: 'Full',
          message: `Complet pour le ${date}, merci de choisir une autre date ou de nous appeler directement.`,
        });
      }
    } catch (err) {
      console.error('KV capacity check error:', err);
      // Fail open: don't block reservations if the capacity check itself is broken.
    }
  }

  const html = `
    <h2>Nouvelle demande de réservation, Justin Café</h2>
    <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
    <p><strong>Email :</strong> ${escapeHtml(email)}</p>
    <p><strong>Téléphone :</strong> ${escapeHtml(phone)}</p>
    <p><strong>Personnes :</strong> ${escapeHtml(String(guests))}</p>
    <p><strong>Date :</strong> ${escapeHtml(date)}</p>
    <p><strong>Heure :</strong> ${escapeHtml(time)}</p>
    <p><strong>Message :</strong> ${message ? escapeHtml(message) : 'Aucun'}</p>
  `;

  const confirmationHtml = `
    <h2>Merci ${escapeHtml(name)}, votre table est confirmée !</h2>
    <p>Voici le récapitulatif de votre réservation chez Justin Café :</p>
    <ul>
      <li><strong>Date :</strong> ${escapeHtml(date)}</li>
      <li><strong>Heure :</strong> ${escapeHtml(time)}</li>
      <li><strong>Personnes :</strong> ${escapeHtml(String(guests))}</li>
    </ul>
    <p>Une question, un empêchement ou besoin de modifier l'heure ? Répondez directement à cet email ou appelez-nous.</p>
    <p>À très vite,<br>L'équipe Justin Café</p>
  `;

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `Réservation Justin Café, ${name} (${guests} pers., ${date} ${time})`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const errBody = await resendRes.text();
      console.error('Resend error:', errBody);
      if (capacityReserved) {
        await kvCommand(kvUrl, kvToken, ['DECRBY', capacityKey, guestsNum]).catch(() => {});
      }
      return res.status(502).json({ error: 'Email provider error' });
    }

    // Best-effort confirmation to the customer: a failure here shouldn't fail the
    // reservation itself, since the owner has already been notified. Awaited (rather than
    // fired-and-forgotten) because Vercel can freeze the function as soon as a response is sent.
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: email,
          subject: 'Votre demande de réservation chez Justin Café',
          html: confirmationHtml,
        }),
      });
    } catch (err) {
      console.error('Customer confirmation email error:', err);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Reservation handler error:', err);
    if (capacityReserved) {
      await kvCommand(kvUrl, kvToken, ['DECRBY', capacityKey, guestsNum]).catch(() => {});
    }
    return res.status(500).json({ error: 'Internal error' });
  }
}

async function kvCommand(url, token, command) {
  const path = command.map(part => encodeURIComponent(String(part))).join('/');
  const res = await fetch(`${url}/${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`KV command failed: ${res.status}`);
  }
  const data = await res.json();
  return data.result;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
