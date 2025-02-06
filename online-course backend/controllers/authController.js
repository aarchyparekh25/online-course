// authController.js (Express Backend)
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });

        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error); // Log the error
        res.status(500).json({ message: "Server error" });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({ token }); // Send token in JSON response
    } catch (error) {
        console.error("Login error:", error); // Log the error
        res.status(500).json({ message: "Server error" });
    }
};

exports.logoutUser = async (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
};

// New function to get current user data
exports.getCurrentUser = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");  // Exclude password field

        if (!user) { // Check if the user exists
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("getCurrentUser error:", error);
        res.status(401).json({ message: "Invalid token or not authenticated" });
    }
};
