export interface MangaAltTitle {
  [languageCode: string]: string;
}

export interface MangaSearchResult {
  id: string;
  title: string;
  headerForImage: {
    Referer: string;
  };
  image: string;
  description: string;
  status: string;
}

export interface MangaSearchResponse {
  currentPage: number;
  hasNextPage: boolean;
  results: MangaSearchResult[];
}

export interface MangaChapter {
  id: string;
  title: string;
  releasedDate: string;
}

export interface MangaInfo {
  id: string;
  title: string;
  description: string;
  headers: {
    Referer: string;
  };
  image: string;
  genres: string[];
  status: string;
  rating: number;
  authors: string[];
  chapters: MangaChapter[];
}

export interface MangaPage {
  page: number;
  img: string;
  headerForImage: string;
}

export type MangaChapterPages = MangaPage[];
