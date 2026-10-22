import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  Calendar,
} from "lucide-react";

import { useApp } from "../context/AppContext.jsx";

export const ScholarshipFinderPage = () => {
  const {
    scholarships,
    recommendedCountries,
    isScholarshipSaved,
    toggleSaveScholarship,
  } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedFunding, setSelectedFunding] = useState("All");

  const previousCount = useRef(-1);
  const loadStartTime = useRef(performance.now());

  useEffect(() => {
    console.log("🎓 [Scholarships] Page mounted");
    console.log("📦 [Scholarships] Initial data:", scholarships);
    console.log("📊 [Scholarships] Initial count:", scholarships?.length ?? 0);

    return () => {
      console.log("👋 [Scholarships] Page unmounted");
    };
  }, []);

  useEffect(() => {
    const count = scholarships?.length ?? 0;

    if (count !== previousCount.current) {
      console.log("📊 [Scholarships] Data count changed:", count);
      console.log(
        "⏱️ [Scholarships] Time since page mounted:",
        `${((performance.now() - loadStartTime.current) / 1000).toFixed(2)}s`,
      );

      if (count > 0) {
        console.log(
          "✅ [Scholarships] Scholarships are available:",
          scholarships,
        );
      } else {
        console.warn(
          "⚠️ [Scholarships] No scholarship data in AppContext yet.",
        );
      }

      previousCount.current = count;
    }
  }, [scholarships]);

  const countries = [
    "All",
    ...new Set(
      [
        ...(recommendedCountries || []).map(
          (country) => country.countryName || country.name,
        ),
        ...(scholarships || []).map((scholarship) => scholarship.country),
      ].filter(Boolean),
    ),
  ];
  const fundingTypes = [
    "All",
    ...new Set(
      (scholarships || [])
        .map((scholarship) => scholarship.fundingType)
        .filter((type) => type && type !== "Needs verification"),
    ),
  ];

  const filteredScholarships = (scholarships || []).filter((s) => {
    const term = searchTerm.trim().toLowerCase();

    if (term) {
      const searchableText = [
        s.name,
        s.provider,
        s.country,
        s.scholarshipType,
        ...(Array.isArray(s.eligibility) ? s.eligibility : []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (!searchableText.includes(term)) return false;
    }

    if (selectedCountry !== "All" && s.country !== selectedCountry) {
      return false;
    }

    if (selectedFunding !== "All" && s.fundingType !== selectedFunding) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF9F6] dark:bg-[#141A16] text-[#252A27] dark:text-[#F1F3F1] py-10 px-4 sm:px-6 transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <div className="inline-block px-3 py-1 rounded-full bg-[#E5EEE7] dark:bg-[#222D26] text-[#276749] dark:text-[#84CCA0] text-xs font-semibold mb-2">
            Step 4: Scholarships & Financial Aid
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#252A27] dark:text-[#F1F3F1]">
            Scholarships for Indian Students
          </h1>
          <p className="mt-1 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
            Explore AI-recommended scholarships, eligibility requirements,
            funding details, and official application links. Verify all
            information with the scholarship provider before applying.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="p-4 rounded-lg bg-[#E5EEE7] dark:bg-[#222D26] border border-[#276749]/20 text-xs sm:text-sm text-[#252A27] dark:text-[#E2E8F0] flex items-start gap-3 leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-[#276749] dark:text-[#84CCA0] shrink-0 mt-0.5" />
          <div>
            <strong>Scholarship Notice: </strong>
            Scholarships are highly competitive and awarded solely by the
            offering foundations and universities. Application deadlines and
            funding rules are subject to change. Never pay agents for
            scholarship guarantees.
          </div>
        </div>

        {/* Simple Search and Filter Controls */}
        <div className="bg-white dark:bg-[#1B231F] p-4 rounded-lg border border-[#E5E7EB] dark:border-[#2D3A32] flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#6B7280] dark:text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by scholarship name, subject, or provider..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg bg-[#FAF9F6] dark:bg-[#141A16] border border-[#E5E7EB] dark:border-[#2D3A32] text-[#252A27] dark:text-[#F1F3F1] focus:outline-none focus:ring-2 focus:ring-[#276749]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-3 py-2 text-xs sm:text-sm rounded-lg bg-[#FAF9F6] dark:bg-[#141A16] border border-[#E5E7EB] dark:border-[#2D3A32] text-[#252A27] dark:text-[#F1F3F1] focus:outline-none focus:ring-2 focus:ring-[#276749]"
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Countries" : c}
                </option>
              ))}
            </select>

            <select
              value={selectedFunding}
              onChange={(e) => setSelectedFunding(e.target.value)}
              className="px-3 py-2 text-xs sm:text-sm rounded-lg bg-[#FAF9F6] dark:bg-[#141A16] border border-[#E5E7EB] dark:border-[#2D3A32] text-[#252A27] dark:text-[#F1F3F1] focus:outline-none focus:ring-2 focus:ring-[#276749]"
            >
              {fundingTypes.map((f) => (
                <option key={f} value={f}>
                  {f === "All" ? "All Funding" : f}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Scholarships List */}
        <div className="space-y-4">
          <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
            Showing <strong>{filteredScholarships.length}</strong> matching
            scholarships
          </div>

          {filteredScholarships.map((sch) => {
            const isSaved = isScholarshipSaved(sch.id);

            return (
              <div
                key={sch.id}
                className="bg-white dark:bg-[#1B231F] rounded-lg border border-[#E5E7EB] dark:border-[#2D3A32] p-5 sm:p-6 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-[#E5E7EB] dark:border-[#2D3A32]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#E5EEE7] dark:bg-[#222D26] text-[#276749] dark:text-[#84CCA0]">
                        {sch.fundingType}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#FAF9F6] dark:bg-[#141A16] border border-[#E5E7EB] dark:border-[#2D3A32] text-[#252A27] dark:text-[#D1D5DB]">
                        {sch.country}
                      </span>
                      {sch.isVerified && (
                        <span className="text-[11px] text-[#276749] dark:text-[#84CCA0] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Verified
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-[#252A27] dark:text-[#F1F3F1]">
                      {sch.name}
                    </h3>
                    <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
                      Provider: {sch.provider}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleSaveScholarship(sch.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors self-start cursor-pointer ${
                      isSaved
                        ? "bg-[#E5EEE7] text-[#276749] border-[#276749]/30 dark:bg-[#222D26] dark:text-[#84CCA0]"
                        : "bg-white dark:bg-[#1B231F] text-[#6B7280] dark:text-[#9CA3AF] border-[#E5E7EB] dark:border-[#2D3A32] hover:text-[#252A27]"
                    }`}
                  >
                    {isSaved ? "Saved in Plan" : "Save to Plan"}
                  </button>
                </div>

                {/* Benefits */}
                <div className="p-3.5 rounded-lg bg-[#FAF9F6] dark:bg-[#141A16] border border-[#E5E7EB] dark:border-[#2D3A32] text-xs space-y-1">
                  <div className="font-bold text-[#276749] dark:text-[#84CCA0]">
                    Award Benefits: {sch.awardAmount}
                  </div>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                    {sch.awardDetails}
                  </p>
                </div>

                {/* Eligibility */}
                <div>
                  <h4 className="text-xs font-bold text-[#252A27] dark:text-[#F1F3F1] uppercase tracking-wider mb-2">
                    Eligibility Requirements:
                  </h4>
                  <ul className="space-y-1 text-xs text-[#252A27] dark:text-[#D1D5DB]">
                    {(Array.isArray(sch.eligibility)
                      ? sch.eligibility
                      : []
                    ).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#276749] dark:bg-[#84CCA0] mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deadline & Official Link */}
                <div className="pt-3 border-t border-[#E5E7EB] dark:border-[#2D3A32] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-[#6B7280] dark:text-[#9CA3AF]">
                    <Calendar className="w-4 h-4 text-[#276749] dark:text-[#84CCA0]" />
                    <span>
                      <strong>Deadline:</strong> {sch.deadline}
                    </span>
                  </div>

                  {sch.officialUrl ? (
                    <a
                      href={sch.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#276749] hover:bg-[#1F523A] text-white font-semibold transition-colors self-start sm:self-auto"
                    >
                      <span>Official Application Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                      Official link needs verification
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {filteredScholarships.length === 0 && (
            <div className="p-8 text-center bg-white dark:bg-[#1B231F] rounded-lg border border-[#E5E7EB] dark:border-[#2D3A32]">
              <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />

              <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                No scholarships are currently available in this list.
              </p>

              <p className="mt-2 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                Check Country Matches & Plan to generate recommendations, then
                return here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
