import { useState, type FormEvent } from "react";
import { Button } from "../Button/Button";
import { SearchIcon } from "../icons/SearchIcon";

interface SearchFormProps {
  readonly onSearch: (query: string) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed) onSearch(trimmed);
  };

  return (
    <form role="search" onSubmit={handleSubmit} className="flex w-full gap-2 sm:max-w-md">
      <label htmlFor="movie-search" className="sr-only">
        Search films by title
      </label>
      <div className="relative flex-1">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-dust" />
        <input
          id="movie-search"
          type="search"
          required
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try “Jurassic Park”"
          className="focus-ring h-11 w-full rounded-full border border-seat bg-curtain pr-4 pl-10 text-sm text-screen placeholder:text-dust"
        />
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
}
