// Vercel Serverless Function — returns the 4 latest Instagram posts for the homepage module.
// Requires an env var (set in Vercel dashboard > Project > Settings > Environment Variables):
//   IG_ACCESS_TOKEN -> long-lived Instagram access token, obtained via "Instagram API with
//                      Instagram Login" (Instagram Business/Creator account required):
//                      https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login
//
// Note: long-lived tokens expire after ~60 days and must be refreshed periodically by calling
//   GET https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=TOKEN
// then updating IG_ACCESS_TOKEN in Vercel with the new token (redeploy needed).

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const accessToken = process.env.IG_ACCESS_TOKEN;

  if (!accessToken) {
    console.error('Missing IG_ACCESS_TOKEN env var');
    return res.status(500).json({ error: 'Server not configured' });
  }

  try {
    const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
    const igRes = await fetch(
      `https://graph.instagram.com/me/media?fields=${fields}&limit=4&access_token=${accessToken}`
    );

    if (!igRes.ok) {
      const errBody = await igRes.text();
      console.error('Instagram API error:', errBody);
      return res.status(502).json({ error: 'Instagram API error' });
    }

    const data = await igRes.json();
    const posts = (data.data || []).slice(0, 4).map(item => ({
      id: item.id,
      caption: item.caption || '',
      permalink: item.permalink,
      imageUrl: item.media_type === 'VIDEO' ? item.thumbnail_url : item.media_url,
      timestamp: item.timestamp,
    }));

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json({ posts });
  } catch (err) {
    console.error('Instagram handler error:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
