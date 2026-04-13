import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      // 👉 Optional: send to backend
      const response = await fetch("http://127.0.0.1:8000/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Failed to send message.");
        setLoading(false);
        return;
      }

      console.log("Form Submitted:", form);

      setSuccess("Your message has been sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Network error. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex justify-center">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          📞 Contact Us
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-8">
          We’d love to hear from you! Whether you want to join our mission,
          support animal protection, or ask a question — feel free to reach out.
        </p>

        {/* SUCCESS / ERROR */}
        {success && (
          <p className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
            {success}
          </p>
        )}
        {error && (
          <p className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="p-6 bg-blue-50 dark:bg-gray-700 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-300 mb-2">
              📨 Email
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              info@animalcare.org
            </p>
          </div>

          <div className="p-6 bg-green-50 dark:bg-gray-700 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-green-600 dark:text-green-300 mb-2">
              📱 Phone
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              +263 771 317 028
            </p>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-gray-700 dark:text-gray-300 font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 
                         border border-gray-300 dark:border-gray-600 
                         text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-300 font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 
                         border border-gray-300 dark:border-gray-600 
                         text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-300 font-medium">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full mt-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 
                         border border-gray-300 dark:border-gray-600 
                         text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md 
                       hover:bg-blue-700 transition text-lg font-semibold disabled:bg-blue-400"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* MAP PLACEHOLDER */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            📍 Our Location
          </h3>
          <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-gray-700 dark:text-gray-300">
              (Map Coming Soon)
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
