const DEFAULT_LANG = (import.meta.env.VITE_DEFAULT_LANGUAGE as string | undefined) ?? "en";
export function NotFoundView() {
  return (
    <div className="site-shell">
      <main className="site-main">
        <div className="site-error">
          <h1>404</h1>
          <p>Page not found.</p>
          <a href={`/${DEFAULT_LANG}/index/`}>← Go home</a>
        </div>
      </main>
    </div>
  );
}
