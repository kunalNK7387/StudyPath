import React from "react";
import { Check, User, Target, Wallet, FileCheck2 } from "lucide-react";

export const ProgressBar = ({ currentStep, totalSteps, onStepClick }) => {
  const steps = [
    { number: 1, title: "Personal & Academic", icon: User },
    { number: 2, title: "Career & Course", icon: Target },
    { number: 3, title: "Budget & Funding", icon: Wallet },
    { number: 4, title: "Exams & Timeline", icon: FileCheck2 },
  ];

  return (
    <div className="w-full py-4 mb-6">
      {/* Mobile progress indicator */}
      <div className="sm:hidden mb-2 flex items-center justify-between text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF]">
        <span>
          Step {currentStep} of {totalSteps}: {steps[currentStep - 1]?.title}
        </span>
        <span className="text-[#276749] dark:text-[#84CCA0]">
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>
      <div className="sm:hidden w-full h-1.5 bg-[#E5E7EB] dark:bg-[#2D3A32] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#276749] dark:bg-[#348A63] transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Desktop Step Indicator */}
      <div className="hidden sm:flex items-center justify-between relative">
        <div className="absolute top-4 left-8 right-8 h-0.5 bg-[#E5E7EB] dark:bg-[#2D3A32] -z-0">
          <div
            className="h-full bg-[#276749] dark:bg-[#348A63] transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            }}
          />
        </div>

        {steps.map((step) => {
          const isDone = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          const Icon = step.icon;

          return (
            <div
              key={step.number}
              onClick={() => onStepClick && isDone && onStepClick(step.number)}
              className={`flex flex-col items-center relative z-10 ${
                isDone ? "cursor-pointer" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  isDone
                    ? "bg-[#276749] text-white"
                    : isCurrent
                      ? "bg-[#276749] text-white ring-4 ring-[#E5EEE7] dark:ring-[#222D26]"
                      : "bg-white dark:bg-[#1B231F] text-[#6B7280] dark:text-[#9CA3AF] border border-[#E5E7EB] dark:border-[#2D3A32]"
                }`}
              >
                {isDone ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : (
                  <Icon className="w-3.5 h-3.5" />
                )}
              </div>
              <span
                className={`mt-2 text-xs font-semibold ${
                  isCurrent
                    ? "text-[#276749] dark:text-[#84CCA0]"
                    : isDone
                      ? "text-[#252A27] dark:text-[#F1F3F1]"
                      : "text-[#6B7280] dark:text-[#9CA3AF]"
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
