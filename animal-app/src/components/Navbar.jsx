import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { clearAuthTokens, getValidAccessToken } from "../lib/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const accessToken = getValidAccessToken();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    clearAuthTokens();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-emerald-200 bg-white/90 px-6 py-4 text-slate-900 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide text-emerald-700">
          🐾 Animal Protection
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">

          <li><Link to="/" className="hover:text-emerald-700">Home</Link></li>

          {accessToken && (
            <li>
              <Link to="/admin" className="hover:text-emerald-700">
                Admin
              </Link>
            </li>
          )}


          {/* Dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center hover:text-emerald-700"
            >
              Animals ⬇️
            </button>

            {dropdownOpen && (
              <ul className="absolute left-0 mt-2 w-44 bg-white text-black rounded-lg shadow-md z-50 animate-fadeIn">
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

          <li><Link to="/impact" className="hover:text-emerald-700">Impact</Link></li>
          <li><Link to="/gallery" className="hover:text-emerald-700">Gallery</Link></li>
          <li><Link to="/volunteer" className="hover:text-emerald-700">Volunteer</Link></li>
          <li><Link to="/about" className="hover:text-emerald-700">About</Link></li>
          <li><Link to="/contact" className="hover:text-emerald-700">Contact</Link></li>
          <li><Link to="/donate" className="hover:text-emerald-700">Donate</Link></li>

          {/* Auth */}
          {!accessToken && (
            <>
              <li><Link to="/create-account" className="hover:text-emerald-700">Create Account</Link></li>
              <li><Link to="/login" className="rounded-full bg-slate-900 px-4 py-2 text-white hover:bg-slate-800">Login</Link></li>
            </>
          )}

          {accessToken && (
            <>
              <li><Link to="/dashboard" className="hover:text-emerald-700">Dashboard</Link></li>
              <li>
                <button onClick={handleLogout} className="hover:text-emerald-700">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <ul className="mt-4 md:hidden rounded-3xl bg-slate-900 p-5 space-y-3 animate-slideDown text-white">

          <li><Link to="/" className="block hover:text-emerald-300">Home</Link></li>

          {/* Mobile Animals dropdown */}
          <li>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full text-left hover:text-emerald-300"
            >
              Animals ▾
            </button>

            {dropdownOpen && (
              <ul className="mt-2 bg-white text-black rounded-lg shadow-md animate-fadeIn">
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link to="/animals" onClick={() => setMobileOpen(false)}>
                    View Animals
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link to="/add-animal" onClick={() => setMobileOpen(false)}>
                    Add Animal
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link to="/manage-animals" onClick={() => setMobileOpen(false)}>
                    Edit Animal
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li><Link to="/impact" className="block hover:text-emerald-300">Impact</Link></li>
          <li><Link to="/gallery" className="block hover:text-emerald-300">Gallery</Link></li>
          <li><Link to="/volunteer" className="block hover:text-emerald-300">Volunteer</Link></li>
          <li><Link to="/about" className="block hover:text-emerald-300">About</Link></li>
          <li><Link to="/contact" className="block hover:text-emerald-300">Contact</Link></li>
          <li><Link to="/donate" className="block hover:text-emerald-300">Donate</Link></li>

          {!accessToken && (
            <>
              <li><Link to="/create-account" className="block hover:text-emerald-300">Create Account</Link></li>
              <li><Link to="/login" className="block hover:text-emerald-300">Login</Link></li>
            </>
          )}

          {accessToken && (
            <>
              <li><Link to="/dashboard" className="block hover:text-emerald-300">Dashboard</Link></li>
              <li>
                <button onClick={handleLogout} className="block hover:text-emerald-300">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}
