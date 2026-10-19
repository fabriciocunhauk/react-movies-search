import type { Video } from "../types/tmdb";

/** Prefers an official YouTube trailer, then any YouTube trailer, then any YouTube video. */
export function pickTrailerKey(videos: ReadonlyArray<Video>): string | null {
  const youtube = videos.filter((video) => video.site === "YouTube");
  const trailers = youtube.filter((video) => video.type === "Trailer");
  const best = trailers.find((video) => video.official) ?? trailers[0] ?? youtube[0];

  return best?.key ?? null;
}
