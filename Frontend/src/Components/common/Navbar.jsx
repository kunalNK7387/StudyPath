import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useApp } from "../../context/AppContext.jsx";
import { LogoutConfirmModal } from "./LogoutConfirmModal.jsx";

export const Navbar = () => {
  const { toggleTheme, isDark } = useTheme();
  const { user, logoutUser } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Find My Country", path: "/assessment" },
    { label: "Country Matches & Plan", path: "/recommendations" },
    { label: "Scholarships", path: "/scholarships" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleOpenLogout = () => {
    setMobileMenuOpen(false);
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    setShowLogoutModal(false);
    await logoutUser();
    // Redirect to login page with clear state message
    navigate("/login", {
      replace: true,
      state: {
        loggedOut: true,
        message: "You have logged out successfully.",
      },
    });
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white dark:bg-[#1B231F] border-b border-[#E5E7EB] dark:border-[#2D3A32] transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* StudyPath AI logo as text */}
            <Link
              to="/"
              className="text-xl font-extrabold tracking-tight text-[#252A27] dark:text-[#F1F3F1] hover:text-[#276749] dark:hover:text-[#348A63] transition-colors"
            >
              StudyPath{" "}
              <span className="text-[#276749] dark:text-[#348A63]">AI</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 sm:gap-2">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "bg-[#E5EEE7] text-[#276749] dark:bg-[#222D26] dark:text-[#84CCA0] font-semibold"
                        : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#252A27] dark:hover:text-[#F1F3F1] hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action: Auth Links & Light/Dark Theme Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop Auth Controls */}
              <div className="hidden sm:flex items-center gap-2">
                {user?.isAuthenticated ? (
                  <div className="flex items-center gap-2">
                    <Link
                      to="/recommendations"
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                        location.pathname === "/recommendations"
                          ? "bg-[#E5EEE7] text-[#276749] dark:bg-[#222D26] dark:text-[#84CCA0] border-[#276749]/30"
                          : "border-[#E5E7EB] dark:border-[#2D3A32] text-[#252A27] dark:text-[#F1F3F1] hover:bg-[#FAF9F6] dark:hover:bg-[#141A16]"
                      }`}
                    >
                      My Results ({user.name.split(" ")[0]})
                    </Link>
                    <button
                      type="button"
                      onClick={handleOpenLogout}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#E5E7EB] dark:border-[#2D3A32] text-[#252A27] dark:text-[#F1F3F1] hover:border-[#276749] hover:text-[#276749] dark:hover:text-[#84CCA0] hover:bg-[#FAF9F6] dark:hover:bg-[#141A16] transition-colors cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      to="/login"
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        location.pathname === "/login"
                          ? "text-[#276749] dark:text-[#84CCA0] font-bold"
                          : "text-[#252A27] dark:text-[#F1F3F1] hover:text-[#276749] dark:hover:text-[#84CCA0]"
                      }`}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-3 py-1.5 rounded-lg bg-[#276749] hover:bg-[#1F523A] text-white text-xs font-semibold transition-colors"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>

              {/* Light/Dark Theme Toggle */}
              <button
                onClick={toggleTheme}
                type="button"
                aria-label={
                  isDark ? "Switch to light theme" : "Switch to dark theme"
                }
                title={
                  isDark ? "Switch to light theme" : "Switch to dark theme"
                }
                className="p-2 rounded-lg border border-[#E5E7EB] dark:border-[#2D3A32] bg-[#FAF9F6] dark:bg-[#141A16] text-[#252A27] dark:text-[#F1F3F1] hover:bg-[#E5EEE7] dark:hover:bg-[#222D26] transition-colors cursor-pointer"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-300" />
                ) : (
                  <Moon className="w-4 h-4 text-[#252A27]" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                className="p-2 rounded-lg md:hidden text-[#252A27] dark:text-[#F1F3F1] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E5E7EB] dark:border-[#2D3A32] bg-white dark:bg-[#1B231F] px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                    active
                      ? "bg-[#E5EEE7] text-[#276749] dark:bg-[#222D26] dark:text-[#84CCA0] font-semibold"
                      : "text-[#252A27] dark:text-[#F1F3F1] hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-2 mt-2 border-t border-[#E5E7EB] dark:border-[#2D3A32] space-y-1">
              {user?.isAuthenticated ? (
                <>
                  <Link
                    to="/recommendations"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-medium text-[#276749] dark:text-[#84CCA0] hover:bg-[#E5EEE7] dark:hover:bg-[#222D26]"
                  >
                    My Results ({user.name})
                  </Link>
                  <button
                    type="button"
                    onClick={handleOpenLogout}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#252A27] dark:text-[#F1F3F1] hover:bg-[#E5EEE7] dark:hover:bg-[#222D26] hover:text-[#276749] dark:hover:text-[#84CCA0] transition-colors cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center px-3 py-2 rounded-lg border border-[#E5E7EB] dark:border-[#2D3A32] text-sm font-medium text-[#252A27] dark:text-[#F1F3F1]"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center px-3 py-2 rounded-lg bg-[#276749] text-white text-sm font-semibold"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Confirmation Dialog for Logout */}
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
        userName={user?.name}
      />
    </>
  );
};
