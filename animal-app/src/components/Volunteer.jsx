import { Link } from "react-router-dom";

const roles = [
  {
    title: "Rescue Support",
    description: "Help document intakes, prepare care kits, and coordinate transport updates.",
  },
  {
    title: "Community Outreach",
    description: "Lead school awareness sessions and represent the mission at events.",
  },
  {
    title: "Digital Advocacy",
    description: "Create stories, campaign assets, and social updates that grow support.",
  },
];

export default function Volunteer() {
  return (
    <div className="min-h-screen bg-emerald-50 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <section className="mb-10 rounded-3xl bg-white p-8 shadow-xl ring-1 ring-emerald-100">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-emerald-700">
            Volunteer
          </p>
          <h1 className="mb-4 text-4xl font-black md:text-5xl">
            Join the people behind every rescue
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-600">
            Whether you help in the field, behind the scenes, or online, your
            time can create safer outcomes for vulnerable animals.
          </p>
        </section>

        <div className="mb-10 grid gap-6 md:grid-cols-3">
          {roles.map((role) => (
            <article
              key={role.title}
              className="rounded-3xl bg-gradient-to-b from-white to-emerald-100 p-6 shadow-lg"
            >
              <h2 className="mb-3 text-2xl font-bold">{role.title}</h2>
              <p className="text-slate-600">{role.description}</p>
            </article>
          ))}
        </div>

        <section className="rounded-3xl bg-slate-900 p-8 text-white shadow-2xl">
          <h2 className="mb-4 text-3xl font-bold">What you can expect</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white/10 p-5">
              Training sessions before fieldwork
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              Flexible schedules for weekly or monthly support
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              Clear safety guidance and team coordination
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              A direct path to help animals and communities
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="rounded-full bg-emerald-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              Apply to Volunteer
            </Link>
            <Link
              to="/donate"
              className="rounded-full border border-white/30 px-6 py-3 font-semibold transition hover:bg-white/10"
            >
              Support the Mission
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
