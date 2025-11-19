export async function useManga(mangaId: string) {
  const { $api } = useNuxtApp();

  const { data: result, status } = await useAsyncData(
    `manga-${mangaId}`,
    () => $api.manga.info(mangaId),
  );

  const manga = computed(() => result.value?.data);
  const error = computed(() => result.value?.error);

  return {
    manga,
    error,
    status,
  };
}
