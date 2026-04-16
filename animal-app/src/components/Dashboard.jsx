import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildApiUrl } from "../lib/api";
import { clearAuthTokens, getValidAccessToken } from "../lib/auth";

// ✅ Added 'default' to fix the App.jsx:9 Uncaught SyntaxError
export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [stats, setStats] = useState({
    tasks: 0,
    messages: 0,
    notifications: 0,
  });

  const handleLogout = () => {
    clearAuthTokens();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const token = getValidAccessToken();
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    fetch(buildApiUrl("/api/dashboard/"), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 401) {
          clearAuthTokens();
          navigate("/login", { replace: true });
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        setUsername(data.username || "User");
        setStats({
          tasks: data.tasks || 0,
          messages: data.messages || 0,
          notifications: data.notifications || 0,
        });
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
      });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            👋 Welcome back, {username}!
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h3 className="text-gray-600 dark:text-gray-300 font-medium">📌 Tasks</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              {stats.tasks}
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h3 className="text-gray-600 dark:text-gray-300 font-medium">💬 Messages</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
              {stats.messages}
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h3 className="text-gray-600 dark:text-gray-300 font-medium">🔔 Notifications</h3>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
              {stats.notifications}
            </p>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <ul className="space-y-3">
            <li className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-gray-700 rounded-md">
              🎯 Dashboard loaded successfully
            </li>
            <li className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-gray-700 rounded-md">
              🛡️ Connection to Render Backend active
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
