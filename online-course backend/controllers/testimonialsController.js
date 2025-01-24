const Testimonial = require("../models/Testimonial");

// Get all testimonials
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add a new testimonial
const addTestimonial = async (req, res) => {
  const { tid, name, message, image } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: "Name and message are required" });
  }

  try {
    // Check if testimonial with this tid already exists
    const existingTestimonial = await Testimonial.findOne({ tid });
    if (existingTestimonial) {
      return res.status(400).json({ error: "Testimonial with this ID already exists" });
    }

    const newTestimonial = new Testimonial({ 
      tid, 
      name, 
      message, 
      image: image || "/default-image.webp" 
    });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(500).json({ error: "Failed to add testimonial" });
  }
};

// Edit a testimonial
const editTestimonial = async (req, res) => {
  const { tid } = req.params;
  const { name, message, image } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: "Name and message are required" });
  }

  try {
    const updatedTestimonial = await Testimonial.findOneAndUpdate(
      { tid },
      { name, message, image: image || "/default-image.webp" },
      { new: true } // Return the updated document
    );
    if (!updatedTestimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    res.json(updatedTestimonial);
  } catch (error) {
    res.status(500).json({ error: "Failed to update testimonial" });
  }
};

// Delete a testimonial
const deleteTestimonial = async (req, res) => {
  const { tid } = req.params;

  try {
    const deletedTestimonial = await Testimonial.findOneAndDelete({ tid });
    if (!deletedTestimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete testimonial" });
  }
};

module.exports = {
  getTestimonials,
  addTestimonial,
  editTestimonial,
  deleteTestimonial,
};