const API_URL = "http://localhost:3000/api";

const formatINR = (value) => {
  if (value === null || value === undefined || value === "") {
    return "Needs verification";
  }

  const number = Number(value);

  return Number.isFinite(number)
    ? `₹${number.toLocaleString("en-IN")}`
    : String(value);
};

const getNumericCost = (value) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number =
    typeof value === "number"
      ? value
      : Number(String(value).replace(/[₹,\s]/g, ""));

  return Number.isFinite(number) && number >= 0 ? number : null;
};

const normalizeCountryId = (name = "") =>
  name
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const generateRecommendations = async (studentProfile) => {
  const response = await fetch(`${API_URL}/ai/recommendations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(studentProfile),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to generate AI recommendations.");
  }

  const countries = result.data?.suggestedCountries;

  if (!Array.isArray(countries) || countries.length === 0) {
    throw new Error("The AI did not return any country recommendations.");
  }

  return countries
    .filter(
      (item) => item && typeof item.country === "string" && item.country.trim(),
    )
    .map((item) => {
      const countryName = item.country.trim();

      const tuition = getNumericCost(item.avgAnnualTuitionINR);
      const living = getNumericCost(item.avgAnnualLivingINR);

      const suppliedTotal = getNumericCost(item.estimatedAnnualCostINR);

      const total =
        suppliedTotal !== null
          ? suppliedTotal
          : tuition !== null && living !== null
            ? tuition + living
            : null;

      const universities = Array.isArray(item.topUniversities)
        ? item.topUniversities
            .filter((uni) => uni && typeof uni.name === "string")
            .map((uni) => ({
              name: uni.name,
              city: uni.city || "Needs verification",
              globalRank: uni.globalRank || "Needs verification",
              popularFor: Array.isArray(uni.popularFor) ? uni.popularFor : [],
              avgTuitionINR: uni.avgTuitionINR ?? "Needs verification",
              websiteUrl:
                typeof uni.websiteUrl === "string" &&
                /^https?:\/\//i.test(uni.websiteUrl)
                  ? uni.websiteUrl
                  : "",
            }))
        : [];

      const countryId = normalizeCountryId(countryName);

      const tuitionModel = ["Free / Nominal", "Moderate", "High"].includes(
        item.tuitionModel,
      )
        ? item.tuitionModel
        : "Needs verification";

      const reasons = Array.isArray(item.reason)
        ? item.reason.filter(Boolean)
        : item.reason
          ? [item.reason]
          : [];

      return {
        // Both aliases are required by different sections of the existing JSX.
        id: countryId,
        countryId,
        name: countryName,
        countryName,

        flag: item.flag || "🌍",
        tagline: item.reason || "AI-generated recommendation",
        reason: item.reason || "Needs verification",
        whySuits: reasons,

        matchScore:
          Number.isFinite(Number(item.matchScore)) &&
          item.matchScore !== null &&
          item.matchScore !== ""
            ? Math.max(0, Math.min(100, Number(item.matchScore)))
            : null,

        avgAnnualTuitionINR: formatINR(tuition),
        avgAnnualLivingINR: formatINR(living),
        estimatedAnnualINR: formatINR(total),

        // Raw numeric amounts for calculations.
        tuitionAmountINR: tuition,
        livingAmountINR: living,
        totalAmountINR: total,

        tuitionModel,
        postStudyWorkVisa: item.postStudyWorkVisa || "Needs verification",

        suggestedIntakes: Array.isArray(item.suggestedIntakes)
          ? item.suggestedIntakes
          : [],

        scholarshipOptions: Array.isArray(item.scholarshipOptions)
          ? item.scholarshipOptions
          : [],

        topUniversities: universities,
        visaRequirements: item.visaRequirements || {},
        entryRequirements: item.entryRequirements || {},
        costBreakdown: {
          tuitionINR: tuition,
          livingINR: living,
          totalINR: total,
        },
        currency: "INR",
        aiGenerated: true,
      };
    });
};
