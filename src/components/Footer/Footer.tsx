export function Footer() {
  return (
    <footer className="border-t border-seat">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="meta-label normal-case tracking-normal">
          Film data and images from{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
            className="focus-ring rounded text-screen underline underline-offset-4 hover:text-marquee"
          >
            TMDb
          </a>
          . This product uses the TMDb API but is not endorsed or certified by TMDb.
        </p>
      </div>
    </footer>
  );
}
