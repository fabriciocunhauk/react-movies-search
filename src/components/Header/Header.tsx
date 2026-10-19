import { SearchForm } from "../SearchForm/SearchForm";

interface HeaderProps {
  readonly onSearch: (query: string) => void;
  readonly onShowTrending: () => void;
}

export function Header({ onSearch, onShowTrending }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-seat/70 bg-velvet/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onShowTrending}
          className="focus-ring self-start rounded font-display text-3xl leading-none tracking-wider text-screen sm:self-auto"
        >
          Picture<span className="text-marquee">·</span>House
        </button>
        <SearchForm onSearch={onSearch} />
      </div>
    </header>
  );
}
