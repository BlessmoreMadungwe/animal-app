// App.js
import elephant from "../assets/elephant.jpg";


function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-lg w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md 
                      dark:bg-gray-800 dark:border-gray-700 transition transform hover:scale-105 hover:shadow-lg">
        
       
        {/* Image */}
        <img
          src={elephant}
          alt="Animal Protection"
          className="w-full h-48 object-cover rounded-md mb-4"
        />

        {/* Title */}
        <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
          🐾 Welcome to Animal Protection
        </h5>

        {/* Brief */}
        <div className="text-gray-700 dark:text-gray-300 text-justify space-y-3">
          <p>
            Animal protection refers to the efforts made to safeguard animals
            from harm, exploitation, and extinction. It involves promoting the
            humane treatment of animals, conserving wildlife, and ensuring that
            domestic and wild animals live in safe and healthy environments.
          </p>

          <p className="font-semibold">The key goals of animal protection include:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Preventing cruelty by opposing abuse, neglect, and exploitation.</li>
            <li>Conserving endangered and vulnerable species.</li>
            <li>Promoting welfare through proper shelter, food, and healthcare.</li>
            <li>Raising awareness to encourage harmony with animals.</li>
          </ul>

          <p>
            Animal protection is not just about saving wildlife but also about
            building compassion, responsibility, and sustainability for future
            generations.
          </p>
        </div>

        {/* Read More Button */}
        <div className="mt-6 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center px-5 py-2 text-sm font-medium text-white 
            bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow 
            hover:from-blue-700 hover:to-blue-900 focus:ring-4 focus:outline-none 
            focus:ring-blue-300 dark:focus:ring-blue-800 transition"
          >
            Read more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return <Home />;
}
