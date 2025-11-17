import type { $Fetch } from "nitropack/types";

export function mangaRepository(fetch: $Fetch) {
  return {
    search: (query: string) => {
      return fetch<MangaSearchResponse>(`/mangadex/${query}`);
    },
  };
}
