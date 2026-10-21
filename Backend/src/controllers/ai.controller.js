import { generateStudyRecommendations } from "../services/ai.service.js";

export const getStudyRecommendations = async (req, res) => {
  try {
    const studentProfile = req.body;

    if (
      !studentProfile ||
      typeof studentProfile !== "object" ||
      Array.isArray(studentProfile) ||
      Object.keys(studentProfile).length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide your student profile.",
      });
    }

    const recommendations = await generateStudyRecommendations(studentProfile);

    return res.status(200).json({
      success: true,
      message: "Study recommendations generated successfully.",
      data: recommendations,
    });
  } catch (error) {
    console.error("AI recommendation error:", error);

    return res.status(500).json({
      success: false,
      message:
        "Unable to generate recommendations. Please check the backend terminal.",
    });
  }
};
