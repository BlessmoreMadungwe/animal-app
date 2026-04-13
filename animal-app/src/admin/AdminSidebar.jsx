import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-8">🛠 Admin Panel</h2>

      <ul className="space-y-4 text-lg">
        <li>
          <Link className="hover:text-yellow-400" to="/admin">Dashboard</Link>
        </li>
        <li>
          <Link className="hover:text-yellow-400" to="/admin/animals">
            Manage Animals
          </Link>
        </li>
        <li>
          <Link className="hover:text-yellow-400" to="/admin/add-animal">
            Add Animal
          </Link>
        </li>
        <li>
          <Link className="hover:text-yellow-400" to="/admin/users">
            Manage Users
          </Link>
        </li>
        <li>
          <Link className="hover:text-yellow-400" to="/admin/donations">
            Donations
          </Link>
        </li>
        <li>
          <Link className="hover:text-yellow-400" to="/admin/reports">
            Reports
          </Link>
        </li>
      </ul>
    </div>
  );
}
