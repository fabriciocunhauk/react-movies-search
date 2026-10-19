type EnvResult =
  | { readonly ok: true; readonly tmdbToken: string }
  | { readonly ok: false; readonly error: string };

function readEnv(): EnvResult {
  const token: unknown = import.meta.env.VITE_TMDB_TOKEN;

  if (typeof token !== "string" || token.trim() === "") {
    return {
      ok: false,
      error:
        "VITE_TMDB_TOKEN is not set. Copy .env.example to .env, add your TMDb API key and restart the dev server.",
    };
  }

  return { ok: true, tmdbToken: token.trim() };
}

export const env: Readonly<EnvResult> = Object.freeze(readEnv());
