import OpenAI from "openai";

export const generateStudyRecommendations = async (profile) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from Backend/.env");
  }

  const ai = new OpenAI({
    apiKey,
    baseURL: "https://api.groq.com/openai/v1",
  });

  const prompt = `
You are a careful study-abroad advisor for students from India.

Student profile:
${JSON.stringify(profile)}

Recommend 5 to 8 suitable countries worldwide, ranked from best fit.
Choose countries dynamically based on this student's profile. Do not use a fixed list.
Consider budget, degree, academic marks, preferred course, language and career goals.

Return valid JSON only with this structure:
{
  "suggestedCountries": [
    {
      "country": "Country name",
      "flag": "Country flag emoji",
      "reason": "Specific reason this country fits the student",
      "matchScore": 85,
      "estimatedAnnualCostINR": 1800000,
      "avgAnnualTuitionINR": 1000000,
      "avgAnnualLivingINR": 800000,
      "tuitionModel": "Moderate",
      "postStudyWorkVisa": "Describe the relevant graduate work route; otherwise Needs verification",
      "suggestedIntakes": ["Month and year or Needs verification"],
      "scholarshipOptions": ["Relevant scholarship or Needs verification"],
      "visaRequirements": {
        "proofOfFunds": "Requirement or Needs verification"
      },
      "entryRequirements": {
        "minCGPA": "Requirement or Needs verification",
        "ieltsCutoff": "Requirement or Needs verification"
      },
      "topUniversities": [
        {
          "name": "University name",
          "city": "City",
          "globalRank": "Needs verification",
          "popularFor": ["Relevant program"],
          "avgTuitionINR": "Estimated annual tuition or Needs verification",
          "websiteUrl": "Official URL only if known confidently"
        }
      ]
    }
  ],
  "degreeOptions": [
    {
      "degree": "Degree name",
      "reason": "Why it fits"
    }
  ],
  "scholarships": [
    {
      "name": "Scholarship name",
      "provider": "Provider",
      "country": "Country",
      "fundingType": "Fully Funded, Partial Funding or Needs verification",
      "scholarshipType": "Merit-based, Need-based or Needs verification",
      "awardAmount": "Amount or Needs verification",
      "awardDetails": "Coverage or Needs verification",
      "eligibility": ["Requirement or Needs verification"],
      "deadline": "Verified deadline or Needs verification",
      "officialUrl": "",
      "isVerified": false
    }
  ],
  "recommendedNextSteps": ["Next action"]
}

Rules:
- Return 5 to 8 countries when enough suitable options exist.
- Do not recommend unsuitable countries merely to reach the target number.
- Costs are annual estimates in INR, represented as numbers without currency symbols.
- Total annual cost should equal tuition plus living costs when both are known.
- Use tuitionModel exactly as Free / Nominal, Moderate, or High.
- matchScore must be an integer from 0 to 100, representing an estimate, not an admission probability.
- Return 1 to 3 relevant universities per country, only when reasonably confident they exist and offer relevant study options.
- Never invent university names, official URLs, visa rules, scholarship deadlines or eligibility requirements.
- Use "Needs verification" for facts you cannot establish confidently.
- Keep text concise and return JSON only, without Markdown.
`;

  const response = await ai.chat.completions.create({
    model: process.env.GEMINI_MODEL || "openai/gpt-oss-120b",
    messages: [
      {
        role: "system",
        content:
          "Return only valid JSON. Be concise, profile-specific, and honest about uncertain facts.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.2,
    max_tokens: 3500,
    response_format: { type: "json_object" },
  });

  const content = response.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Groq returned an empty response");
  }

  let data;

  try {
    data = JSON.parse(content);
  } catch {
    throw new Error("Groq returned invalid JSON");
  }

  if (
    !data ||
    !Array.isArray(data.suggestedCountries) ||
    data.suggestedCountries.length === 0
  ) {
    throw new Error("Groq returned no valid country recommendations");
  }

  return data;
};
