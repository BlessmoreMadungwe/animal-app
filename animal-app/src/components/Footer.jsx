import { Link } from "react-router-dom";

const quickLinks = [
  { to: "/animals", label: "Animals" },
  { to: "/impact", label: "Impact" },
  { to: "/volunteer", label: "Volunteer" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-emerald-300">
            Animal Protection
          </p>
          <h2 className="mb-3 text-2xl font-bold">
            Safer futures for vulnerable wildlife and companion animals
          </h2>
          <p className="text-white/70">
            Rescue, rehabilitation, education, and community action working together
            in one place.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-white/60">
            Explore
          </h3>
          <div className="flex flex-col gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-white/80 transition hover:text-emerald-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
