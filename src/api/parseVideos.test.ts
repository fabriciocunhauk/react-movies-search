import { describe, expect, it } from "vitest";
import { parseVideos } from "./parseVideos";

describe("parseVideos", () => {
  it("maps TMDb fields and drops malformed entries", () => {
    const videos = parseVideos({
      results: [{ key: "abc", site: "YouTube", type: "Trailer", official: true }, { key: "no-site" }, "junk"],
    });

    expect(videos).toEqual([{ key: "abc", site: "YouTube", type: "Trailer", official: true }]);
  });

  it("rejects payloads without a results array", () => {
    expect(() => parseVideos([])).toThrow(TypeError);
  });
});
