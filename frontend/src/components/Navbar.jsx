// === File: client/src/components/Navbar.jsx ===
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Home as HomeIcon, UserCircle, Activity, Users, Package as PackageIcon, LogOut } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve user details from localStorage (assumes a JSON string is stored under "user")
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Basic navigation items common to all visitors
  const navItems = [
    { name: "Home", path: "/", icon: <HomeIcon className="w-5 h-5 inline mr-1" /> },
  ];

  // Add role-specific links if the user is logged in
  if (user) {
    if (user.role === "Admin") {
      navItems.push(
        { name: "Dashboard", path: "/dashboard", icon: <Activity className="w-5 h-5 inline mr-1" /> },
        { name: "Users", path: "/admin/users", icon: <Users className="w-5 h-5 inline mr-1" /> },
        { name: "Reports", path: "/admin/reports", icon: <PackageIcon className="w-5 h-5 inline mr-1" /> }
      );
    } else if (user.role === "Delivery Agent" || user.role === "Agent" || user.role === "Delivery Agent") {
      navItems.push(
        { name: "My Parcels", path: "/agent/parcels", icon: <PackageIcon className="w-5 h-5 inline mr-1" /> },
        { name: "Route", path: "/agent/route", icon: <Activity className="w-5 h-5 inline mr-1" /> }
      );
    } else if (user.role === "Customer") {
      navItems.push(
        { name: "Book Parcel", path: "/book", icon: <PackageIcon className="w-5 h-5 inline mr-1" /> },
        { name: "My Bookings", path: "/my-parcels", icon: <Activity className="w-5 h-5 inline mr-1" /> }
      );
    }
  } else {
    // If not logged in, show auth options.
    navItems.push(
      { name: "Login", path: "/login", icon: <UserCircle className="w-5 h-5 inline mr-1" /> },
      { name: "Register", path: "/register", icon: <UserCircle className="w-5 h-5 inline mr-1" /> }
    );
  }

  // Helper to check active route
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <PackageIcon className="text-blue-600 w-8 h-8" />
            <Link to="/" className="text-xl font-extrabold text-blue-700 tracking-wider">
              Courier & Parcel
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium text-sm ${
                  isActive(item.path)
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            {/* Show Logout button if logged in */}
            {user && (
              <button onClick={handleLogout} className="flex items-center font-medium text-sm text-gray-700 hover:text-blue-600">
                <LogOut className="w-5 h-5 inline mr-1" /> Logout
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block font-medium text-sm ${
                  isActive(item.path)
                    ? "text-blue-600 border-l-4 border-blue-600 pl-2"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            {user && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="w-full text-left flex items-center font-medium text-sm text-gray-700 hover:text-blue-600"
              >
                <LogOut className="w-5 h-5 inline mr-1" /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
