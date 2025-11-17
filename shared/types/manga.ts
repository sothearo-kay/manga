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

export interface MangaDescription {
  [languageCode: string]: string;
}

export interface MangaChapter {
  id: string;
  title: string;
  chapterNumber: string;
  volumeNumber: string;
  pages: number;
}

export interface MangaInfo {
  id: string;
  title: string;
  altTitles: MangaAltTitle[];
  description: MangaDescription;
  genres: string[];
  themes: string[];
  status: string;
  releaseDate: number;
  chapters: MangaChapter[];
  image: string;
}

export interface MangaPage {
  page: number;
  img: string;
  headerForImage: string;
}

export type MangaChapterPages = MangaPage[];
