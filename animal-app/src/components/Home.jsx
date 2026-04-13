import { Link } from "react-router-dom";
import elephant from "../assets/elephant.jpg";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex items-center justify-center">

      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">

        {/* IMAGE BANNER */}
        <div className="h-64 w-full overflow-hidden">
          <img
            src={elephant}
            alt="Animal Protection"
            className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
          />
        </div>

        <div className="p-8">

          {/* TITLE */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-6">
            🐾 Protecting Wildlife, Preserving Tomorrow
          </h1>

          {/* INTRO */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-6 text-center">
            Join us in our mission to safeguard injured, endangered, and vulnerable
            animals. Together, we can build a future where every animal lives in
            safety, dignity, and freedom.
          </p>

          {/* STATS SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-10">

            <div className="p-6 bg-blue-50 dark:bg-gray-700 rounded-xl shadow">
              <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-300">250+</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Animals Rescued</p>
            </div>

            <div className="p-6 bg-green-50 dark:bg-gray-700 rounded-xl shadow">
              <h3 className="text-3xl font-bold text-green-600 dark:text-green-300">40+</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Shelters Supported</p>
            </div>

            <div className="p-6 bg-yellow-50 dark:bg-gray-700 rounded-xl shadow">
              <h3 className="text-3xl font-bold text-yellow-600 dark:text-yellow-300">10k+</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">People Educated</p>
            </div>
          </div>

          {/* INFORMATION CARD */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600 shadow mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Why Animal Protection Matters
            </h2>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Animal protection refers to the efforts made to safeguard animals
                from harm, exploitation, and extinction. It promotes humane
                treatment, wildlife conservation, and safe environments for both
                domestic and wild animals.
              </p>

              <p className="font-semibold">Our goals include:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Stopping animal cruelty and exploitation</li>
                <li>Protecting endangered species</li>
                <li>Providing shelter and medical care</li>
                <li>Raising awareness through education</li>
              </ul>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/about"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              Learn More
            </Link>

            <Link
              to="/contact"
              className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            >
              Contact Us
            </Link>

            <Link
              to="/gallery"
              className="px-6 py-3 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700"
            >
              View Gallery
            </Link>

            <Link
              to="/admin"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700"
            >
              Admin Panel
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}
