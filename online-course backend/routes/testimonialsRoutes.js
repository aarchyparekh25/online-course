const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonialsController");

// Get all testimonials
router.get("/gettest", testimonialController.getTestimonials);

// Add a new testimonial
router.post("/addtest", testimonialController.addTestimonial);

// Edit a testimonial
router.put("/puttest/:tid", testimonialController.editTestimonial);

// Delete a testimonial
router.delete("/deletetest/:tid", testimonialController.deleteTestimonial);

module.exports = router;
