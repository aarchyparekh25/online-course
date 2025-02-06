const express = require("express");
const { registerUser, loginUser, logoutUser, getCurrentUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/current-user", getCurrentUser);  // Add this route to fetch the current user

module.exports = router;
