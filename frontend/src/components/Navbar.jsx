// frontend/src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <div className="text-xl font-semibold text-blue-600">📦 CourierApp</div>

      <ul className="flex gap-6 items-center">
        {/* No user logged in */}
        {!user && (
          <>
            <li>
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Register
              </Link>
            </li>
          </>
        )}

        {/* Logged in as Customer */}
        {user?.role === "customer" && (
          <>
            <li>
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/book"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Book Parcel
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </li>
          </>
        )}

        {/* Logged in as Admin */}
        {user?.role === "admin" && (
          <>
            <li>
              <Link
                to="/admin/dashboard"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/assign"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Assign Parcel
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Users
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </li>
          </>
        )}

        {/* Logged in as Agent */}
        {user?.role === "agent" && (
          <>
            <li>
              <Link
                to="/agent/update"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Update Parcel
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
