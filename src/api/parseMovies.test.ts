import { describe, expect, it } from "vitest";
import { parseMovies } from "./parseMovies";

describe("parseMovies", () => {
  it("maps TMDb fields and drops malformed entries", () => {
    const movies = parseMovies({
      results: [
        { id: 1, title: "Dune", poster_path: "/p.jpg", backdrop_path: null, release_date: "", vote_average: 8 },
        { id: "2", title: "Bad id" },
        null,
      ],
    });

    expect(movies).toEqual([
      {
        id: 1,
        title: "Dune",
        overview: "",
        posterPath: "/p.jpg",
        backdropPath: null,
        releaseDate: "",
        voteAverage: 8,
      },
    ]);
  });

  it("rejects payloads without a results array", () => {
    expect(() => parseMovies({ status_message: "Invalid API key" })).toThrow(TypeError);
  });
});
