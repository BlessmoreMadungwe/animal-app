import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <AdminNavbar />

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow text-center">
            <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-300">250+</h3>
            <p className="text-gray-600 dark:text-gray-300">Animals Rescued</p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow text-center">
            <h3 className="text-3xl font-bold text-green-600 dark:text-green-300">40+</h3>
            <p className="text-gray-600 dark:text-gray-300">Shelters Supported</p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow text-center">
            <h3 className="text-3xl font-bold text-yellow-600 dark:text-yellow-300">10k+</h3>
            <p className="text-gray-600 dark:text-gray-300">People Educated</p>
          </div>

        </div>
      </div>
    </div>
  );
}
