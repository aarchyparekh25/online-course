const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema(
  {
    tid: {
      type: Number,
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
      default: "/default-image.webp", // Optional default image
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Testimonial", TestimonialSchema);
