const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema(
  {
    tid: {
      type: String,
      required: true,
      unique: true, // Ensure tid is unique
      index: true,  // Make tid indexed for better search performance
    },
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true, // Ensure image URL is always provided
      default: "/default-image.webp", // Optional default image
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Testimonial", TestimonialSchema);
