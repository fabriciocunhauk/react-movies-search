import { Button } from "../Button/Button";

interface ResultsHeadingProps {
  /** `null` while the trending list is showing. */
  readonly query: string | null;
  /** `null` while results are still loading. */
  readonly count: number | null;
  readonly onShowTrending: () => void;
}

export function ResultsHeading({ query, count, onShowTrending }: ResultsHeadingProps) {
  const eyebrow = query === null ? "Trending today" : "Search results";
  const countLabel = count === null ? "" : ` · ${count} ${count === 1 ? "film" : "films"}`;

  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-seat pb-4">
      <div>
        <p className="meta-label">
          {eyebrow}
          {countLabel}
        </p>
        <h2 className="mt-1 font-display text-4xl tracking-wide">
          {query === null ? "What everyone's watching" : `“${query}”`}
        </h2>
      </div>
      {query !== null && (
        <Button variant="ghost" onClick={onShowTrending}>
          Back to trending
        </Button>
      )}
    </div>
  );
}
