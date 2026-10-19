import type { Video } from "../types/tmdb";
import { isRecord } from "../utils/isRecord";

function toVideo(value: unknown): Video | null {
  if (!isRecord(value) || typeof value.key !== "string" || typeof value.site !== "string") {
    return null;
  }

  return {
    key: value.key,
    site: value.site,
    type: typeof value.type === "string" ? value.type : "",
    official: value.official === true,
  };
}

/** Narrows a TMDb `/movie/{id}/videos` response, dropping malformed entries. */
export function parseVideos(payload: unknown): ReadonlyArray<Video> {
  if (!isRecord(payload) || !Array.isArray(payload.results)) {
    throw new TypeError("Unexpected TMDb video list response");
  }

  const results: ReadonlyArray<unknown> = payload.results;
  return results.map(toVideo).filter((video) => video !== null);
}
