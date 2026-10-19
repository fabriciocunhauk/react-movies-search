import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("App", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("explains how to configure a missing TMDb key", async () => {
    vi.stubEnv("VITE_TMDB_TOKEN", "");
    const { App } = await import("./App");

    render(<App />);

    expect(screen.getByText("Setup needed")).toBeInTheDocument();
    expect(screen.getByText(/VITE_TMDB_TOKEN is not set/)).toBeInTheDocument();
  });
});
