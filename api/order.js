// Vercel Serverless Function — receives click & collect orders and emails them via Resend.
// Reuses the same env vars as api/reserve.js:
//   RESEND_API_KEY, RESERVATION_TO, RESERVATION_FROM

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, date, time, items, total, diningMode } = req.body || {};

  if (!name || !email || !phone || !date || !time || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

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

  const itemsRows = items.map(i =>
    `<tr><td style="padding:4px 8px;">${escapeHtml(i.name)}</td><td style="padding:4px 8px;">× ${escapeHtml(String(i.qty))}</td><td style="padding:4px 8px;">${Number(i.price * i.qty).toFixed(2)} €</td></tr>`
  ).join('');

  const modeLabel = diningMode === 'emporter' ? 'À emporter' : 'Sur place';

  const html = `
    <h2>Nouvelle commande Click &amp; Collect — Justin Café</h2>
    <p><strong>Client :</strong> ${escapeHtml(name)}</p>
    <p><strong>Email :</strong> ${escapeHtml(email)}</p>
    <p><strong>Téléphone :</strong> ${escapeHtml(phone)}</p>
    <p><strong>Mode :</strong> ${escapeHtml(modeLabel)}</p>
    <p><strong>Retrait :</strong> ${escapeHtml(date)} à ${escapeHtml(time)}</p>
    <table style="border-collapse:collapse; margin-top:1em;">${itemsRows}</table>
    <p style="margin-top:1em;"><strong>Total : ${Number(total).toFixed(2)} €</strong> (paiement sur place)</p>
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
        subject: `Commande Click & Collect — ${name} (${modeLabel}, retrait ${date} ${time})`,
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
    console.error('Order handler error:', err);
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
