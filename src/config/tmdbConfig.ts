export const TMDB_CONFIG = Object.freeze({
  apiBase: "https://api.themoviedb.org/3",
  imageBase: "https://image.tmdb.org/t/p",
  language: "en-US",
  imageSizes: Object.freeze({
    poster: "w342",
    backdrop: "w1280",
  }),
} as const);

export type TmdbImageSize = keyof typeof TMDB_CONFIG.imageSizes;
