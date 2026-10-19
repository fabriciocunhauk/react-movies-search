import { lazy, Suspense, useMemo } from "react";
import { Button } from "../components/Button/Button";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { Hero } from "../components/Hero/Hero";
import { MoviesList } from "../components/MoviesList/MoviesList";
import { ResultsHeading } from "../components/ResultsHeading/ResultsHeading";
import { StatusMessage } from "../components/StatusMessage/StatusMessage";
import { useMovies } from "../hooks/useMovies";
import { useTrailer } from "../hooks/useTrailer";

// The player is only needed after a click, so keep it out of the initial bundle.
const TrailerPlayer = lazy(() =>
  import("../components/TrailerPlayer/TrailerPlayer").then((module) => ({
    default: module.TrailerPlayer,
  })),
);

export function Home() {
  const { status, movies, query, search, showTrending, retry } = useMovies();
  const { trailer, openTrailer, closeTrailer } = useTrailer();

  const visibleMovies = useMemo(() => movies.filter((movie) => movie.posterPath !== null), [movies]);
  const featured = query === null ? movies.find((movie) => movie.backdropPath !== null) : undefined;

  return (
    <>
      <h1 className="sr-only">Picture House: search any film and watch its trailer</h1>
      <Header onSearch={search} onShowTrending={showTrending} />

      <main>
        {featured && <Hero movie={featured} onPlay={openTrailer} />}

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <ResultsHeading
            query={query}
            count={status === "ready" ? visibleMovies.length : null}
            onShowTrending={showTrending}
          />

          <div className="mt-8">
            {status === "error" ? (
              <StatusMessage
                title="The projector jammed"
                action={<Button onClick={retry}>Try again</Button>}
              >
                We couldn't load films from TMDb. Check your connection and try again.
              </StatusMessage>
            ) : status === "ready" && visibleMovies.length === 0 ? (
              <StatusMessage title={`No films match “${query ?? ""}”`}>
                Check the spelling, or try the film's original title.
              </StatusMessage>
            ) : (
              <MoviesList movies={visibleMovies} isLoading={status === "loading"} onSelect={openTrailer} />
            )}
          </div>
        </section>
      </main>

      <Footer />

      {trailer.status !== "closed" && (
        <Suspense fallback={null}>
          <TrailerPlayer trailer={trailer} onClose={closeTrailer} />
        </Suspense>
      )}
    </>
  );
}
