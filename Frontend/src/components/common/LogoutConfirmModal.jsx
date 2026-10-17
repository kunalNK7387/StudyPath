import React, { useEffect } from "react";
import { LogOut, X } from "lucide-react";

export const LogoutConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  userName,
}) => {
  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-[1px] animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-dialog-title"
    >
      {/* Backdrop overlay dismiss */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Surface */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-white dark:bg-[#1B231F] text-[#252A27] dark:text-[#F1F3F1] rounded-xl border border-[#E5E7EB] dark:border-[#2D3A32] shadow-xl p-6 sm:p-7 space-y-5 z-10">
        {/* Close "X" Button in top corner */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cancel and close dialog"
          className="absolute top-4 right-4 p-1 rounded-md text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#252A27] dark:hover:text-[#F1F3F1] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with Forest-green icon badge */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-full bg-[#E5EEE7] dark:bg-[#222D26] text-[#276749] dark:text-[#84CCA0] shrink-0">
            <LogOut className="w-5 h-5" />
          </div>
          <div>
            <h2
              id="logout-dialog-title"
              className="text-lg font-bold text-[#252A27] dark:text-[#F1F3F1]"
            >
              Confirm Logout
            </h2>
            {userName && (
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                Account: {userName}
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2 text-xs sm:text-sm text-[#252A27] dark:text-[#D1D5DB]">
          <p className="font-semibold text-sm text-[#252A27] dark:text-[#F1F3F1]">
            Are you sure you want to log out?
          </p>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
            Your saved profile, shortlisted universities, and application
            checklist milestones will remain safely preserved for your next
            visit.
          </p>
        </div>

        {/* Actions: Cancel & Logout buttons */}
        <div className="flex items-center gap-3 pt-2">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-lg border border-[#E5E7EB] dark:border-[#2D3A32] bg-transparent hover:bg-[#FAF9F6] dark:hover:bg-[#141A16] text-[#252A27] dark:text-[#F1F3F1] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </button>

          {/* Confirm Logout Button */}
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 px-4 rounded-lg bg-[#276749] hover:bg-[#1F523A] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
