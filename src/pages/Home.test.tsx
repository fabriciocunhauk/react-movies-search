import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Home } from "./Home";

const tmdbMovie = (id: number, title: string) => ({
  id,
  title,
  overview: `${title} overview`,
  poster_path: `/poster-${id}.jpg`,
  backdrop_path: `/backdrop-${id}.jpg`,
  release_date: "2024-05-01",
  vote_average: 7.45,
});

const ROUTES: Readonly<Record<string, unknown>> = {
  "/3/trending/movie/day": { results: [tmdbMovie(1, "Dune"), tmdbMovie(2, "Alien")] },
  "/3/search/movie": { results: [tmdbMovie(3, "Star Wars")] },
  "/3/movie/1/videos": {
    results: [
      { key: "teaser-key", site: "YouTube", type: "Teaser", official: true },
      { key: "trailer-key", site: "YouTube", type: "Trailer", official: true },
    ],
  },
  "/3/movie/2/videos": { results: [] },
};

const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
  const url = new URL(input instanceof Request ? input.url : input);
  const body = ROUTES[url.pathname];
  return new Response(JSON.stringify(body ?? {}), { status: body ? 200 : 404 });
});

const requestedUrls = () =>
  fetchMock.mock.calls.map(([input]) => new URL(input instanceof Request ? input.url : input));

describe("Home", () => {
  beforeEach(() => vi.stubGlobal("fetch", fetchMock));
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    fetchMock.mockReset();
  });

  it("shows trending films with the first one featured", async () => {
    render(<Home />);

    expect(await screen.findByRole("heading", { name: "Dune", level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Play trailer: Alien (2024)" })).toBeInTheDocument();
    expect(screen.getByText("Trending today · 2 films")).toBeInTheDocument();
  });

  it("searches with the typed query and shows the results", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await screen.findByRole("heading", { name: "Dune", level: 2 });

    await user.type(screen.getByRole("searchbox", { name: "Search films by title" }), "Star Wars & co");
    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(await screen.findByRole("button", { name: "Play trailer: Star Wars (2024)" })).toBeInTheDocument();
    const searchUrl = requestedUrls().find((url) => url.pathname === "/3/search/movie");
    expect(searchUrl?.searchParams.get("query")).toBe("Star Wars & co");
    expect(screen.queryByRole("heading", { name: "Dune", level: 2 })).not.toBeInTheDocument();
  });

  it("explains an empty search and returns to trending", async () => {
    fetchMock.mockImplementation(async (input: RequestInfo | URL) => {
      const url = new URL(input instanceof Request ? input.url : input);
      const body = url.pathname === "/3/search/movie" ? { results: [] } : ROUTES[url.pathname];
      return new Response(JSON.stringify(body));
    });
    const user = userEvent.setup();
    render(<Home />);
    await screen.findByRole("heading", { name: "Dune", level: 2 });

    await user.type(screen.getByRole("searchbox", { name: "Search films by title" }), "zzzz");
    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(await screen.findByText("No films match “zzzz”")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Back to trending" }));
    expect(await screen.findByRole("heading", { name: "Dune", level: 2 })).toBeInTheDocument();
  });

  it("returns to trending from the wordmark", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await screen.findByRole("heading", { name: "Dune", level: 2 });

    await user.type(screen.getByRole("searchbox", { name: "Search films by title" }), "Star Wars");
    await user.click(screen.getByRole("button", { name: "Search" }));
    await screen.findByText("Search results · 1 film");

    await user.click(screen.getByRole("button", { name: "Picture·House" }));
    expect(await screen.findByText("Trending today · 2 films")).toBeInTheDocument();
  });

  it("plays the official trailer in a dialog that closes on Escape", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(await screen.findByRole("button", { name: "Play trailer: Dune (2024)" }));

    const dialog = await screen.findByRole("dialog", { name: "Dune" });
    const player = await within(dialog).findByTitle("Dune trailer");
    expect(player).toHaveAttribute("src", expect.stringContaining("/embed/trailer-key"));

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("plays the featured trailer from the hero and closes via the button or backdrop", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(await screen.findByRole("button", { name: "Play trailer" }));
    await user.click(await screen.findByRole("button", { name: "Close trailer" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Play trailer" }));
    await user.click(await screen.findByRole("dialog", { name: "Dune" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("explains when the trailer cannot be loaded", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const user = userEvent.setup();
    render(<Home />);
    const card = await screen.findByRole("button", { name: "Play trailer: Dune (2024)" });

    fetchMock.mockRejectedValueOnce(new TypeError("Network down"));
    await user.click(card);

    expect(await screen.findByText("Trailer didn't load")).toBeInTheDocument();
  });

  it("explains when a film has no trailer", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(await screen.findByRole("button", { name: "Play trailer: Alien (2024)" }));

    expect(await screen.findByText("No trailer yet")).toBeInTheDocument();
  });

  it("offers a retry when TMDb cannot be reached", async () => {
    fetchMock.mockRejectedValueOnce(new TypeError("Network down"));
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const user = userEvent.setup();
    render(<Home />);

    await user.click(await screen.findByRole("button", { name: "Try again" }));

    expect(await screen.findByRole("heading", { name: "Dune", level: 2 })).toBeInTheDocument();
  });
});
