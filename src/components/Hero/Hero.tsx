import type { Movie } from "../../types/tmdb";
import { formatMovieMeta } from "../../utils/formatMovieMeta";
import { tmdbImageUrl } from "../../utils/tmdbImageUrl";
import { Button } from "../Button/Button";
import { PlayIcon } from "../icons/PlayIcon";

interface HeroProps {
  readonly movie: Movie;
  readonly onPlay: (movie: Movie) => void;
}

export function Hero({ movie, onPlay }: HeroProps) {
  const { year, rating } = formatMovieMeta(movie);

  return (
    <section aria-labelledby="featured-title" className="relative isolate overflow-hidden">
      {movie.backdropPath && (
        <img
          src={tmdbImageUrl(movie.backdropPath, "backdrop")}
          alt=""
          className="absolute inset-0 -z-10 size-full object-cover object-top opacity-70"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-velvet via-velvet/60 to-velvet/10" />

      <div className="mx-auto flex min-h-[72svh] max-w-7xl items-end px-4 pt-24 pb-12 sm:px-6 lg:px-8">
        <div className="marquee-frame w-full max-w-2xl">
          <p className="meta-label text-marquee">Now showing · Trending today</p>
          <h2
            id="featured-title"
            className="mt-3 font-display text-5xl leading-[0.9] tracking-wide text-balance sm:text-7xl"
          >
            {movie.title}
          </h2>
          <p className="meta-label mt-3">
            {year} · ★ {rating}
          </p>
          <p className="mt-4 line-clamp-3 max-w-prose leading-relaxed text-screen/85">
            {movie.overview}
          </p>
          <Button className="mt-6" onClick={() => onPlay(movie)}>
            <PlayIcon className="size-4" />
            Play trailer
          </Button>
        </div>
      </div>
    </section>
  );
}
