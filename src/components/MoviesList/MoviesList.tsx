import type { Movie } from "../../types/tmdb";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieCardSkeleton } from "./MovieCardSkeleton";

const SKELETON_COUNT = 12;

interface MoviesListProps {
  readonly movies: ReadonlyArray<Movie>;
  readonly isLoading: boolean;
  readonly onSelect: (movie: Movie) => void;
}

export function MoviesList({ movies, isLoading, onSelect }: MoviesListProps) {
  return (
    <ul
      aria-busy={isLoading}
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
    >
      {isLoading
        ? Array.from({ length: SKELETON_COUNT }, (_, index) => <MovieCardSkeleton key={index} />)
        : movies.map((movie) => <MovieCard key={movie.id} movie={movie} onSelect={onSelect} />)}
    </ul>
  );
}
