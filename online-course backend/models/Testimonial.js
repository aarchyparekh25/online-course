const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
  tid: { type: String, required: true, unique: true },
  userId: { type: String, required: true }, // Store the user who created the testimonial
  name: { type: String, required: true },
  message: { type: String, required: true },
  image: { type: String, default: "/default-image.webp" },
}, { timestamps: true });

module.exports = mongoose.model("Testimonial", TestimonialSchema);
