import { describe, expect, it } from "vitest";
import { formatMovieMeta } from "./formatMovieMeta";

describe("formatMovieMeta", () => {
  it("formats the release year and a one-decimal rating", () => {
    expect(formatMovieMeta({ releaseDate: "1993-06-11", voteAverage: 7.95 })).toEqual({
      year: "1993",
      rating: "8.0",
    });
  });

  it("falls back when the date or rating is missing", () => {
    expect(formatMovieMeta({ releaseDate: "", voteAverage: 0 })).toEqual({ year: "TBA", rating: "NR" });
  });
});
