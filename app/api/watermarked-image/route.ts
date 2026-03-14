export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const src = searchParams.get('src');
  if (!src) {
    return new Response('Missing src parameter', { status: 400 });
  }

  // Fetch the image from the public directory
  const imageUrl = new URL(src, process.env.NEXT_PUBLIC_SITE_URL || 'https://devilliermedia.com').toString();
  const imageRes = await fetch(imageUrl);
  if (!imageRes.ok) {
    return new Response('Image not found', { status: 404 });
  }
  const imageBuffer = await imageRes.arrayBuffer();
  const base64Image = Buffer.from(imageBuffer).toString('base64');

  // Generate SVG with watermark overlay
  const svg = `
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <image href="data:image/jpeg;base64,${base64Image}" x="0" y="0" width="100%" height="100%"/>
      <text x="50%" y="95%" font-size="48" fill="white" font-family="Arial" font-weight="bold" text-anchor="middle" opacity="0.6">
        DEVILLIERMEDIA
      </text>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
