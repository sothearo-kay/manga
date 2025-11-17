import type { $Fetch } from "nitropack/types";

export function mangaRepository(fetch: $Fetch) {
  return {
    search: async (query: string) => {
      return tryCatch(fetch<MangaSearchResponse>(`/mangadex/${query}`));
    },

    info: async (id: string) => {
      return tryCatch(fetch<MangaInfo>(`/mangadex/info/${id}`));
    },

    read: async (chapterId: string) => {
      return tryCatch(fetch<MangaChapterPages>(`/mangadex/read/${chapterId}`));
    },
  };
}
