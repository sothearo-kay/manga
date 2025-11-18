import type { $Fetch } from "nitropack/types";

export function mangaRepository(fetch: $Fetch) {
  return {
    search: async (query: string) => {
      return tryCatch(fetch<MangaSearchResponse>(`/${query}`));
    },

    info: async (id: string) => {
      return tryCatch(fetch<MangaInfo>("/info", { query: { id } }));
    },

    read: async (chapterId: string) => {
      return tryCatch(fetch<MangaChapterPages>("read", { query: { chapterId } }));
    },
  };
}
