import type { Movie } from "../types/tmdb";
import { isRecord } from "../utils/isRecord";

const stringOr = <T>(value: unknown, fallback: T): string | T =>
  typeof value === "string" && value !== "" ? value : fallback;

function toMovie(value: unknown): Movie | null {
  if (!isRecord(value) || typeof value.id !== "number" || typeof value.title !== "string") {
    return null;
  }

  return {
    id: value.id,
    title: value.title,
    overview: stringOr(value.overview, ""),
    posterPath: stringOr(value.poster_path, null),
    backdropPath: stringOr(value.backdrop_path, null),
    releaseDate: stringOr(value.release_date, ""),
    voteAverage: typeof value.vote_average === "number" ? value.vote_average : 0,
  };
}

/** Narrows a TMDb paginated movie response, dropping malformed entries. */
export function parseMovies(payload: unknown): ReadonlyArray<Movie> {
  if (!isRecord(payload) || !Array.isArray(payload.results)) {
    throw new TypeError("Unexpected TMDb movie list response");
  }

  const results: ReadonlyArray<unknown> = payload.results;
  return results.map(toMovie).filter((movie) => movie !== null);
}
