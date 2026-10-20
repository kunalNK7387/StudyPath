import jwt from "jsonwebtoken";
import TokenBlacklist from "../models/blacklist.js";

const authMiddleware = async (req, res, next) => {
  try {
    // Get the JWT from the cookie
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Authentication required. Please log in.",
      });
    }

    // Check whether the token is blacklisted
    const blacklistedToken = await TokenBlacklist.findOne({ token });

    if (blacklistedToken) {
      return res.status(401).json({
        message: "You have logged out. Please log in again.",
      });
    }

    // Verify the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      userId: decoded.userId,
    };

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token. Please log in again.",
    });
  }
};

export default authMiddleware;
