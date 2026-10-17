import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import { Navbar } from "./components/common/Navbar.jsx";
import { Footer } from "./components/common/Footer.jsx";
import { ProtectedRoute } from "./components/common/ProtectedRoute.jsx";

// The 6 Main Pages
import { HomePage } from "./pages/HomePage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { ProfileAssessmentPage } from "./pages/ProfileAssessmentPage.jsx";
import { RecommendationsPage } from "./pages/RecommendationsPage.jsx";
import { ScholarshipFinderPage } from "./pages/ScholarshipFinderPage.jsx";

// Helper to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-[#FAF9F6] dark:bg-[#141A16] text-[#252A27] dark:text-[#F1F3F1] transition-colors duration-200">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* 1. HomePage */}
                <Route path="/" element={<HomePage />} />

                {/* 2. LoginPage */}
                <Route path="/login" element={<LoginPage />} />

                {/* 3. RegisterPage */}
                <Route path="/register" element={<RegisterPage />} />

                {/* 4. ProfileAssessmentPage (Protected) */}
                <Route
                  path="/assessment"
                  element={
                    <ProtectedRoute>
                      <ProfileAssessmentPage />
                    </ProtectedRoute>
                  }
                />

                {/* 5. RecommendationsPage (Protected - combines recommendations, country explorer, cost calculator, and application plan) */}
                <Route
                  path="/recommendations"
                  element={
                    <ProtectedRoute>
                      <RecommendationsPage />
                    </ProtectedRoute>
                  }
                />

                {/* 6. ScholarshipFinderPage */}
                <Route
                  path="/scholarships"
                  element={<ScholarshipFinderPage />}
                />

                {/* Legacy route redirects to unified recommendations page */}
                <Route
                  path="/dashboard"
                  element={<Navigate to="/recommendations" replace />}
                />
                <Route
                  path="/planner"
                  element={
                    <Navigate to="/recommendations?tab=planner" replace />
                  }
                />
                <Route
                  path="/calculator"
                  element={
                    <Navigate to="/recommendations?tab=calculator" replace />
                  }
                />
                <Route
                  path="/countries"
                  element={
                    <Navigate to="/recommendations?tab=explore" replace />
                  }
                />
                <Route
                  path="/countries/:countryId"
                  element={
                    <Navigate to="/recommendations?tab=explore" replace />
                  }
                />

                {/* Fallback to Home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}
