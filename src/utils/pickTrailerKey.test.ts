import { describe, expect, it } from "vitest";
import type { Video } from "../types/tmdb";
import { pickTrailerKey } from "./pickTrailerKey";

const video = (overrides: Partial<Video>): Video => ({
  key: "key",
  site: "YouTube",
  type: "Teaser",
  official: false,
  ...overrides,
});

describe("pickTrailerKey", () => {
  it("prefers an official YouTube trailer", () => {
    const videos = [
      video({ key: "teaser" }),
      video({ key: "fan-trailer", type: "Trailer" }),
      video({ key: "official", type: "Trailer", official: true }),
    ];
    expect(pickTrailerKey(videos)).toBe("official");
  });

  it("falls back to any YouTube video when there is no trailer", () => {
    expect(pickTrailerKey([video({ key: "vimeo", site: "Vimeo" }), video({ key: "clip" })])).toBe("clip");
  });

  it("returns null when there are no YouTube videos", () => {
    expect(pickTrailerKey([video({ site: "Vimeo" })])).toBeNull();
    expect(pickTrailerKey([])).toBeNull();
  });
});
