export const runtime = "edge";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const url = query.url as string;
  const referer = query.referer as string | undefined;

  if (!url) {
    throw createError({ statusCode: 400, statusMessage: "Missing url" });
  }

  try {
    const res = await fetch(url, {
      headers: {
        ...(referer ? { Referer: referer } : {}),
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!res.ok) {
      throw createError({ statusCode: res.status, statusMessage: "Failed to fetch image" });
    }

    const contentType = res.headers.get("Content-Type") ?? "image/jpeg";

    setHeader(event, "Content-Type", contentType);
    setHeader(event, "Cache-Control", "public, s-maxage=86400, stale-while-revalidate=2592000");

    return res.body;
  }
  catch {
    throw createError({ statusCode: 500, statusMessage: "Proxy image fetch failed" });
  }
});
