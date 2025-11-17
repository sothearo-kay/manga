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

export interface MangaChapter {
  id: string;
  title: string;
  releaseDate: string | null;
}

export interface MangaInfo {
  id: string;
  title: string;
  altTitles: MangaAltTitle[] | null;
  genres: string[] | null;
  headerForImage: string | null;
  image: string | null;
  chapters: MangaChapter[];
}

export interface MangaPage {
  page: number;
  img: string;
  headerForImage: string;
}

export type MangaChapterPages = MangaPage[];
