const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const testimonialRoutes = require("./routes/testimonialsRoutes"); // Import testimonial routes

dotenv.config(); // Load environment variables

// Initialize Express app
const app = express();

// Connect to the database
connectDB();

// Middleware setup
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" })); // Use env variable for frontend URL
app.use(express.json()); // Parse JSON request bodies

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/testimonials", testimonialRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
