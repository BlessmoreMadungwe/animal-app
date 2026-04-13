import { useEffect, useState } from "react";
// Manage Animals Page
export default function AnimalsAdmin() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/animals/")
      .then(res => res.json())
      .then(data => setAnimals(data));
  }, []);

  return (
    <div className="p-6 text-gray-900 dark:text-white">

      <h2 className="text-3xl font-bold mb-6">🐾 Manage Animals</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {animals.map((animal) => (
          <div
            key={animal.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
          >
            <img
              src={animal.image}
              className="w-full h-40 object-cover rounded-md"
              alt=""
            />
            <h3 className="text-xl font-bold mt-3">{animal.name}</h3>

            <div className="flex justify-between mt-4">
              <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                Edit
              </button>
              <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
