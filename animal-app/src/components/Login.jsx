import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// ✅ CRUCIAL: 'export default' must be here to fix the Vercel build error
export default function Login() {
  // Form state
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");         // to show error messages
  const [loading, setLoading] = useState(false); // to disable button while waiting
  const navigate = useNavigate();

  // Handle typing in inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Use your Render URL from environment variables
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

    try {
      const response = await fetch(`${API_BASE_URL}/api/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Try to parse response (in case server returns non-JSON)
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.access && data.refresh) {
        // Save tokens in localStorage
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);

        alert(`Welcome back, ${formData.username}!`);
        navigate("/dashboard"); 
      } else {
        setError(data.detail || "Invalid username or password.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. The server may be waking up, please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {/* Heading */}
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          🔑 Login
        </h2>

        {/* Error message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white font-semibold rounded-lg shadow-md transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          Don't have an account?{" "}
          <Link to="/create-account" className="text-blue-600 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}