import type { OpenTrailerState } from "../../hooks/useTrailer";
import { StatusMessage } from "../StatusMessage/StatusMessage";

interface TrailerScreenProps {
  readonly trailer: OpenTrailerState;
}

export function TrailerScreen({ trailer }: TrailerScreenProps) {
  switch (trailer.status) {
    case "loading":
      return (
        <div className="flex size-full items-center justify-center">
          <p className="meta-label animate-pulse motion-reduce:animate-none">Threading the reel…</p>
        </div>
      );
    case "ready":
      return (
        <iframe
          className="size-full"
          title={`${trailer.movie.title} trailer`}
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(trailer.videoKey)}?autoplay=1&rel=0`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      );
    case "missing":
      return (
        <StatusMessage title="No trailer yet">
          TMDb doesn't list a YouTube trailer for this film. Try another title.
        </StatusMessage>
      );
    case "error":
      return (
        <StatusMessage title="Trailer didn't load">
          We couldn't reach TMDb. Check your connection, close this window and try again.
        </StatusMessage>
      );
  }
}
