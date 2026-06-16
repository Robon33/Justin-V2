// Vercel Serverless Function — receives reservation requests and emails them via Resend.
// Requires env vars (set in Vercel dashboard > Project > Settings > Environment Variables):
//   RESEND_API_KEY   -> your Resend API key
//   RESERVATION_TO   -> the email address that should receive reservations
//   RESERVATION_FROM -> the verified "from" address (Resend requires a verified domain,
//                       e.g. "Justin Café <reservations@justincafe.fr>")

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

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESERVATION_TO;
  const from = process.env.RESERVATION_FROM;

  if (!apiKey || !to || !from) {
    console.error('Missing RESEND_API_KEY, RESERVATION_TO or RESERVATION_FROM env vars');
    return res.status(500).json({ error: 'Server not configured' });
  }

  const html = `
    <h2>Nouvelle demande de réservation — Justin Café</h2>
    <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
    <p><strong>Email :</strong> ${escapeHtml(email)}</p>
    <p><strong>Téléphone :</strong> ${escapeHtml(phone)}</p>
    <p><strong>Personnes :</strong> ${escapeHtml(String(guests))}</p>
    <p><strong>Date :</strong> ${escapeHtml(date)}</p>
    <p><strong>Heure :</strong> ${escapeHtml(time)}</p>
    <p><strong>Message :</strong> ${message ? escapeHtml(message) : '—'}</p>
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
        subject: `Réservation Justin Café — ${name} (${guests} pers., ${date} ${time})`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const errBody = await resendRes.text();
      console.error('Resend error:', errBody);
      return res.status(502).json({ error: 'Email provider error' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Reservation handler error:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
