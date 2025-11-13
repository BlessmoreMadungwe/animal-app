import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageAnimals() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/animals/");
      setAnimals(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (animal) => {
    setEditingAnimal(animal.id);
    setFormData({
      name: animal.name,
      description: animal.description || "",
      image: null,
    });
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingAnimal) return;

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      if (formData.image) data.append("image", formData.image);

      await axios.put(
        `http://127.0.0.1:8000/api/animals/${editingAnimal}/`,
        data
      );

      setEditingAnimal(null);
      setFormData({ name: "", description: "", image: null });
      fetchAnimals();
    } catch (err) {
      console.error("Failed to update animal:", err);
      alert("❌ Failed to update animal.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this animal?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/animals/${id}/`);
      fetchAnimals(); // refresh list
    } catch (err) {
      console.error("Failed to delete animal:", err);
      alert("❌ Failed to delete animal.");
    }
  };

  if (loading) return <p className="p-6 text-gray-600">Loading animals...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🐾 Manage Animals</h2>

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
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 rounded-md mb-3">
                  No Image
                </div>
              )}

              {editingAnimal === animal.id ? (
                <form onSubmit={handleUpdate} className="space-y-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded border"
                    required
                  />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded border"
                  />
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="w-full"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingAnimal(null)}
                      className="px-3 py-1 bg-gray-500 text-white rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {animal.name}
                  </h3>
                  {animal.description && (
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {animal.description}
                    </p>
                  )}
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEditClick(animal)}
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(animal.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
