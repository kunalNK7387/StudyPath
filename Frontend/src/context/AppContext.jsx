import React, { createContext, useContext, useState, useEffect } from "react";
import { useTheme } from "./ThemeContext.jsx";
import { DEFAULT_ADMISSION_TASKS } from "../data/admissionTasksData.js";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const { theme, toggleTheme, isDark, setTheme } = useTheme();

  // Profile state
  const [profile, setProfileState] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("studypath_profile");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return null;
        }
      }
    }
    return null;
  });

  const setProfile = (newProfile) => {
    setProfileState(newProfile);
    if (typeof window !== "undefined") {
      if (newProfile) {
        localStorage.setItem("studypath_profile", JSON.stringify(newProfile));
      } else {
        localStorage.removeItem("studypath_profile");
      }
    }
  };

  const loadSampleProfile = (type) => {
    const chosen =
      type === "stem"
        ? SAMPLE_INDIAN_STEM_PROFILE
        : SAMPLE_COMMERCE_MANAGEMENT_PROFILE;
    setProfile(chosen);
    showToast(
      `Loaded sample ${type === "stem" ? "Indian STEM" : "Commerce"} profile for ${chosen.fullName}!`,
      "success",
    );
  };

  // AI-generated country recommendations
  const [recommendedCountries, setRecommendedCountries] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("studypath_recommended_countries") || "[]",
      );
    } catch {
      return [];
    }
  });

  // AI-generated scholarships
  const [scholarships, setScholarships] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("studypath_ai_scholarships") || "[]",
      );
    } catch {
      return [];
    }
  });

  // Save country recommendations to localStorage
  useEffect(() => {
    localStorage.setItem(
      "studypath_recommended_countries",
      JSON.stringify(recommendedCountries),
    );
  }, [recommendedCountries]);

  // Save scholarships to localStorage
  useEffect(() => {
    localStorage.setItem(
      "studypath_ai_scholarships",
      JSON.stringify(scholarships),
    );
  }, [scholarships]);

  // Shortlisted countries
  const [shortlistedCountries, setShortlistedCountries] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("studypath_shortlisted_countries");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return ["germany", "canada"];
        }
      }
    }
    return ["germany", "canada"];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "studypath_shortlisted_countries",
        JSON.stringify(shortlistedCountries),
      );
    }
  }, [shortlistedCountries]);

  const toggleShortlistCountry = (countryId) => {
    setShortlistedCountries((prev) => {
      const exists = prev.includes(countryId);
      const next = exists
        ? prev.filter((id) => id !== countryId)
        : [...prev, countryId];
      showToast(
        exists
          ? "Removed from shortlisted destinations"
          : "Added to shortlisted destinations!",
        "info",
      );
      return next;
    });
  };

  const isCountryShortlisted = (countryId) =>
    shortlistedCountries.includes(countryId);

  // Saved scholarships
  const [savedScholarships, setSavedScholarships] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("studypath_saved_scholarships");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return ["daad-study-scholarships", "dsu-regional-scholarship"];
        }
      }
    }
    return ["daad-study-scholarships", "dsu-regional-scholarship"];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "studypath_saved_scholarships",
        JSON.stringify(savedScholarships),
      );
    }
  }, [savedScholarships]);

  const toggleSaveScholarship = (scholarshipId) => {
    setSavedScholarships((prev) => {
      const exists = prev.includes(scholarshipId);
      const next = exists
        ? prev.filter((id) => id !== scholarshipId)
        : [...prev, scholarshipId];
      showToast(
        exists
          ? "Removed from saved scholarships"
          : "Saved scholarship to your tracker!",
        "success",
      );
      return next;
    });
  };

  const isScholarshipSaved = (scholarshipId) =>
    savedScholarships.includes(scholarshipId);

  // Admission Tasks
  const [tasks, setTasks] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("studypath_admission_tasks");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return DEFAULT_ADMISSION_TASKS;
        }
      }
    }
    return DEFAULT_ADMISSION_TASKS;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("studypath_admission_tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const setTaskStatus = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    );
    showToast(`Step status changed to "${newStatus}"`, "info");
  };

  const toggleTaskStatus = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const nextStatus =
          t.status === "Completed"
            ? "Not Started"
            : t.status === "Not Started" || t.status === "Pending"
              ? "In Progress"
              : "Completed";
        showToast(`Milestone updated: "${nextStatus}"`, "info");
        return { ...t, status: nextStatus };
      }),
    );
  };

  const addTask = (newTask) => {
    const id = `custom-task-${Date.now()}`;
    const task = { ...newTask, id, isCustom: true };
    setTasks((prev) => [task, ...prev]);
    showToast("New admission milestone added!", "success");
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    showToast("Task removed from planner", "info");
  };

  const resetTasks = () => {
    setTasks(DEFAULT_ADMISSION_TASKS);
    showToast("Reset admission timeline to default recommended tasks", "info");
  };

  // User auth state
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("studypath_user");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return {
      id: "guest",
      name: "Prospective Student",
      email: "",
      isAuthenticated: false,
      shortlistedCountryIds: [],
      savedScholarshipIds: [],
      profileCompleted: false,
    };
  });

  const loginUser = (name, email) => {
    const loggedInUser = {
      id: `usr-${Date.now()}`,
      name: name || "Aarav Sharma",
      email: email || "aarav.sharma@example.com",
      isAuthenticated: true,
      shortlistedCountryIds: shortlistedCountries,
      savedScholarshipIds: savedScholarships,
      profileCompleted: !!profile,
    };
    setUser(loggedInUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("studypath_user", JSON.stringify(loggedInUser));
    }
    showToast(`Welcome back, ${loggedInUser.name}!`, "success");
  };

  const registerUser = (name, email) => {
    const registeredUser = {
      id: `usr-${Date.now()}`,
      name: name ? name.trim() : "Prospective Student",
      email: email ? email.trim() : "",
      isAuthenticated: true,
      shortlistedCountryIds: shortlistedCountries || [],
      savedScholarshipIds: savedScholarships || [],
      profileCompleted: !!profile,
    };
    setUser(registeredUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("studypath_user", JSON.stringify(registeredUser));
    }
    showToast(`Account created! Welcome, ${registeredUser.name}.`, "success");
  };

  const logoutUser = async () => {
    try {
      // 1. Call backend logout endpoint if available
      await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    } catch {
      // Graceful fallback if offline or backend is absent
    }

    // 2. Clear authentication state in client-side context
    const guestUser = {
      id: "guest",
      name: "Prospective Student",
      email: "",
      isAuthenticated: false,
      shortlistedCountryIds: [],
      savedScholarshipIds: [],
      profileCompleted: false,
    };
    setUser(guestUser);

    // 3. Clear only the authentication session data (never delete profile or application progress)
    if (typeof window !== "undefined") {
      localStorage.removeItem("studypath_user");
      // Intentionally preserve studypath_profile, studypath_admission_tasks,
      // studypath_saved_scholarships, and studypath_shortlisted_countries
    }

    // 4. Show friendly logout notification
    showToast("You have logged out successfully.", "info");
  };

  // Exchange rates state
  const [exchangeRates] = useState({
    EUR: 91.5,
    USD: 86.5,
    GBP: 108.5,
    CAD: 62.5,
    AUD: 55.5,
    INR: 1.0,
  });

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "info") => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        isDark,
        setTheme,
        profile,
        setProfile,
        recommendedCountries,
        setRecommendedCountries,
        scholarships,
        setScholarships,

        loadSampleProfile,
        shortlistedCountries,
        toggleShortlistCountry,
        isCountryShortlisted,
        savedScholarships,
        toggleSaveScholarship,
        isScholarshipSaved,
        tasks,
        toggleTaskStatus,
        setTaskStatus,
        addTask,
        deleteTask,
        resetTasks,
        user,
        loginUser,
        registerUser,
        logoutUser,
        exchangeRates,

        toasts,
        showToast,
      }}
    >
      {children}
      {/* Toast Render Notification Stack */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-xl shadow-xl border text-xs sm:text-sm font-medium transition-all duration-300 animate-slide-in flex items-center gap-2.5 ${
              toast.type === "success"
                ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800"
                : toast.type === "warning"
                  ? "bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800"
                  : "bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800"
            }`}
          >
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
