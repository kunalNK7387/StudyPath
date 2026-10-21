const aiMiddleware = (req, res, next) => {
  const profile = req.body;

  if (
    !profile ||
    typeof profile !== "object" ||
    Array.isArray(profile) ||
    Object.keys(profile).length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid student profile.",
    });
  }

  if (!profile.desiredCourse || !profile.desiredDegree) {
    return res.status(400).json({
      success: false,
      message: "Desired course and degree are required.",
    });
  }

  if (
    profile.annualBudgetINR !== undefined &&
    (typeof profile.annualBudgetINR !== "number" ||
      !Number.isFinite(profile.annualBudgetINR) ||
      profile.annualBudgetINR < 0)
  ) {
    return res.status(400).json({
      success: false,
      message: "Annual budget must be a valid, non-negative number.",
    });
  }

  next();
};

export default aiMiddleware;
