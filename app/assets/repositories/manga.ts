import type { $Fetch } from "nitropack/types";

export function mangaRepository(fetch: $Fetch) {
  return {
    search: (query: string) => {
      return fetch<MangaSearchResponse>(`/mangadex/${query}`);
    },

    info: (id: string) => {
      return fetch<MangaInfo>("/mangadex/info", {
        query: { id },
      });
    },

    read: (chapterId: string) => {
      return fetch<MangaChapterPages>(`/mangadex/read/${chapterId}`);
    },
  };
}
