export function MovieCardSkeleton() {
  return (
    <li aria-hidden="true" className="animate-pulse motion-reduce:animate-none">
      <span className="block aspect-2/3 rounded-lg bg-curtain" />
      <span className="mt-3 block h-4 w-3/4 rounded bg-curtain" />
      <span className="mt-2 block h-3 w-1/3 rounded bg-curtain" />
    </li>
  );
}
