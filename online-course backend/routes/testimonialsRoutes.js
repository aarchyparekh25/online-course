const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonialsController");
const authMiddleware = require("../middleware/authmiddleware");

router.get("/gettest", testimonialController.getTestimonials);
router.post("/addtest", authMiddleware, testimonialController.addTestimonial);
router.put("/edit/:tid", authMiddleware, testimonialController.editTestimonial);
router.delete("/delete/:tid", authMiddleware, testimonialController.deleteTestimonial);

module.exports = router;
