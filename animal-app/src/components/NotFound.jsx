import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="max-w-xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
          404
        </p>
        <h1 className="mb-4 text-4xl font-black">That path could not be found</h1>
        <p className="mb-8 text-white/70">
          The page may have moved, or the link may be outdated. Let&apos;s get
          you back to the main rescue hub.
        </p>
        <Link
          to="/"
          className="inline-flex rounded-full bg-emerald-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
