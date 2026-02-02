import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoFitnessOutline } from "react-icons/io5";
import SearchBar from "./SearchBar";
import pageMappings from "./PageMappings";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearch = (query) => {
    const normalizedQuery = query.toLowerCase().trim();
    navigate(pageMappings[normalizedQuery] || "/not-found");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      handleSearch(searchQuery);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-green-700/50 border-b border-green-300/30 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Left Section: Logo */}
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold text-green-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <IoFitnessOutline className="text-emerald-600" />
            <span>Healthcare</span>
          </Link>
        </div>

        {/* Center Section: Desktop Links */}
        <div className="hidden lg:flex space-x-8 text-green-600 font-medium">
          <Link to="/" className="hover:text-emerald-500 transition-colors">
            Home
          </Link>
          <Link to="/symptom" className="hover:text-emerald-500 transition-colors">
            Diagnosis
          </Link>
          <Link to="/report" className="hover:text-emerald-500 transition-colors">
            Report
          </Link>
          <Link to="/consult" className="hover:text-emerald-500 transition-colors">
            Consult
          </Link>
          <Link to="/community" className="hover:text-emerald-500 transition-colors">
            Community
          </Link>
          
        </div>

        {/* Right Section: Search + Auth */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <SearchBar
              searchQuery={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
            />
          </div>

          {token ? (
            <div className="flex items-center space-x-4">
              
              <button
                onClick={logout}
                className="hidden md:block px-4 py-2 rounded-2xl bg-green-200/30 text-green-900 hover:bg-green-300/40 backdrop-blur-md transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link
                to="/login"
                className="px-3 py-1 md:px-4 md:py-2 rounded-2xl bg-green-200/30 text-green-900 hover:bg-green-300/40 backdrop-blur-md transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1 md:px-4 md:py-2 rounded-2xl bg-green-200/30 text-green-900 hover:bg-green-300/40 backdrop-blur-md transition-colors"
              >
                Signup
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-green-900 text-3xl focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-green-100/20 border-t border-green-300/30 backdrop-blur-xl text-green-900 px-4 py-4 space-y-3 rounded-b-2xl shadow-lg transition-all duration-300">
          {/* All desktop links for mobile */}
          <div className="flex flex-col space-y-2 font-medium">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block hover:text-emerald-500 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/symptom"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block hover:text-emerald-500 transition-colors"
            >
              Diagnosis
            </Link>
            <Link
              to="/report"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block hover:text-emerald-500 transition-colors"
            >
              Report
            </Link>
            <Link
              to="/consult"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block hover:text-emerald-500 transition-colors"
            >
              Consult
            </Link>
            <Link
              to="/community"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block hover:text-emerald-500 transition-colors"
            >
              Community
            </Link>
            
            
          </div>

          {/* Mobile Search */}
          <div className="pt-2">
            <SearchBar
              searchQuery={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
            />
          </div>

          {/* Auth Buttons */}
          {token ? (
            <button
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full px-4 py-2 rounded-2xl bg-green-200/30 text-green-900 hover:bg-green-300/40 backdrop-blur-md transition-colors"
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col space-y-2">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 rounded-2xl bg-green-200/30 text-green-900 hover:bg-green-300/40 backdrop-blur-md transition-colors text-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 rounded-2xl bg-green-200/30 text-green-900 hover:bg-green-300/40 backdrop-blur-md transition-colors text-center"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
