export interface RefererHeader {
  Referer: string;
}

export interface MangaSearchResult {
  id: string;
  title: string;
  headerForImage: RefererHeader;
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
  headers: RefererHeader;
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
  headerForImage: RefererHeader;
}

export type MangaChapterPages = MangaPage[];
