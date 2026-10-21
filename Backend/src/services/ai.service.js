import { GoogleGenAI } from "@google/genai";

export const generateStudyRecommendations = async (profile) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from Backend/.env");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
You are an AI study-abroad advisor helping students from India.

Analyze the student profile below and recommend suitable study-abroad options.

Student profile:
${JSON.stringify(profile, null, 2)}

Return valid JSON only, using this structure:
{
  "suggestedCountries": [
    {
      "country": "Country name",
      "reason": "Why it suits the student",
      "estimatedAnnualCostINR": 0,
      "suggestedIntakes": ["Future intake"],
      "scholarshipOptions": ["Scholarship name"]
    }
  ],
  "degreeOptions": [
    {
      "degree": "Degree name",
      "reason": "Why it fits the student"
    }
  ],
  "scholarships": [
    {
      "name": "Scholarship name",
      "provider": "Provider name",
      "country": "Country name",
      "fundingType": "Fully Funded or Partial Funding",
      "scholarshipType": "Merit-based or Need-based",
      "awardAmount": "Amount or coverage",
      "awardDetails": "What may be covered",
      "eligibility": ["Eligibility requirement"],
      "deadline": "Deadline or Needs verification",
      "officialUrl": "",
      "isVerified": false
    }
  ],
  "recommendedNextSteps": ["Next action"]
}

Rules:
-Suggest up to 3 suitable countries based on the student's profile.
- Suggest realistic countries and degrees based on the profile.
- Estimate annual expenses in Indian rupees (INR).
- Prefer future admission intakes based on the current date.
- Never guarantee admission or scholarships.
- Do not invent scholarship deadlines, eligibility rules, or official URLs.
- Use "Needs verification" when information is uncertain.
- Return JSON only, without Markdown code fences.
`;

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-3.8-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      temperature: 0.2,
    },
  });

  if (!response.text) {
    throw new Error("Gemini returned an empty response");
  }

  return JSON.parse(response.text);
};
