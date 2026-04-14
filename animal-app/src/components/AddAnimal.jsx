import { useState } from "react";

export default function AddAnimal() {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });

      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      if (formData.image) data.append("image", formData.image);

      const response = await fetch("http://localhost:8000/api/animals", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.detail || "Failed to upload animal");
        setLoading(false);
        return;
      }

      alert(`🎉 "${formData.name}" added successfully!`);

      setFormData({ name: "", image: null });
      setPreview(null);
      e.target.reset();
    } catch (error) {
      console.error("❌ Error:", error);
      setError("Network error — make sure the backend is running.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          🐾 Add New Animal
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Upload an animal with its photo
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center font-medium mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name Input */}
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
              placeholder="Enter animal name..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                         outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white 
                         outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Preview */}
          {preview && (
            <div className="mt-4">
              <p className="text-gray-700 dark:text-gray-300 font-semibold mb-2">
                Preview:
              </p>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-56 object-cover rounded-xl shadow-md border border-gray-300 dark:border-gray-700"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white font-semibold rounded-lg shadow-md 
                       bg-green-600 hover:bg-green-700 transition flex items-center justify-center
                       disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              "Add Animal"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
