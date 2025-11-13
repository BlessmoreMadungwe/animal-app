import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        🎉 Welcome to Your Dashboard!
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        You are successfully logged in.
      </p>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition"
      >
        Logout
      </button>
    </div>
  );
}
