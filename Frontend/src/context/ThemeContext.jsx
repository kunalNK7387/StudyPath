import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("studypath_theme");
        if (stored === "dark" || stored === "light") {
          return stored;
        }
        // Fallback to system preference
        if (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          return "dark";
        }
      } catch (err) {
        console.warn("Error reading theme from localStorage:", err);
      }
    }
    return "light";
  });

  // Apply theme immediately to HTML root element whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
      root.style.colorScheme = "light";
    }

    try {
      localStorage.setItem("studypath_theme", theme);
    } catch (err) {
      console.warn("Error writing theme to localStorage:", err);
    }
  }, [theme]);

  // Optional: listen to system preference changes if user hasn't explicitly set localStorage yet
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      const stored = localStorage.getItem("studypath_theme");
      if (!stored) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, toggleTheme, isDark: theme === "dark" }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
