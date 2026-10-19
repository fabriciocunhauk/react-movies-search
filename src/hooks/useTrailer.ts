import { useCallback, useEffect, useRef, useState } from "react";
import { tmdbClient } from "../api/tmdbClient";
import type { Movie } from "../types/tmdb";
import { pickTrailerKey } from "../utils/pickTrailerKey";

type TrailerState =
  | { readonly status: "closed" }
  | { readonly status: "loading"; readonly movie: Movie }
  | { readonly status: "ready"; readonly movie: Movie; readonly videoKey: string }
  | { readonly status: "missing"; readonly movie: Movie }
  | { readonly status: "error"; readonly movie: Movie };

export type OpenTrailerState = Exclude<TrailerState, { readonly status: "closed" }>;

export function useTrailer() {
  const [trailer, setTrailer] = useState<TrailerState>({ status: "closed" });
  const controllerRef = useRef<AbortController | null>(null);

  const openTrailer = useCallback((movie: Movie) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setTrailer({ status: "loading", movie });

    tmdbClient
      .videos(movie.id, controller.signal)
      .then((videos) => {
        const videoKey = pickTrailerKey(videos);
        setTrailer(videoKey ? { status: "ready", movie, videoKey } : { status: "missing", movie });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error(error);
        setTrailer({ status: "error", movie });
      });
  }, []);

  const closeTrailer = useCallback(() => {
    controllerRef.current?.abort();
    setTrailer({ status: "closed" });
  }, []);

  useEffect(() => () => controllerRef.current?.abort(), []);

  return { trailer, openTrailer, closeTrailer };
}
