import type { Movie } from "../../types/tmdb";
import { formatMovieMeta } from "../../utils/formatMovieMeta";
import { tmdbImageUrl } from "../../utils/tmdbImageUrl";
import { PlayIcon } from "../icons/PlayIcon";

interface MovieCardProps {
  readonly movie: Movie;
  readonly onSelect: (movie: Movie) => void;
}

export function MovieCard({ movie, onSelect }: MovieCardProps) {
  const { year, rating } = formatMovieMeta(movie);

  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(movie)}
        aria-label={`Play trailer: ${movie.title} (${year})`}
        className="group focus-ring block w-full rounded-lg text-left"
      >
        <span className="relative block aspect-2/3 overflow-hidden rounded-lg bg-curtain ring-1 ring-seat transition duration-300 group-hover:-translate-y-1 group-hover:ring-marquee/60 motion-reduce:transform-none">
          {movie.posterPath && (
            <img
              src={tmdbImageUrl(movie.posterPath, "poster")}
              alt=""
              loading="lazy"
              className="size-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transform-none"
            />
          )}
          <span className="absolute inset-0 flex items-center justify-center bg-velvet/55 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <span className="flex size-14 items-center justify-center rounded-full bg-ticket text-white shadow-lg">
              <PlayIcon className="size-6 translate-x-0.5" />
            </span>
          </span>
        </span>
        <span className="mt-3 block truncate text-sm font-semibold text-screen">{movie.title}</span>
        <span className="meta-label mt-1 block">
          {year} · ★ {rating}
        </span>
      </button>
    </li>
  );
}
