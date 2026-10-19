import { useCallback, useEffect, useState } from "react";
import { tmdbClient } from "../api/tmdbClient";
import type { Movie } from "../types/tmdb";

type MoviesStatus = "loading" | "ready" | "error";

interface MoviesState {
  readonly status: MoviesStatus;
  readonly movies: ReadonlyArray<Movie>;
  /** `null` means the trending list is showing. */
  readonly query: string | null;
}

interface MoviesRequest {
  readonly id: number;
  readonly query: string | null;
}

export function useMovies() {
  const [state, setState] = useState<MoviesState>({ status: "loading", movies: [], query: null });
  const [request, setRequest] = useState<MoviesRequest>({ id: 0, query: null });

  useEffect(() => {
    const controller = new AbortController();
    const { query } = request;
    const pending =
      query === null
        ? tmdbClient.trending(controller.signal)
        : tmdbClient.search(query, controller.signal);

    pending
      .then((movies) => setState({ status: "ready", movies, query }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error(error);
        setState({ status: "error", movies: [], query });
      });

    return () => controller.abort();
  }, [request]);

  const load = useCallback((query: string | null) => {
    setState({ status: "loading", movies: [], query });
    setRequest((previous) => ({ id: previous.id + 1, query }));
  }, []);

  const search = useCallback((query: string) => load(query), [load]);
  const showTrending = useCallback(() => load(null), [load]);
  const retry = useCallback(() => load(request.query), [load, request.query]);

  return { ...state, search, showTrending, retry };
}
