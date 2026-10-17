import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-[#E5E7EB] dark:border-[#2D3A32] bg-white dark:bg-[#1B231F] text-[#252A27] dark:text-[#F1F3F1] py-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-[#E5E7EB] dark:border-[#2D3A32]">
          <div>
            <span className="text-lg font-bold">
              StudyPath{" "}
              <span className="text-[#276749] dark:text-[#348A63]">AI</span>
            </span>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
              Study abroad guidance for Indian students
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-6 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
            <Link
              to="/"
              className="hover:text-[#276749] dark:hover:text-[#348A63]"
            >
              Home
            </Link>
            <Link
              to="/assessment"
              className="hover:text-[#276749] dark:hover:text-[#348A63]"
            >
              Find My Country
            </Link>
            <Link
              to="/scholarships"
              className="hover:text-[#276749] dark:hover:text-[#348A63]"
            >
              Scholarships
            </Link>
            <Link
              to="/recommendations"
              className="hover:text-[#276749] dark:hover:text-[#348A63]"
            >
              Country Matches & Plan
            </Link>
            <Link
              to="/login"
              className="hover:text-[#276749] dark:hover:text-[#348A63]"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hover:text-[#276749] dark:hover:text-[#348A63]"
            >
              Register
            </Link>
          </nav>
        </div>

        <div className="pt-4 text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed space-y-2">
          <p>
            <strong>Disclaimer:</strong> StudyPath AI provides educational
            guidance based on student inputs. Recommendations, tuition fees, and
            living costs are estimates and do not guarantee university
            admission, scholarship awards, or visa issuance. Always verify
            requirements on official embassy and university portals.
          </p>
          <p className="text-center md:text-left pt-2">
            © {new Date().getFullYear()} StudyPath AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
