import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  CheckCircle2,
  Bookmark,
  Search,
  Calculator,
  Compass,
  CheckSquare,
  Sparkles,
  LoaderCircle,
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import { generateRecommendations } from "../services/recommendationService.js";

export const RecommendationsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    profile,
    isCountryShortlisted,
    toggleShortlistCountry,
    tasks,
    toggleTaskStatus,
    resetTasks,
    setRecommendedCountries,
    setScholarships,
  } = useApp();

  // Tab state: 'matches' | 'explore' | 'calculator' | 'planner'
  const initialTab = searchParams.get("tab") || "matches";
  const [activeTab, setActiveTab] = useState(initialTab);

  // Sync tab with URL query parameter
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // Recommendations state
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBestFitUnis, setShowBestFitUnis] = useState(false);
  const [expandedAltUnis, setExpandedAltUnis] = useState({});

  // Country Explorer filter state
  const [countrySearch, setCountrySearch] = useState("");
  const [tuitionFilter, setTuitionFilter] = useState("All");
  const [expandedCountryId, setExpandedCountryId] = useState(null);

  // Cost Calculator state
  const [calcCountryId, setCalcCountryId] = useState("");
  const [calcDuration, setCalcDuration] = useState(2);

  // Application Plan filter state
  const [taskFilter, setTaskFilter] = useState("All");

  //Loading page
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchMatches() {
      setLoading(true);
      setError("");

      try {
        if (!profile) {
          throw new Error("Please complete your student assessment first.");
        }

        if (!profile.desiredCourse?.trim() || !profile.desiredDegree?.trim()) {
          throw new Error(
            "Desired course and degree are required. Please complete your assessment.",
          );
        }

        const result = await generateRecommendations(profile);

        if (isMounted) {
          setRecommendations(result.countries);
          setRecommendedCountries(result.countries);
          setScholarships(result.scholarships);
        }
      } catch (error) {
        console.error("Failed to load AI recommendations:", error);

        if (isMounted) {
          setRecommendations([]);
          setError(error.message || "Unable to load recommendations.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchMatches();

    return () => {
      isMounted = false;
    };
  }, [profile]);

  const toggleAltUnis = (countryId) => {
    setExpandedAltUnis((prev) => ({
      ...prev,
      [countryId]: !prev[countryId],
    }));
  };

  const getCountryDetails = (countryId) => {
    return (
      recommendations.find((country) => country.countryId === countryId) || null
    );
  };

  const bestFit = recommendations[0] || null;
  const alternatives = recommendations.slice(1, 3);
  const bestFitCountryData = bestFit;

  // Explorer filter logic
  const filteredCountries = recommendations.filter((country) => {
    const matchesSearch = country.countryName
      .toLowerCase()
      .includes(countrySearch.toLowerCase());

    const matchesTuition =
      tuitionFilter === "All" || country.tuitionModel === tuitionFilter;

    return matchesSearch && matchesTuition;
  });

  // Calculator computations
  const selectedCalcCountry = getCountryDetails(calcCountryId);

  const formatINR = (amount) => {
    const value = Number(amount);

    if (amount === null || amount === undefined || amount === "") {
      return "Not provided by AI";
    }

    if (!Number.isFinite(value)) {
      return "Not provided by AI";
    }

    return `₹${value.toLocaleString("en-IN")}`;
  };

  const annualCostINR = Number(
    selectedCalcCountry?.estimatedAnnualINR?.replace(/[₹,]/g, ""),
  );

  const totalCourseCost =
    Number.isFinite(annualCostINR) && annualCostINR > 0
      ? annualCostINR * calcDuration
      : null;

  // Planner stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const filteredTasks = tasks.filter((t) => {
    if (taskFilter === "All") return true;
    return t.status === taskFilter;
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF9F6] dark:bg-[#141A16] text-[#252A27] dark:text-[#F1F3F1] py-8 sm:py-10 px-4 sm:px-6 transition-colors duration-200">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        {/* Header with Student Profile Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB] dark:border-[#2D3A32]">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-[#E5EEE7] dark:bg-[#222D26] text-[#276749] dark:text-[#84CCA0] text-xs font-semibold mb-2">
              StudyPath AI Guidance Hub
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#252A27] dark:text-[#F1F3F1]">
              Your Recommendations & Application Plan
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
              Course: <b>{profile?.desiredCourse || "Not provided"}</b> • Marks:{" "}
              <b>{profile?.academicMarks || "Not provided"}</b> • Budget:{" "}
              <b>
                {profile?.annualBudgetINR != null &&
                profile.annualBudgetINR !== "" ? (
                  <>
                    ₹{(Number(profile.annualBudgetINR) / 100000).toFixed(1)}
                    {" Lakhs/year"}
                  </>
                ) : (
                  "Not provided"
                )}
              </b>
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              to="/assessment"
              className="px-3.5 py-2 rounded-lg bg-[#276749] hover:bg-[#1F523A] text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>Edit Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Tab Navigation Controls (4 primary views) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#E5E7EB] dark:border-[#2D3A32]">
          <button
            type="button"
            onClick={() => handleTabChange("matches")}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0 flex items-center gap-2 ${
              activeTab === "matches"
                ? "bg-[#276749] text-white"
                : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#252A27] dark:hover:text-[#F1F3F1] hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Recommended Matches</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("explore")}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0 flex items-center gap-2 ${
              activeTab === "explore"
                ? "bg-[#276749] text-white"
                : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#252A27] dark:hover:text-[#F1F3F1] hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Explore Recomended Countries</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("calculator")}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0 flex items-center gap-2 ${
              activeTab === "calculator"
                ? "bg-[#276749] text-white"
                : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#252A27] dark:hover:text-[#F1F3F1] hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Cost Calculator (₹)</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("planner")}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0 flex items-center gap-2 ${
              activeTab === "planner"
                ? "bg-[#276749] text-white"
                : "text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#252A27] dark:hover:text-[#F1F3F1] hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>
              Application Checklist ({completedTasks}/{totalTasks})
            </span>
          </button>
        </div>

        {/* TAB 1: RECOMMENDED MATCHES  */}

        {activeTab === "matches" && (
          <div className="space-y-8 animate-fade-in">
            {/* Non-Guarantee Notice */}
            <div className="p-4 rounded-lg bg-[#E5EEE7] dark:bg-[#222D26] border border-[#276749]/20 text-xs sm:text-sm text-[#252A27] dark:text-[#E2E8F0] flex items-start gap-3 leading-relaxed">
              <ShieldAlert className="w-5 h-5 text-[#276749] dark:text-[#84CCA0] shrink-0 mt-0.5" />
              <div>
                <strong>Advisory Notice: </strong>
                Recommendations and cost figures are educational estimates. They
                do not guarantee university offers, visas, or scholarship
                approval. Always verify official admission deadlines directly
                with embassies and university portals.
              </div>
            </div>

            {/* Error Message */}
            {!loading && error && (
              <div
                className="rounded-lg border border-red-200 bg-red-50 p-5 dark:border-red-900 dark:bg-red-950/30"
                role="alert"
              >
                <div className="flex items-start gap-3">
                  <ShieldAlert className="h-5 w-5 shrink-0 text-red-600" />

                  <div>
                    <h3 className="font-semibold text-red-700 dark:text-red-300">
                      Unable to load recommendations
                    </h3>

                    <p className="mt-1 text-sm text-red-600 dark:text-red-300">
                      {error}
                    </p>

                    <Link
                      to="/assessment"
                      className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#276749] px-4 py-2 text-sm font-semibold text-white"
                    >
                      Complete Assessment
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {loading ? (
              <div
                className="flex flex-col items-center justify-center gap-4 p-12 text-center bg-white dark:bg-[#1B231F] rounded-lg border border-[#E5E7EB] dark:border-[#2D3A32]"
                role="status"
                aria-live="polite"
              >
                <LoaderCircle className="h-10 w-10 animate-spin text-[#276749] dark:text-[#84CCA0]" />

                <p className="text-base font-bold text-[#276749] dark:text-[#84CCA0]">
                  Finding your best study destinations...
                </p>

                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                  Analyzing your academic profile, budget, scholarships, and
                  study options.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* 1. Best Fit Country */}
                {!bestFit && (
                  <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1B231F] p-8 text-center">
                    <h3 className="text-lg font-bold mb-2">
                      No recommendations available
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Complete your student assessment or try generating your
                      recommendations again.
                    </p>

                    <Link
                      to="/assessment"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#276749] px-4 py-2 text-sm font-semibold text-white"
                    >
                      Review Assessment
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                )}
                {bestFit && (
                  <div className="bg-white dark:bg-[#1B231F] rounded-lg border-2 border-[#276749] p-6 sm:p-8 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB] dark:border-[#2D3A32]">
                      <div>
                        <span className="inline-block px-2.5 py-1 rounded bg-[#276749] text-white text-xs font-bold uppercase tracking-wider mb-2">
                          #1 Best-Fit Country
                        </span>
                        <div className="flex items-center gap-3">
                          <span
                            className="text-4xl select-none"
                            role="img"
                            aria-label={bestFit.countryName}
                          >
                            {bestFit.flag}
                          </span>
                          <div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252A27] dark:text-[#F1F3F1]">
                              {bestFit.countryName}
                            </h2>
                            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
                              {bestFitCountryData.tagline}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-2xl font-black text-[#276749] dark:text-[#84CCA0]">
                          {bestFit.matchScore != null
                            ? `${bestFit.matchScore}%`
                            : "AI Recommended"}
                        </span>
                        <span className="block text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">
                          Profile Compatibility
                        </span>
                      </div>
                    </div>

                    {/* Tuition and Living Cost text */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-[#FAF9F6] dark:bg-[#141A16] border border-[#E5E7EB] dark:border-[#2D3A32]">
                      <div>
                        <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                          Estimated Annual Tuition Fee:
                        </div>
                        <div className="text-sm font-bold text-[#252A27] dark:text-[#F1F3F1] mt-0.5">
                          {bestFitCountryData.avgAnnualTuitionINR ||
                            "Not provided by AI"}
                        </div>
                        <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
                          {bestFitCountryData.tuitionModel ||
                            "Not provided by AI"}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                          Estimated Annual Living Cost:
                        </div>
                        <div className="text-sm font-bold text-[#252A27] dark:text-[#F1F3F1] mt-0.5">
                          {bestFitCountryData.avgAnnualLivingINR ||
                            "Not provided by AI"}
                        </div>
                        <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
                          Post-Study Work Visa:{" "}
                          {bestFitCountryData.postStudyWorkVisa ||
                            "Not provided by AI"}
                        </div>
                      </div>
                    </div>

                    {/* Total Cost in INR */}
                    <div className="p-3.5 rounded-lg bg-[#E5EEE7] dark:bg-[#222D26] text-sm text-[#252A27] dark:text-[#F1F3F1] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span>
                        <strong>Total Estimated Cost / Year: </strong>{" "}
                        {bestFit.estimatedAnnualINR}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setCalcCountryId(bestFit.countryId);
                          handleTabChange("calculator");
                        }}
                        className="text-xs font-semibold text-[#276749] dark:text-[#84CCA0] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Open Detailed Cost Breakdown</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Why this country suits the student */}
                    <div>
                      <h3 className="text-sm font-bold text-[#252A27] dark:text-[#F1F3F1] mb-2">
                        Why {bestFit.countryName} Suits Your Profile:
                      </h3>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-[#252A27] dark:text-[#D1D5DB]">
                        {bestFit.whySuits.map((reason, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#276749] dark:text-[#84CCA0] shrink-0 mt-0.5" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Universities in Best-Fit Country */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setShowBestFitUnis(!showBestFitUnis)}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#276749] hover:bg-[#1F523A] text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>
                          {showBestFitUnis
                            ? "Hide Universities"
                            : `View Top Universities in ${bestFit.countryName}`}
                        </span>
                        {showBestFitUnis ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      {showBestFitUnis && (
                        <div className="mt-4 pt-4 border-t border-[#E5E7EB] dark:border-[#2D3A32] space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF]">
                            Recommended Universities in {bestFit.countryName}:
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {(bestFitCountryData.topUniversities || []).map(
                              (uni, idx) => (
                                <div
                                  key={idx}
                                  className="p-4 rounded-lg bg-[#FAF9F6] dark:bg-[#141A16] border border-[#E5E7EB] dark:border-[#2D3A32] space-y-2 text-xs"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-sm text-[#252A27] dark:text-[#F1F3F1]">
                                      {uni.name}
                                    </span>
                                    <span className="px-2 py-0.5 rounded bg-[#E5EEE7] dark:bg-[#222D26] text-[#276749] dark:text-[#84CCA0] text-[10px] font-bold">
                                      {uni.globalRank}
                                    </span>
                                  </div>
                                  <div className="text-[#6B7280] dark:text-[#9CA3AF]">
                                    City: {uni.city} • Popular For:{" "}
                                    {uni.popularFor.join(", ")}
                                  </div>
                                  <div className="text-[#252A27] dark:text-[#D1D5DB]">
                                    <strong>Tuition:</strong>{" "}
                                    {uni.avgTuitionINR}
                                  </div>
                                  <a
                                    href={uni.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[#276749] dark:text-[#84CCA0] font-semibold hover:underline pt-1"
                                  >
                                    <span>Official University Website</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 2. Alternative Country Options */}
                {alternatives.length > 0 && (
                  <div className="space-y-4 pt-2">
                    <div>
                      <h3 className="text-xl font-bold text-[#252A27] dark:text-[#F1F3F1]">
                        Alternative Country Options
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                        Viable alternatives aligned with your CGPA and funding
                        capacity.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {alternatives.map((alt) => {
                        const countryInfo = getCountryDetails(alt.countryId);
                        const isExpanded = !!expandedAltUnis[alt.countryId];

                        return (
                          <div
                            key={alt.countryId}
                            className="bg-white dark:bg-[#1B231F] rounded-lg border border-[#E5E7EB] dark:border-[#2D3A32] p-6 space-y-4 flex flex-col justify-between"
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span
                                  className="text-3xl select-none"
                                  role="img"
                                  aria-label={alt.countryName}
                                >
                                  {alt.flag}
                                </span>
                                <span className="text-sm font-bold text-[#276749] dark:text-[#84CCA0]">
                                  {alt.matchScore != null
                                    ? `${alt.matchScore}% Match`
                                    : "AI Recommended"}
                                </span>
                              </div>

                              <div>
                                <h4 className="text-lg font-bold text-[#252A27] dark:text-[#F1F3F1]">
                                  {alt.countryName}
                                </h4>
                                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
                                  {countryInfo.tagline}
                                </p>
                              </div>

                              <div className="p-3 rounded bg-[#FAF9F6] dark:bg-[#141A16] border border-[#E5E7EB] dark:border-[#2D3A32] text-xs space-y-1">
                                <div>
                                  <strong>Estimated Annual Cost: </strong>
                                  {alt.estimatedAnnualINR}
                                </div>
                                <div>
                                  <strong>Post-Study Work Visa: </strong>
                                  {countryInfo.postStudyWorkVisa}
                                </div>
                                <div>
                                  <strong>Tuition Model: </strong>
                                  {countryInfo.tuitionModel}
                                </div>
                              </div>

                              <p className="text-xs text-[#252A27] dark:text-[#D1D5DB] leading-relaxed">
                                {alt.whySuits[0]}
                              </p>
                            </div>

                            {/* View Universities for Alternative */}
                            <div className="pt-2 border-t border-[#E5E7EB] dark:border-[#2D3A32]">
                              <button
                                type="button"
                                onClick={() => toggleAltUnis(alt.countryId)}
                                className="text-xs font-semibold text-[#276749] dark:text-[#84CCA0] hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <span>
                                  {isExpanded
                                    ? "Hide Universities"
                                    : `View Universities in ${alt.countryName}`}
                                </span>
                                {isExpanded ? (
                                  <ChevronUp className="w-3.5 h-3.5" />
                                ) : (
                                  <ChevronDown className="w-3.5 h-3.5" />
                                )}
                              </button>

                              {isExpanded && (
                                <div className="mt-3 space-y-2 pt-2 border-t border-[#E5E7EB] dark:border-[#2D3A32]">
                                  {countryInfo.topUniversities
                                    .slice(0, 2)
                                    .map((uni, i) => (
                                      <div
                                        key={i}
                                        className="text-xs space-y-0.5"
                                      >
                                        <div className="font-semibold text-[#252A27] dark:text-[#F1F3F1]">
                                          {uni.name}
                                        </div>
                                        <div className="text-[#6B7280] dark:text-[#9CA3AF]">
                                          Fee: {uni.avgTuitionINR}
                                        </div>
                                        <a
                                          href={uni.websiteUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-[11px] text-[#276749] dark:text-[#84CCA0] hover:underline inline-flex items-center gap-1"
                                        >
                                          <span>Official Website</span>
                                          <ExternalLink className="w-3 h-3" />
                                        </a>
                                      </div>
                                    ))}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Gateway to Next Steps */}
                <div className="p-6 rounded-lg bg-[#E5EEE7] dark:bg-[#222D26] text-center space-y-3">
                  <h3 className="font-bold text-base text-[#252A27] dark:text-[#F1F3F1]">
                    Continue Planning Your Application
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] max-w-lg mx-auto">
                    Check out verified scholarships, calculate exact living
                    costs, or check off your admission timeline.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                    <Link
                      to="/scholarships"
                      className="px-5 py-2.5 rounded-lg bg-[#276749] hover:bg-[#1F523A] text-white text-xs sm:text-sm font-semibold transition-colors"
                    >
                      Find Scholarships
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleTabChange("planner")}
                      className="px-5 py-2.5 rounded-lg bg-white dark:bg-[#1B231F] text-[#252A27] dark:text-[#F1F3F1] border border-[#E5E7EB] dark:border-[#2D3A32] text-xs sm:text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      Open Application Plan
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: EXPLORE ALL 7 COUNTRIES */}

        {activeTab === "explore" && (
          <div className="space-y-6 animate-fade-in">
            {/* Search & Filter Bar */}
            <div className="p-4 rounded-lg bg-white dark:bg-[#1B231F] border border-[#E5E7EB] dark:border-[#2D3A32] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-[#6B7280] dark:text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg bg-[#FAF9F6] dark:bg-[#141A16] border border-[#E5E7EB] dark:border-[#2D3A32] text-[#252A27] dark:text-[#F1F3F1] focus:outline-none focus:ring-2 focus:ring-[#276749]"
                />
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
                <span className="text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] mr-1 hidden sm:inline">
                  Tuition:
                </span>
                {["All", "Free / Nominal", "Moderate", "High"].map((model) => (
                  <button
                    key={model}
                    type="button"
                    onClick={() => setTuitionFilter(model)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                      tuitionFilter === model
                        ? "bg-[#276749] text-white"
                        : "bg-[#FAF9F6] dark:bg-[#141A16] text-[#6B7280] dark:text-[#9CA3AF] border border-[#E5E7EB] dark:border-[#2D3A32] hover:text-[#252A27]"
                    }`}
                  >
                    {model}
                  </button>
                ))}
              </div>
            </div>

            {/* Country Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCountries.map((c) => {
                const isShortlisted = isCountryShortlisted(c.countryId);
                const isExpanded = expandedCountryId === c.countryId;

                return (
                  <div
                    key={c.id}
                    className="bg-white dark:bg-[#1B231F] rounded-lg border border-[#E5E7EB] dark:border-[#2D3A32] p-5 sm:p-6 space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="text-3xl select-none"
                            role="img"
                            aria-label={c.name}
                          >
                            {c.flag}
                          </span>
                          <div>
                            <h3 className="text-lg font-bold text-[#252A27] dark:text-[#F1F3F1]">
                              {c.name}
                            </h3>
                            <span className="text-[11px] font-semibold text-[#276749] dark:text-[#84CCA0]">
                              {c.tuitionModel} Tuition
                            </span>
                          </div>
                        </div>

                        {/* Save / Shortlist Button */}
                        <button
                          type="button"
                          onClick={() => toggleShortlistCountry(c.id)}
                          aria-label={
                            isShortlisted
                              ? "Remove from shortlist"
                              : "Shortlist country"
                          }
                          className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                            isShortlisted
                              ? "bg-[#E5EEE7] text-[#276749] dark:bg-[#222D26] dark:text-[#84CCA0] border-[#276749]/30"
                              : "bg-transparent border-[#E5E7EB] dark:border-[#2D3A32] text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#252A27]"
                          }`}
                        >
                          <Bookmark
                            className={`w-3.5 h-3.5 ${isShortlisted ? "fill-[#276749]" : ""}`}
                          />
                          <span className="text-[11px]">
                            {isShortlisted ? "Saved" : "Save"}
                          </span>
                        </button>
                      </div>

                      <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                        {c.tagline}
                      </p>

                      <div className="p-3 rounded-lg bg-[#FAF9F6] dark:bg-[#141A16] border border-[#E5E7EB] dark:border-[#2D3A32] text-xs space-y-1.5">
                        <div className="flex justify-between">
                          <span className="text-[#6B7280] dark:text-[#9CA3AF]">
                            Tuition:
                          </span>
                          <span className="font-semibold text-right">
                            {c.avgAnnualTuitionINR}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6B7280] dark:text-[#9CA3AF]">
                            Living (1 yr):
                          </span>
                          <span className="font-semibold text-right">
                            {c.avgAnnualLivingINR}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6B7280] dark:text-[#9CA3AF]">
                            Post-Study Work:
                          </span>
                          <span className="font-semibold text-right">
                            {c.postStudyWorkVisa}
                          </span>
                        </div>
                      </div>

                      {/* Expandable Deep Requirements & Top Universities */}
                      {isExpanded && (
                        <div className="pt-3 border-t border-[#E5E7EB] dark:border-[#2D3A32] space-y-3 text-xs">
                          <div className="space-y-1 text-[#252A27] dark:text-[#D1D5DB]">
                            <div>
                              <strong>Blocked Account / Funds:</strong>{" "}
                              {c.visaRequirements?.proofOfFunds}
                            </div>
                            <div>
                              <strong>Min CGPA / IELTS:</strong>{" "}
                              {c.entryRequirements?.minCGPA} • IELTS:{" "}
                              {c.entryRequirements?.ieltsCutoff}
                            </div>
                          </div>

                          <div>
                            <span className="font-bold text-[11px] uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF] block mb-1.5">
                              Top Universities:
                            </span>
                            <div className="space-y-1.5">
                              {(c.topUniversities || []).map((uni, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between"
                                >
                                  <span>
                                    {uni.name} ({uni.globalRank})
                                  </span>
                                  <a
                                    href={uni.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#276749] dark:text-[#84CCA0] font-semibold hover:underline inline-flex items-center gap-0.5 text-[11px]"
                                  >
                                    <span>Website</span>
                                    <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#E5E7EB] dark:border-[#2D3A32] flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedCountryId(isExpanded ? null : c.id)
                        }
                        className="text-xs font-semibold text-[#276749] dark:text-[#84CCA0] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>
                          {isExpanded
                            ? "Less details"
                            : "View full details & requirements"}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setCalcCountryId(c.id);
                          handleTabChange("calculator");
                        }}
                        className="text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#276749] dark:hover:text-[#84CCA0] flex items-center gap-1 cursor-pointer"
                      >
                        <Calculator className="w-3.5 h-3.5" />
                        <span>Calculate Cost</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: ESTIMATED YEARLY COSTS (IN INR)*/}

        {activeTab === "calculator" && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-5 sm:p-6 rounded-lg bg-white dark:bg-[#1B231F] border border-[#E5E7EB] dark:border-[#2D3A32] space-y-5">
              <h2 className="text-xl font-bold">Estimated Study Costs (INR)</h2>

              <div>
                <label
                  htmlFor="cost-country-select"
                  className="block text-xs font-semibold mb-2"
                >
                  Select Country
                </label>

                <select
                  id="cost-country-select"
                  value={calcCountryId}
                  onChange={(e) => setCalcCountryId(e.target.value)}
                  className="w-full sm:w-72 px-3 py-2 rounded-lg bg-[#FAF9F6] dark:bg-[#141A16] border border-[#E5E7EB] dark:border-[#2D3A32] text-sm"
                >
                  <option value="">Choose a country</option>

                  {recommendations.map((country) => (
                    <option key={country.countryId} value={country.countryId}>
                      {country.flag} {country.countryName}
                    </option>
                  ))}
                </select>
              </div>

              {selectedCalcCountry ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-[#FAF9F6] dark:bg-[#141A16] border border-[#E5E7EB] dark:border-[#2D3A32]">
                      <p className="text-xs text-gray-500">
                        Estimated total per year
                      </p>
                      <p className="text-xl font-bold mt-2">
                        {selectedCalcCountry.estimatedAnnualINR ||
                          "Not provided by AI"}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-[#FAF9F6] dark:bg-[#141A16] border border-[#E5E7EB] dark:border-[#2D3A32]">
                      <p className="text-xs text-gray-500">Course duration</p>

                      <div className="flex gap-2 mt-2">
                        {[1, 2].map((years) => (
                          <button
                            key={years}
                            type="button"
                            onClick={() => setCalcDuration(years)}
                            className={`px-3 py-1.5 rounded-md text-xs font-semibold ${
                              calcDuration === years
                                ? "bg-[#276749] text-white"
                                : "border border-gray-300 dark:border-gray-600"
                            }`}
                          >
                            {years} Year{years > 1 ? "s" : ""}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-[#E5EEE7] dark:bg-[#222D26]">
                    <p className="text-sm font-semibold">
                      Estimated cost for {calcDuration} year
                      {calcDuration > 1 ? "s" : ""}
                    </p>

                    <p className="text-2xl font-extrabold text-[#276749] dark:text-[#84CCA0] mt-2">
                      {totalCourseCost !== null
                        ? formatINR(totalCourseCost)
                        : "Not provided by AI"}
                    </p>

                    <p className="text-xs mt-2">
                      This estimate multiplies the AI-provided annual cost by
                      the selected course duration. Actual costs may vary.
                    </p>
                  </div>

                  <p className="text-xs text-gray-500">
                    Country: {selectedCalcCountry.countryName}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Select a country to view its estimated study cost.
                </p>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: MY APPLICATION PLAN (CHECKLIST) */}

        {activeTab === "planner" && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-5 sm:p-6 rounded-lg bg-white dark:bg-[#1B231F] border border-[#E5E7EB] dark:border-[#2D3A32] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-[#252A27] dark:text-[#F1F3F1]">
                    My Application Plan & Checklist
                  </h2>
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
                    Step-by-step milestones with deadlines. Click any status
                    button to update.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetTasks}
                  className="text-xs text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#276749] dark:hover:text-[#84CCA0] flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Milestones</span>
                </button>
              </div>

              {/* Progress Count */}
              <div className="p-3.5 rounded-lg bg-[#E5EEE7] dark:bg-[#222D26] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#276749] dark:text-[#84CCA0]">
                  Progress: {completedTasks} of {totalTasks} Milestones
                  Completed
                </span>
                <span className="font-bold">
                  {totalTasks > 0
                    ? Math.round((completedTasks / totalTasks) * 100)
                    : 0}
                  % Done
                </span>
              </div>

              {/* Status Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {["All", "Not Started", "In Progress", "Completed"].map(
                  (status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setTaskFilter(status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                        taskFilter === status
                          ? "bg-[#276749] text-white"
                          : "bg-[#FAF9F6] dark:bg-[#141A16] text-[#6B7280] dark:text-[#9CA3AF] border border-[#E5E7EB] dark:border-[#2D3A32] hover:text-[#252A27]"
                      }`}
                    >
                      {status}
                    </button>
                  ),
                )}
              </div>

              {/* Checklist Items */}
              <div className="space-y-3 pt-2">
                {filteredTasks.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 rounded-lg bg-[#FAF9F6] dark:bg-[#141A16] border border-[#E5E7EB] dark:border-[#2D3A32] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#252A27] dark:text-[#F1F3F1]">
                          {t.title}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-[10px] font-semibold text-[#6B7280] dark:text-[#9CA3AF]">
                          {t.priority} Priority
                        </span>
                      </div>
                      <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                        {t.description}
                      </p>
                      <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">
                        Target Date: <b>{t.dueDate}</b>
                        {t.officialResourceUrl && (
                          <a
                            href={t.officialResourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-3 text-[#276749] dark:text-[#84CCA0] font-semibold hover:underline inline-flex items-center gap-1"
                          >
                            <span>Official Portal</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Interactive Status Cycle Button */}
                    <button
                      type="button"
                      onClick={() => toggleTaskStatus(t.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto shrink-0 ${
                        t.status === "Completed"
                          ? "bg-[#E5EEE7] text-[#276749] dark:bg-[#222D26] dark:text-[#84CCA0] border border-[#276749]/30"
                          : t.status === "In Progress"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-200 border border-amber-300 dark:border-amber-700"
                            : "bg-white dark:bg-[#1B231F] border border-[#E5E7EB] dark:border-[#2D3A32] text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#252A27]"
                      }`}
                    >
                      {t.status} ↻
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
