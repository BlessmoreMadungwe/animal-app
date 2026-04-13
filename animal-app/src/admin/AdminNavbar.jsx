import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 px-6 py-4 shadow flex justify-between items-center">
      <h1 className="text-xl font-bold dark:text-white">Admin Dashboard</h1>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
      >
        Logout
      </button>
    </nav>
  );
}
