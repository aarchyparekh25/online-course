// server.js (Express Backend)
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const testimonialRoutes = require("./routes/testimonialsRoutes");  // If you have this

dotenv.config();
const app = express();

connectDB();

// CORS Configuration (Crucial for Cookies)
const allowedOrigins = process.env.CLIENT_URL ? [process.env.CLIENT_URL] : ["http://localhost:3000"]; // Array for multiple origins if needed

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true, // Essential for sending/receiving cookies
        methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"], // Include OPTIONS for preflight requests
        allowedHeaders: ["Content-Type", "Authorization"], // Add any custom headers your app uses
    })
);


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/testimonials", testimonialRoutes); // If you have this

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
