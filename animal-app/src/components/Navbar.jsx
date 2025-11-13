import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between shadow-md">
      {/* Brand / Logo */}
      <h1 className="text-xl font-bold tracking-wide">🐾 Animal Protection</h1>

      {/* Navigation links */}
      <ul className="flex space-x-6 relative">
        <li>
          <Link to="/" className="hover:text-yellow-300">Home</Link>
        </li>

        {/* Animals dropdown (click to toggle) */}
        <li className="relative">
          <button
            onClick={toggleDropdown}
            className="hover:text-yellow-300 flex items-center"
          >
            Animals ⬇️
          </button>

          {dropdownOpen && (
            <ul className="absolute left-0 mt-2 w-44 bg-white text-black rounded-lg shadow-md z-50">
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link to="/animals" onClick={() => setDropdownOpen(false)}>
                  View Animals
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link to="/add-animal" onClick={() => setDropdownOpen(false)}>
                  Add Animal
                </Link>
              </li>

              <li className="px-4 py-2 hover:bg-gray-200">
                <Link to="/manage-animals" onClick={() => setDropdownOpen(false)}>
                  Edit Animal
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link to="/about" className="hover:text-yellow-300">About</Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-yellow-300">Contact</Link>
        </li>

        <li> <Link to="/donate" className="hover:text-yellow-300"> Donate </Link></li>



        {/* Show only if NOT logged in */}
        {!accessToken && (
          <>
            <li>
              <Link to="/create-account" className="hover:text-yellow-300">
                Create Account
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-yellow-300">
                Login
              </Link>
            </li>
          </>
        )}

        {/* Show only if logged in */}
        {accessToken && (
          <>
            <li>
              <Link to="/dashboard" className="hover:text-yellow-300">
                Dashboard
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-yellow-300"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
