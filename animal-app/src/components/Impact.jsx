const impactStats = [
  { label: "Emergency rescues completed", value: "250+" },
  { label: "Partner shelters supported", value: "40+" },
  { label: "Community outreach sessions", value: "120+" },
  { label: "Animals returned to safe care", value: "1,400+" },
];

const pillars = [
  {
    title: "Rapid Response",
    text: "Local reporting channels help our team respond before injuries become fatal.",
  },
  {
    title: "Rehabilitation",
    text: "Veterinary care, nutrition, and safe housing give animals a real recovery path.",
  },
  {
    title: "Education",
    text: "We work with schools and communities to reduce cruelty and improve long-term care.",
  },
];

export default function Impact() {
  return (
    <div className="min-h-screen bg-stone-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <section className="rounded-3xl bg-gradient-to-br from-orange-500 via-amber-500 to-lime-400 p-8 text-stone-950 shadow-2xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em]">
              Impact
            </p>
            <h1 className="mb-4 text-4xl font-black md:text-5xl">
              Real progress for animals, habitats, and communities
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-stone-900/85">
              Every rescue is part of a larger system: prevention, treatment,
              recovery, and education that makes the next rescue less likely to
              be needed.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur">
            <h2 className="mb-6 text-2xl font-bold">Where support goes</h2>
            <div className="space-y-5">
              <div>
                <div className="mb-2 flex justify-between text-sm text-white/70">
                  <span>Emergency care</span>
                  <span>45%</span>
                </div>
                <div className="h-3 rounded-full bg-white/10">
                  <div className="h-3 w-[45%] rounded-full bg-emerald-400" />
                </div>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm text-white/70">
                  <span>Shelter operations</span>
                  <span>30%</span>
                </div>
                <div className="h-3 rounded-full bg-white/10">
                  <div className="h-3 w-[30%] rounded-full bg-sky-400" />
                </div>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm text-white/70">
                  <span>Community education</span>
                  <span>25%</span>
                </div>
                <div className="h-3 rounded-full bg-white/10">
                  <div className="h-3 w-[25%] rounded-full bg-amber-300" />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {impactStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg"
            >
              <p className="text-4xl font-black text-amber-300">{stat.value}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/65">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-3xl bg-white p-6 text-slate-900 shadow-lg"
            >
              <h2 className="mb-3 text-2xl font-bold">{pillar.title}</h2>
              <p className="text-slate-600">{pillar.text}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
