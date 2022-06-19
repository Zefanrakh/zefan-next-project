export type TitleType = {
  romaji?: string | null;
  english?: string | null;
  native?: string | null;
  userPreferred?: string | null;
};

export type FuzzyDate = {
  year: number;
  month: number;
  day: number;
};

export type StudiosNodeType = {
  id: number;
  name: string;
};

export type StudiosType = {
  nodes: StudiosNodeType[];
};

export type TrailerType = {
  id: string;
  site: string;
  thumbnail: string;
};

export type CoverImageType = {
  extraLarge?: string | null;
  large?: string | null;
  medium?: string | null;
};

export type Anime = {
  id: number;
  title?: TitleType | null;
  type?: string | null;
  description?: string | null;
  genres: string[];
  hashtag?: string | null;
  averageScore?: number | null;
  startDate?: FuzzyDate | null;
  endDate?: FuzzyDate | null;
  studios: StudiosType;
  trailer?: TrailerType | null;
  coverImage?: CoverImageType | null;
  bannerImage?: string | null;
  episodes?: number | null;
  chapters?: number | null;
  volumes?: number | null;
};

export type PageQueryResponseDataPageInfoType = {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
};

export type PageQueryResponseDataPageType = {
  pageInfo: PageQueryResponseDataPageInfoType;
  media: Anime[];
};

export type PageQueryResponseDataType = {
  Page: PageQueryResponseDataPageType;
};

export type PageQueryResponseType = {
  data: PageQueryResponseDataType;
};

export type PageQueryRequestType = {
  page?: number;
  perPage?: number;
  sort?: string;
  id?: number;
  id_in?: number[];
};
