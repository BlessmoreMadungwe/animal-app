export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">

        {/* HEADER */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          ℹ️ About Us
        </h2>

        {/* INTRO SECTION */}
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
          Our mission is to protect, rescue, and care for vulnerable animals.
          We believe every animal deserves safety, dignity, and compassion.
        </p>

        {/* IMAGE / BANNER */}
        <div className="w-full mb-8">
          <img
            className="rounded-xl shadow-md"
            src="https://images.unsplash.com/photo-1517849845537-4d257902454a"
            alt="Animals"
          />
        </div>

        {/* MISSION SECTION */}
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
          🐾 Our Mission
        </h3>

        <p className="text-gray-700 dark:text-gray-300 mb-6">
          We work tirelessly to rescue injured animals, fight animal cruelty,
          and advocate for stronger protection laws. We collaborate with
          shelters, veterinarians, and local communities to create a safer
          environment for all animals.
        </p>

        {/* GOALS SECTION */}
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
          🎯 Our Goals
        </h3>

        <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-8">
          <li className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-gray-700 rounded-md">
            🐕 Rescue abandoned and injured animals.
          </li>
          <li className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-gray-700 rounded-md">
            📢 Raise awareness about animal cruelty.
          </li>
          <li className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-gray-700 rounded-md">
            🏥 Support veterinary care and rehabilitation.
          </li>
          <li className="p-4 border-l-4 border-purple-500 bg-purple-50 dark:bg-gray-700 rounded-md">
            🏡 Promote adoption and safe shelters.
          </li>
        </ul>

        {/* CALL TO ACTION */}
        <div className="text-center">
          <a
            href="/contact"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            🤝 Get Involved
          </a>
        </div>
      </div>
    </div>
  );
}
