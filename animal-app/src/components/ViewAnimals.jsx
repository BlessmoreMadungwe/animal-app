import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewAnimals() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/animals/");
        setAnimals(res.data);
      } catch (err) {
        console.error("Error fetching animals:", err);
        setError("Failed to load animals. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  if (loading) {
    return (
      <p className="p-6 text-gray-600">Loading animals...</p>
    );
  }

  if (error) {
    return (
      <p className="p-6 text-red-600 font-semibold">{error}</p>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🐾 Animals List</h2>

      {animals.length === 0 ? (
        <p>No animals found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {animals.map((animal) => (
            <li
              key={animal.id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              {animal.image ? (
                <img
                  src={animal.image} // DRF full URL
                  alt={animal.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 rounded-md mb-3">
                  No Image
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {animal.name}
              </h3>
              {animal.description && (
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {animal.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
