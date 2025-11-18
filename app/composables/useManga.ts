export async function useManga(mangaId: string) {
  const { $api } = useNuxtApp();

  const { data: result, status } = await useAsyncData(
    `manga-${mangaId}`,
    () => $api.manga.info(mangaId),
  );

  const manga = computed(() => result.value?.data);
  const error = computed(() => result.value?.error);

  const uniqueChapters = computed(() => {
    if (!manga.value?.chapters)
      return [];

    const seen = new Map();

    for (const chapter of manga.value.chapters) {
      const key = `${chapter.volumeNumber}-${chapter.chapterNumber}`;
      const existing = seen.get(key);

      // Keep the chapter with more pages, or the first one if pages are equal
      if (!existing || chapter.pages > existing.pages) {
        seen.set(key, chapter);
      }
    }

    return Array.from(seen.values());
  });

  return {
    manga,
    error,
    status,
    uniqueChapters,
  };
}
