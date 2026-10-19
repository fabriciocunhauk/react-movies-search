import { env } from "../config/env";
import { TMDB_CONFIG } from "../config/tmdbConfig";
import { parseMovies } from "./parseMovies";
import { parseVideos } from "./parseVideos";

async function request(
  path: string,
  params: Readonly<Record<string, string>>,
  signal?: AbortSignal,
): Promise<unknown> {
  if (!env.ok) throw new Error(env.error);

  const url = new URL(`${TMDB_CONFIG.apiBase}${path}`);
  url.search = new URLSearchParams({ api_key: env.tmdbToken, ...params }).toString();

  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`TMDb request failed with status ${response.status}`);

  const payload: unknown = await response.json();
  return payload;
}

export const tmdbClient = Object.freeze({
  trending: (signal?: AbortSignal) =>
    request("/trending/movie/day", { language: TMDB_CONFIG.language }, signal).then(parseMovies),

  search: (query: string, signal?: AbortSignal) =>
    request(
      "/search/movie",
      { query, language: TMDB_CONFIG.language, page: "1", include_adult: "false" },
      signal,
    ).then(parseMovies),

  videos: (movieId: number, signal?: AbortSignal) =>
    request(`/movie/${movieId}/videos`, {}, signal).then(parseVideos),
});
