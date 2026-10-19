import { TMDB_CONFIG, type TmdbImageSize } from "../config/tmdbConfig";

export function tmdbImageUrl(path: string, size: TmdbImageSize): string {
  return `${TMDB_CONFIG.imageBase}/${TMDB_CONFIG.imageSizes[size]}${path}`;
}
