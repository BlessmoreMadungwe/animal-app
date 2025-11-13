import { useState } from "react";

export default function AddAnimal() {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      if (formData.image) {
        data.append("image", formData.image);
      }

      const response = await fetch("http://127.0.0.1:8000/api/animals/", {
        method: "POST",
        body: data,
        // headers: { Authorization: `Bearer ${token}` }, // if using JWT
      });

      if (!response.ok) {
        throw new Error("Failed to upload animal");
      }

      const result = await response.json();
      console.log("✅ Animal uploaded:", result);
      alert(`🐾 Animal "${formData.name}" added!`);

      // Reset form safely
      setFormData({ name: "", image: null });
      e.target.reset(); // this is safe here since it's synchronous
    } catch (error) {
      console.error("❌ Upload error:", error);
      alert("Error uploading animal. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          ➕ Add Animal
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Animal Name */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
              Animal Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Animal Image */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
              Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            Add Animal
          </button>
        </form>
      </div>
    </div>
  );
}
