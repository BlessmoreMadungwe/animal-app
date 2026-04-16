const galleryItems = [
  {
    title: "Rescue In Motion",
    description: "Field teams respond quickly when wildlife needs urgent medical care.",
    image:
      "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Safe Recovery Spaces",
    description: "Quiet rehabilitation habitats help animals regain strength with less stress.",
    image:
      "https://images.unsplash.com/photo-1501706362039-c6e80948bb78?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Community Education",
    description: "Workshops help families, schools, and farmers protect local ecosystems.",
    image:
      "https://images.unsplash.com/photo-1444212477490-ca407925329e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Back To The Wild",
    description: "Successful releases are the goal whenever animals can safely return home.",
    image:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-slate-100 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-600 to-sky-600 p-8 text-white shadow-xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-emerald-100">
            Visual Stories
          </p>
          <h1 className="mb-4 text-4xl font-black md:text-5xl">
            Moments That Make Protection Real
          </h1>
          <p className="max-w-3xl text-base text-emerald-50 md:text-lg">
            Explore the rescue work, recovery spaces, and community action that
            shape our mission every day.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {galleryItems.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-200"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-72 w-full object-cover"
              />
              <div className="p-6">
                <h2 className="mb-2 text-2xl font-bold">{item.title}</h2>
                <p className="text-slate-600">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
