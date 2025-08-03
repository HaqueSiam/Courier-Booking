// frontend/src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  const linkBase = "block py-2 px-4 rounded hover:bg-blue-100 transition";
  const activeClass = "bg-blue-500 text-white font-semibold";

  return (
    <aside className="w-full md:w-64 bg-white shadow rounded p-4 mb-6 md:mb-0 md:mr-6">
      <nav className="space-y-1">
        {user.role === "customer" && (
          <>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? activeClass : "text-gray-700"}`
              }
            >
              My Bookings
            </NavLink>
            <NavLink
              to="/book-parcel"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? activeClass : "text-gray-700"}`
              }
            >
              Book a Parcel
            </NavLink>
          </>
        )}

        {user.role === "admin" && (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? activeClass : "text-gray-700"}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/assign-parcel"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? activeClass : "text-gray-700"}`
              }
            >
              Assign Parcels
            </NavLink>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? activeClass : "text-gray-700"}`
              }
            >
              Users
            </NavLink>
          </>
        )}

        {user.role === "agent" && (
          <NavLink
            to="/update-parcel"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeClass : "text-gray-700"}`
            }
          >
            Update Parcel
          </NavLink>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;