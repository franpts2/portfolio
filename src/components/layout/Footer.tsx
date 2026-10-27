import { profile } from "../../data/profile.js";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer hairline">
      <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-(--color-ink-muted)">
        <p>© {year} {profile.name}</p>
        <p className="t-label">Have a great day! :D</p>
      </div>
    </footer>
  );
}
