export interface MangaAltTitle {
  [languageCode: string]: string;
}

export interface MangaSearchResult {
  id: string;
  title: string;
  altTitles: MangaAltTitle[];
  description?: string;
  status: string;
  releaseDate?: number;
  contentRating: string;
  lastVolume?: string;
  lastChapter?: string;
  image: string;
}

export interface MangaSearchResponse {
  currentPage: number;
  results: MangaSearchResult[];
}
