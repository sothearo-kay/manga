export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const url = query.url as string;
  const referer = query.referer as string;

  if (!url)
    return sendError(event, createError({ statusCode: 400, statusMessage: "Missing url" }));

  try {
    const response = await $fetch<ArrayBuffer>(url, {
      method: "GET",
      responseType: "arrayBuffer",
      headers: {
        "Referer": referer,
        "User-Agent": "Mozilla/5.0",
      },
    });

    const type = url.endsWith(".png")
      ? "image/png"
      : url.endsWith(".gif")
        ? "image/gif"
        : "image/jpeg";

    setHeader(event, "Content-Type", type);
    setHeader(event, "Cache-Control", "public, max-age=3600");

    return new Uint8Array(response);
  }
  catch (err) {
    console.error("Proxy error:", err);
    throw createError({ statusCode: 500, statusMessage: "Proxy image fetch failed" });
  }
});
