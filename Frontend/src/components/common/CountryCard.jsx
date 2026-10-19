import React from "react";
import { Link } from "react-router-dom";
import { Bookmark, CheckCircle2, ArrowRight, Clock } from "lucide-react";
import { useApp } from "../../context/AppContext.jsx";

export const CountryCard = ({ recommendation, rank }) => {
  const { isCountryShortlisted, toggleShortlistCountry } = useApp();
  const isShortlisted = isCountryShortlisted(recommendation.countryId);

  return (
    <div className="bg-white dark:bg-[#1B231F] rounded-lg border border-[#E5E7EB] dark:border-[#2D3A32] p-5 space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {rank && (
              <span className="w-5 h-5 rounded-full bg-[#E5EEE7] dark:bg-[#222D26] text-[#276749] dark:text-[#84CCA0] text-xs font-bold flex items-center justify-center">
                {rank}
              </span>
            )}
            <span className="text-xs px-2 py-0.5 rounded font-semibold bg-[#E5EEE7] dark:bg-[#222D26] text-[#276749] dark:text-[#84CCA0]">
              {recommendation.categoryTag || "Top Match"}
            </span>
          </div>

          <button
            onClick={() => toggleShortlistCountry(recommendation.countryId)}
            type="button"
            aria-label={isShortlisted ? "Remove country" : "Save country"}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isShortlisted
                ? "bg-[#E5EEE7] text-[#276749] border-[#276749]/30 dark:bg-[#222D26] dark:text-[#84CCA0]"
                : "bg-[#FAF9F6] dark:bg-[#141A16] text-[#6B7280] dark:text-[#9CA3AF] border-[#E5E7EB] dark:border-[#2D3A32]"
            }`}
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${isShortlisted ? "fill-[#276749]" : ""}`}
            />
          </button>
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span
              className="text-3xl select-none"
              role="img"
              aria-label={recommendation.countryName}
            >
              {recommendation.flag}
            </span>
            <div>
              <h3 className="text-lg font-bold text-[#252A27] dark:text-[#F1F3F1]">
                {recommendation.countryName}
              </h3>
              <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#276749] dark:text-[#84CCA0]" />
                <span>PSW: {recommendation.pswDuration}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-sm font-bold text-[#276749] dark:text-[#84CCA0]">
              {recommendation.matchScore}%
            </span>
            <span className="block text-[10px] text-[#6B7280] dark:text-[#9CA3AF]">
              Match
            </span>
          </div>
        </div>

        <div className="p-3 rounded bg-[#FAF9F6] dark:bg-[#141A16] border border-[#E5E7EB] dark:border-[#2D3A32] text-xs space-y-1">
          <div>
            <strong>Est. Cost / Year: </strong>
            {recommendation.estimatedAnnualINR}
          </div>
        </div>

        <ul className="space-y-1 text-xs text-[#252A27] dark:text-[#D1D5DB]">
          {recommendation.whySuits.slice(0, 2).map((reason, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#276749] dark:text-[#84CCA0] shrink-0 mt-0.5" />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-3 border-t border-[#E5E7EB] dark:border-[#2D3A32]">
        <Link
          to={`/recommendations?tab=explore`}
          className="text-xs font-semibold text-[#276749] dark:text-[#84CCA0] hover:underline flex items-center justify-between"
        >
          <span>Explore Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
