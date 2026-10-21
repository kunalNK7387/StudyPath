import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export const ProfileAssessmentPage = () => {
  const { setProfile, showToast } = useApp();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    nationality: "",
    currentEducation: "",
    academicMarks: "",
    desiredDegree: "",
    desiredCourse: "",
    annualBudgetINR: 600000,
    englishTest: "",
    englishScore: "",
    careerGoal: "",
    targetIntake: "",
    preferredCountries: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Please enter your name";
    if (!formData.academicMarks.trim())
      errs.academicMarks = "Please enter your marks or CGPA";
    if (!formData.desiredCourse.trim())
      errs.desiredCourse = "Please enter your desired course";
    if (!formData.desiredCourse.trim()) {
      errs.desiredCourse = "Please enter your desired course";
    }

    if (!formData.desiredDegree.trim()) {
      errs.desiredDegree = "Please select your desired degree";
    }
    if (!formData.careerGoal.trim())
      errs.careerGoal = "Please enter your career goal";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      showToast("Please fill in the required fields", "warning");
      return;
    }

    setProfile(formData);
    showToast("Profile saved! Generating recommendations...", "success");
    navigate("/recommendations");
  };

  const formatLakhs = (amt) => {
    return `₹${(amt / 100000).toFixed(0)} Lakhs`;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF9F6] dark:bg-[#141A16] text-[#252A27] dark:text-[#F1F3F1] py-10 px-4 sm:px-6 transition-colors duration-200">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <div className="inline-block px-3 py-1 rounded-full bg-[#E5EEE7] dark:bg-[#222D26] text-[#276749] dark:text-[#84CCA0] text-xs font-semibold mb-2">
            Student Assessment
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#252A27] dark:text-[#F1F3F1]">
            Tell Us About Yourself
          </h1>
          <p className="mt-1 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
            We will use your answers to recommend suitable countries, estimated
            tuition and living costs in INR, and verified scholarships.
          </p>
        </div>

        {/* Single Page Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#1B231F] p-6 sm:p-8 rounded-lg border border-[#E5E7EB] dark:border-[#2D3A32] space-y-6"
        >
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-[#252A27] dark:text-[#F1F3F1] mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] dark:border-[#2D3A32] bg-[#FAF9F6] dark:bg-[#141A16] text-[#252A27] dark:text-[#F1F3F1] text-sm focus:outline-none focus:ring-2 focus:ring-[#276749]"
            />
            {errors.fullName && (
              <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Current Education */}
          <div>
            <label className="block text-sm font-semibold text-[#252A27] dark:text-[#F1F3F1] mb-1">
              Current Education Level
            </label>
            <select
              value={formData.currentEducation}
              onChange={(e) => handleChange("currentEducation", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] dark:border-[#2D3A32] bg-[#FAF9F6] dark:bg-[#141A16] text-[#252A27] dark:text-[#F1F3F1] text-sm focus:outline-none focus:ring-2 focus:ring-[#276749]"
            >
              <option value="B.Tech / B.E. (Completed or Final Year)">
                4-Year B.Tech / B.E. (Engineering/Tech)
              </option>
              <option value="3-Year Bachelor's (B.Sc / B.Com / BBA / BA)">
                3-Year Bachelor's (B.Sc / B.Com / BBA / BA)
              </option>
              <option value="Master's Degree (M.Sc / M.Com / MCA / M.Tech)">
                Master's Degree (M.Sc / M.Tech / MCA)
              </option>
              <option value="12th Standard / High School Senior">
                12th Standard / High School Senior (Seeking Undergrad)
              </option>
            </select>
          </div>

          {/* Academic Marks or CGPA */}
          <div>
            <label className="block text-sm font-semibold text-[#252A27] dark:text-[#F1F3F1] mb-1">
              Academic Marks or CGPA
            </label>
            <input
              type="text"
              value={formData.academicMarks}
              onChange={(e) => handleChange("academicMarks", e.target.value)}
              placeholder="e.g. 8.4 CGPA or 78%"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] dark:border-[#2D3A32] bg-[#FAF9F6] dark:bg-[#141A16] text-[#252A27] dark:text-[#F1F3F1] text-sm focus:outline-none focus:ring-2 focus:ring-[#276749]"
            />
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
              European universities evaluate German equivalent grades (1.0 to
              2.5 is high). UK/Canada accept percentage or CGPA.
            </p>
            {errors.academicMarks && (
              <p className="text-xs text-red-600 mt-1">
                {errors.academicMarks}
              </p>
            )}
          </div>

          {/* Desired Course */}
          <div>
            <label className="block text-sm font-semibold text-[#252A27] dark:text-[#F1F3F1] mb-1">
              Desired Course / Subject
            </label>
            <input
              type="text"
              value={formData.desiredCourse}
              onChange={(e) => handleChange("desiredCourse", e.target.value)}
              placeholder="e.g. Computer Science, Mechanical Eng, Data Analytics, MBA"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] dark:border-[#2D3A32] bg-[#FAF9F6] dark:bg-[#141A16] text-[#252A27] dark:text-[#F1F3F1] text-sm focus:outline-none focus:ring-2 focus:ring-[#276749]"
            />
            {errors.desiredCourse && (
              <p className="text-xs text-red-600 mt-1">
                {errors.desiredCourse}
              </p>
            )}
          </div>

          {/* Desired Degree */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Desired Degree
            </label>

            <select
              required
              value={formData.desiredDegree}
              onChange={(e) => handleChange("desiredDegree", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] dark:border-[#2D3A32] bg-[#FAF9F6] dark:bg-[#141A16] text-[#252A27] dark:text-[#F1F3F1] text-sm"
            >
              <option value="">Select your desired degree</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
              <option value="Diploma">Diploma</option>
            </select>

            {errors.desiredDegree && (
              <p className="text-xs text-red-600 mt-1">
                {errors.desiredDegree}
              </p>
            )}
          </div>

          {/* Annual Budget in INR */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-semibold text-[#252A27] dark:text-[#F1F3F1]">
                Annual Budget (Tuition + Living)
              </label>
              <span className="text-sm font-bold text-[#276749] dark:text-[#84CCA0]">
                {formatLakhs(formData.annualBudgetINR)} / year
              </span>
            </div>
            <input
              type="range"
              min={600000}
              max={4500000}
              step={100000}
              value={formData.annualBudgetINR}
              onChange={(e) =>
                handleChange("annualBudgetINR", Number(e.target.value))
              }
              className="w-full accent-[#276749]"
            />
            <div className="flex justify-between text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
              <span>₹6 Lakhs (Low)</span>
              <span>₹15 Lakhs (Moderate)</span>
              <span>₹25 Lakhs (Higher)</span>
              <span>₹45 Lakhs (Top Tier)</span>
            </div>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1.5">
              Germany public universities cost ₹11 - ₹14 Lakhs/yr (living only).
              UK/Canada cost ₹20 - ₹30 Lakhs/yr.
            </p>
          </div>

          {/* English Test Status */}
          <div>
            <label className="block text-sm font-semibold text-[#252A27] dark:text-[#F1F3F1] mb-1">
              English Test Status
            </label>
            <select
              value={formData.englishTest}
              onChange={(e) => handleChange("englishTest", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] dark:border-[#2D3A32] bg-[#FAF9F6] dark:bg-[#141A16] text-[#252A27] dark:text-[#F1F3F1] text-sm focus:outline-none focus:ring-2 focus:ring-[#276749]"
            >
              <option value="IELTS (6.5 - 7.5)">
                IELTS Taken (6.5 - 7.5 Band)
              </option>
              <option value="IELTS (8.0+)">
                IELTS Taken (8.0+ Band - High Score)
              </option>
              <option value="TOEFL iBT (90+)">TOEFL iBT (90+ Score)</option>
              <option value="PTE Academic (60+)">
                PTE Academic (60+ Score)
              </option>
              <option value="Planning to take test">
                Planning to take IELTS / TOEFL soon
              </option>
              <option value="Medium of Instruction (MOI) only">
                Seeking English MOI waiver
              </option>
            </select>
          </div>

          {/* Career Goal */}
          <div>
            <label className="block text-sm font-semibold text-[#252A27] dark:text-[#F1F3F1] mb-1">
              Career Goal & Work Preference
            </label>
            <input
              type="text"
              value={formData.careerGoal}
              onChange={(e) => handleChange("careerGoal", e.target.value)}
              placeholder="e.g. Work as a Software Engineer, Return to India, or Settle abroad"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] dark:border-[#2D3A32] bg-[#FAF9F6] dark:bg-[#141A16] text-[#252A27] dark:text-[#F1F3F1] text-sm focus:outline-none focus:ring-2 focus:ring-[#276749]"
            />
            {errors.careerGoal && (
              <p className="text-xs text-red-600 mt-1">{errors.careerGoal}</p>
            )}
          </div>

          {/* Target Intake */}
          <div>
            <label className="block text-sm font-semibold text-[#252A27] dark:text-[#F1F3F1] mb-1">
              Target Admission Intake
            </label>
            <select
              value={formData.targetIntake}
              onChange={(e) => handleChange("targetIntake", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] dark:border-[#2D3A32] bg-[#FAF9F6] dark:bg-[#141A16] text-[#252A27] dark:text-[#F1F3F1] text-sm focus:outline-none focus:ring-2 focus:ring-[#276749]"
            >
              <option value="Fall 2026">
                Fall 2026 (September / October - Main Intake)
              </option>
              <option value="Spring 2027">
                Spring 2027 (January / March - Secondary Intake)
              </option>
              <option value="Fall 2027">Fall 2027 (Next Year)</option>
            </select>
          </div>

          {/* Single "Get My Recommendations" Button */}
          <div className="pt-4 border-t border-[#E5E7EB] dark:border-[#2D3A32]">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-lg bg-[#276749] hover:bg-[#1F523A] text-white font-bold text-base transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Get My Recommendations</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
