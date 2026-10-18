import { COUNTRIES_DATA } from "../data/countriesData.js";

export async function generateRecommendations(profile) {
  try {
    const res = await fetch("/api/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    if (res.ok) {
      const data = await res.json();
      if (
        data.recommendations &&
        Array.isArray(data.recommendations) &&
        data.recommendations.length > 0
      ) {
        return data.recommendations.map((item) => {
          const matchCountry = COUNTRIES_DATA.find(
            (c) => c.id.toLowerCase() === item.countryId.toLowerCase(),
          );
          return {
            ...item,
            flag: matchCountry ? matchCountry.flag : "🌐",
            pswDuration: matchCountry
              ? matchCountry.postStudyWorkVisa
              : "1 - 2 Years",
          };
        });
      }
    }
  } catch (err) {
    console.warn(
      "Backend recommendation service fetch failed, using local scoring engine:",
      err,
    );
  }

  // Local Rule & Scoring Engine
  return calculateLocalRecommendations(profile);
}

export function calculateLocalRecommendations(profile) {
  const annualBudget = profile.annualBudgetINR || 2000000;
  const isStem =
    (profile.fieldOfStudy &&
      (profile.fieldOfStudy.toLowerCase().includes("comp") ||
        profile.fieldOfStudy.toLowerCase().includes("eng") ||
        profile.fieldOfStudy.toLowerCase().includes("data") ||
        profile.fieldOfStudy.toLowerCase().includes("tech"))) ||
    (profile.desiredCourse &&
      profile.desiredCourse.toLowerCase().includes("ai"));

  const prefersShortCourse =
    profile.preferredDuration && profile.preferredDuration.includes("1 Year");
  const needsFullFunding = Boolean(profile.needsFullScholarship);

  // Compute scores for each country
  const countryScores = [];

  // Germany
  let germanyScore = 88;
  const germanyReasons = [
    "Zero or near-zero tuition at world-renowned public universities matches your economic profile.",
    "Generous 18-month post-study work visa with rapid path to EU Blue Card for Indian graduates.",
  ];
  if (annualBudget <= 1800000) {
    germanyScore += 8;
    germanyReasons.push(
      "Perfect match for annual budget under ₹18 Lakhs with only living expenses required.",
    );
  }
  if (isStem) {
    germanyScore += 5;
    germanyReasons.push(
      "Thriving automotive, automation, and AI research ecosystems in Munich, Aachen, and Berlin.",
    );
  }
  countryScores.push({
    countryId: "germany",
    score: Math.min(germanyScore, 97),
    reasons: germanyReasons,
  });

  // Canada
  let canadaScore = 84;
  const canadaReasons = [
    "Up to 3-year Post-Graduation Work Permit (PGWP) offering ample time to acquire Canadian work experience.",
    "World-class universities with strong Co-op internship semesters offering direct industry exposure.",
  ];
  if (annualBudget >= 2200000) {
    canadaScore += 6;
  }
  if (
    profile.workExperienceYears &&
    profile.workExperienceYears !== "0 (Fresher)"
  ) {
    canadaReasons.push(
      "Your prior work experience strengthens your profile for Canadian express entry points.",
    );
  }
  countryScores.push({
    countryId: "canada",
    score: Math.min(canadaScore, 95),
    reasons: canadaReasons,
  });

  // United Kingdom
  let ukScore = 85;
  const ukReasons = [
    "Fast-track 1-Year Master’s degree saves a whole year of living expenses and accelerates career ROI.",
    "No GRE required, and 3-year Indian Bachelor’s degrees (BA/BSc/BCom) are directly accepted.",
  ];
  if (prefersShortCourse) {
    ukScore += 8;
    ukReasons.push(
      "Perfect alignment with your preferred 1-year study duration.",
    );
  }
  if (annualBudget >= 2500000) {
    ukScore += 5;
  }
  countryScores.push({
    countryId: "uk",
    score: Math.min(ukScore, 96),
    reasons: ukReasons,
  });

  // Ireland
  let irelandScore = 83;
  const irelandReasons = [
    "European tech capital with EMEA headquarters for Google, Meta, Pfizer, and Stripe hiring graduates.",
    "English-speaking country with a streamlined 2-year Third Level Graduate Scheme work permit.",
  ];
  if (isStem) {
    irelandScore += 6;
    irelandReasons.push(
      "High concentration of cloud, software, and pharmaceutical graduate vacancies in Dublin.",
    );
  }
  countryScores.push({
    countryId: "ireland",
    score: Math.min(irelandScore, 93),
    reasons: irelandReasons,
  });

  // Australia
  let ausScore = 82;
  const ausReasons = [
    "High student minimum wage (A$24.10/hr) allows offsetting daily expenses with part-time work.",
    "Globally recognized Group of Eight universities with 2-4 year post-study work stream.",
  ];
  if (annualBudget >= 2800000) {
    ausScore += 6;
  }
  countryScores.push({
    countryId: "australia",
    score: Math.min(ausScore, 92),
    reasons: ausReasons,
  });

  // USA
  let usaScore = 80;
  const usaReasons = [
    "3-Year STEM OPT extension allows working in the US tech sector for 36 months on F-1 status.",
    "Highest concentration of globally top-10 ranked universities and research budgets.",
  ];
  if (annualBudget >= 3500000) {
    usaScore += 12;
    usaReasons.push(
      "Your budget comfortably supports tier-1 US university tuition and living expenses.",
    );
  } else {
    usaScore -= 10;
    usaReasons.push(
      "Tuition is premium; securing a Graduate Teaching/Research Assistantship (TA/RA) will be critical.",
    );
  }
  countryScores.push({
    countryId: "usa",
    score: Math.max(Math.min(usaScore, 94), 68),
    reasons: usaReasons,
  });

  // Italy
  let italyScore = 81;
  const italyReasons = [
    "Exceptional value: DSU regional scholarships offer 100% tuition waiver + free dorm + annual cash stipend.",
    "Prestigious technical universities (Politecnico di Milano, Politecnico di Torino) renowned in Europe.",
  ];
  if (annualBudget < 1500000 || needsFullFunding) {
    italyScore += 12;
    italyReasons.push(
      "Best viable European option for full-ride regional aid based on Indian family income.",
    );
  }
  countryScores.push({
    countryId: "italy",
    score: Math.min(italyScore, 95),
    reasons: italyReasons,
  });

  // Sort descending by score
  countryScores.sort((a, b) => b.score - a.score);

  // Pick top 4
  const top4 = countryScores.slice(0, 4);

  const categories = [
    "Best Overall Match",
    "Most Affordable Viable Option",
    "Best Scholarship Opportunities",
    "Alternative Country Option",
  ];

  return top4.map((entry, idx) => {
    const cData =
      COUNTRIES_DATA.find((c) => c.id === entry.countryId) || COUNTRIES_DATA[0];

    // Decide category tag logically
    let tag = categories[idx] || "Alternative Country Option";
    if (idx === 0) tag = "Best Overall Match";
    else if (cData.id === "germany" || cData.id === "italy")
      tag = "Most Affordable Viable Option";
    else if (cData.id === "uk" && idx === 1)
      tag = "Best Scholarship Opportunities";

    return {
      countryId: cData.id,
      countryName: cData.name,
      flag: cData.flag,
      matchScore: entry.score,
      categoryTag: tag,
      whySuits: entry.reasons,
      suitableUniversities: cData.topUniversities
        .map((u) => u.name)
        .slice(0, 3),
      estimatedAnnualINR: cData.totalAnnualCostINR,
      estimatedTotalCourseINR:
        cData.id === "uk"
          ? "₹30 - ₹45 Lakhs (1-Year Master's complete)"
          : cData.id === "germany"
            ? "₹22 - ₹28 Lakhs (2-Year Master's complete)"
            : cData.id === "italy"
              ? "₹16 - ₹22 Lakhs (2-Year Master's complete)"
              : "₹50 - ₹70 Lakhs (2-Year Master's complete)",
      keyScholarships: cData.keyScholarships,
      languageAndAdmissionReqs: `IELTS ${cData.entryRequirements.ieltsCutoff}. ${
        cData.visaRequirements.apsCertificateRequired
          ? "APS Certificate mandatory for Indian applicants."
          : ""
      } ${cData.entryRequirements.greRequired}`,
      nextIntake: cData.intakes.primary,
      financialViabilityNote:
        annualBudget < 1500000 &&
        (cData.id === "usa" || cData.id === "australia")
          ? "Exceeds declared annual budget; education loan or assistantship needed."
          : "Within or close to your projected financial planning range.",
      pswDuration: cData.postStudyWorkVisa,
    };
  });
}
