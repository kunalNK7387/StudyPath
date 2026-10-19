import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access public
 */
router.post("/register", registerUser);

/**
 * @route POST /api/auth/login
 * @description Login user with email and password
 * @access public
 */
router.post("/login", loginUser);

/**
 * @router POST /api/auth/logout
 * @description clear token from the user cookie and add the token in blacklist
 * @access public
 */
router.post("/logout", logoutUser);

export default router;
