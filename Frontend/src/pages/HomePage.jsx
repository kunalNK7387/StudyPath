import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export const HomePage = () => {
  const { loadSampleProfile } = useApp();

  const steps = [
    {
      num: "1",
      title: "Enter Your Profile",
      desc: "Fill in your education, marks or CGPA, desired course, and annual budget in Indian Rupees.",
    },
    {
      num: "2",
      title: "Review Recommendations",
      desc: "See which countries best fit your academic goals, budget, and post-study work visa preferences.",
    },
    {
      num: "3",
      title: "Plan Your Next Steps",
      desc: "Check eligible scholarships, explore universities, and track your admission checklist with verified deadlines.",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF9F6] dark:bg-[#141A16] text-[#252A27] dark:text-[#F1F3F1] py-12 sm:py-20 px-4 sm:px-6 transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 pt-4">
          <div className="inline-block px-3 py-1 rounded-full bg-[#E5EEE7] dark:bg-[#222D26] text-[#276749] dark:text-[#84CCA0] text-xs font-semibold">
            Study Abroad Advisory for Indian Students
          </div>

          {/* Simple Heading */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#252A27] dark:text-[#F1F3F1] leading-tight">
            Find Your Path to Studying Abroad
          </h1>

          {/* One Short Description */}
          <p className="text-base sm:text-lg text-[#6B7280] dark:text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
            Discover suitable countries, universities, and scholarships based on
            your academic profile, budget in INR, and career goals.
          </p>

          {/* Primary Button: "Find My Best Country" */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/assessment"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#276749] hover:bg-[#1F523A] text-white font-semibold text-base transition-colors flex items-center justify-center gap-2"
            >
              <span>Find My Best Country</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Sample quick test shortcut for convenience */}
          <div className="pt-4 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
            <span>Quick test? </span>
            <button
              type="button"
              onClick={() => loadSampleProfile("stem")}
              className="text-[#276749] dark:text-[#84CCA0] font-semibold underline underline-offset-2 hover:opacity-80 ml-1 cursor-pointer"
            >
              Load Aarav's Profile (B.Tech, 8.4 CGPA, ₹15L)
            </button>
          </div>
        </div>

        {/* Three Small Text-Based Steps Explaining How It Works */}
        <div className="pt-8 border-t border-[#E5E7EB] dark:border-[#2D3A32]">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#252A27] dark:text-[#F1F3F1]">
              How It Works
            </h2>
            <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
              Three simple steps to plan your international education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div
                key={s.num}
                className="bg-white dark:bg-[#1B231F] p-6 rounded-lg border border-[#E5E7EB] dark:border-[#2D3A32] space-y-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#E5EEE7] dark:bg-[#222D26] text-[#276749] dark:text-[#84CCA0] font-bold text-sm flex items-center justify-center">
                  {s.num}
                </div>
                <h3 className="font-bold text-base text-[#252A27] dark:text-[#F1F3F1]">
                  {s.title}
                </h3>
                <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Factual Note & Quick Links */}
        <div className="bg-[#E5EEE7] dark:bg-[#222D26] p-6 rounded-lg text-sm text-[#252A27] dark:text-[#F1F3F1] space-y-2">
          <div className="font-bold text-[#276749] dark:text-[#84CCA0]">
            Transparent & Honest Guidance
          </div>
          <p className="text-xs sm:text-sm text-[#252A27] dark:text-[#D1D5DB] leading-relaxed">
            All costs are estimated in Indian Rupees (₹) using realistic
            exchange rates. We cover popular destinations including Germany
            (tuition-free public universities), Canada, the UK, Ireland,
            Australia, and Italy.
          </p>
        </div>
      </div>
    </div>
  );
};
