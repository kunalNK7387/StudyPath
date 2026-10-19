import React from "react";
import { Bookmark, ExternalLink, Calendar, CheckCircle2 } from "lucide-react";
import { useApp } from "../../context/AppContext.jsx";

export const ScholarshipCard = ({ scholarship }) => {
  const { isScholarshipSaved, toggleSaveScholarship } = useApp();
  const isSaved = isScholarshipSaved(scholarship.id);

  return (
    <div className="bg-white dark:bg-[#1B231F] rounded-lg border border-[#E5E7EB] dark:border-[#2D3A32] p-5 space-y-3 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] px-2 py-0.5 rounded font-bold bg-[#E5EEE7] dark:bg-[#222D26] text-[#276749] dark:text-[#84CCA0]">
              {scholarship.fundingType}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[#FAF9F6] dark:bg-[#141A16] border border-[#E5E7EB] dark:border-[#2D3A32] text-[#252A27] dark:text-[#D1D5DB]">
              {scholarship.country}
            </span>
          </div>

          <button
            onClick={() => toggleSaveScholarship(scholarship.id)}
            type="button"
            aria-label={isSaved ? "Remove scholarship" : "Save scholarship"}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isSaved
                ? "bg-[#E5EEE7] text-[#276749] border-[#276749]/30 dark:bg-[#222D26] dark:text-[#84CCA0]"
                : "bg-[#FAF9F6] dark:bg-[#141A16] text-[#6B7280] dark:text-[#9CA3AF] border-[#E5E7EB] dark:border-[#2D3A32]"
            }`}
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${isSaved ? "fill-[#276749]" : ""}`}
            />
          </button>
        </div>

        <div>
          <h3 className="font-bold text-base text-[#252A27] dark:text-[#F1F3F1]">
            {scholarship.name}
          </h3>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
            {scholarship.provider}
          </p>
        </div>

        <div className="p-3 rounded bg-[#FAF9F6] dark:bg-[#141A16] border border-[#E5E7EB] dark:border-[#2D3A32] text-xs space-y-0.5">
          <div className="font-semibold text-[#276749] dark:text-[#84CCA0]">
            Award: {scholarship.awardAmount}
          </div>
          <p className="text-[#6B7280] dark:text-[#9CA3AF] line-clamp-2">
            {scholarship.awardDetails}
          </p>
        </div>

        <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF] flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#276749] dark:text-[#84CCA0]" />
          <span>Deadline: {scholarship.deadline}</span>
        </div>
      </div>

      <div className="pt-3 border-t border-[#E5E7EB] dark:border-[#2D3A32]">
        <a
          href={scholarship.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-[#276749] dark:text-[#84CCA0] hover:underline inline-flex items-center gap-1"
        >
          <span>Official Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
