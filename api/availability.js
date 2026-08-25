// Vercel Serverless Function — lets the café owner check and correct the daily reservation
// count used by api/reserve.js to enforce the seating cap. Protected by a shared secret.
// Requires env vars:
//   ADMIN_TOKEN                         -> a password you choose yourself; sent as
//                                          "Authorization: Bearer <token>" by admin.html
//   KV_REST_API_URL / KV_REST_API_TOKEN -> same Vercel KV (Upstash) store used by api/reserve.js
//   RESERVATION_CAPACITY                -> same cap used by api/reserve.js (default 120)

export default async function handler(req, res) {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) {
    console.error('Missing ADMIN_TOKEN env var');
    return res.status(500).json({ error: 'Server not configured' });
  }

  const provided = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (provided !== adminToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;
  if (!kvUrl || !kvToken) {
    console.error('Missing KV_REST_API_URL or KV_REST_API_TOKEN env vars');
    return res.status(500).json({ error: 'Server not configured' });
  }

  const capacity = Number(process.env.RESERVATION_CAPACITY) || 120;

  if (req.method === 'GET') {
    const { date } = req.query || {};
    if (!date) return res.status(400).json({ error: 'Missing date' });

    try {
      const raw = await kvCommand(kvUrl, kvToken, ['GET', `reservations:${date}`]);
      const reserved = Number(raw) || 0;
      return res.status(200).json({ date, capacity, reserved, remaining: Math.max(0, capacity - reserved) });
    } catch (err) {
      console.error('Availability GET error:', err);
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  if (req.method === 'POST') {
    const { date, reserved } = req.body || {};
    const reservedNum = Number(reserved);
    if (!date || !Number.isFinite(reservedNum) || reservedNum < 0) {
      return res.status(400).json({ error: 'Invalid date or reserved value' });
    }

    try {
      const key = `reservations:${date}`;
      await kvCommand(kvUrl, kvToken, ['SET', key, reservedNum]);
      await kvCommand(kvUrl, kvToken, ['EXPIRE', key, 60 * 60 * 24 * 60]);
      return res.status(200).json({
        date,
        capacity,
        reserved: reservedNum,
        remaining: Math.max(0, capacity - reservedNum),
      });
    } catch (err) {
      console.error('Availability POST error:', err);
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
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
