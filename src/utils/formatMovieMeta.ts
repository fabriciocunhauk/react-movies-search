import type { Movie } from "../types/tmdb";

interface MovieMeta {
  readonly year: string;
  readonly rating: string;
}

export function formatMovieMeta(movie: Pick<Movie, "releaseDate" | "voteAverage">): MovieMeta {
  return {
    year: movie.releaseDate ? movie.releaseDate.slice(0, 4) : "TBA",
    rating: movie.voteAverage > 0 ? movie.voteAverage.toFixed(1) : "NR",
  };
}
