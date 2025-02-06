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
  let { tid, name, message, image } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: "Name and message are required" });
  }

  // Get userId from authenticated user
  const userId = req.user.id;  // Assuming the token is decoded and user ID is stored in req.user

  try {
    const newTestimonial = new Testimonial({
      tid,
      name,
      message,
      image,
      userId,  // Set the userId
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
  const userId = req.user.id;

  try {
    const testimonial = await Testimonial.findOne({ tid });

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found." });
    }

    if (testimonial.userId !== userId) {
      return res.status(403).json({ message: "You can only edit your own testimonials." });
    }

    await Testimonial.updateOne({ tid }, { ...req.body });
    res.status(200).json({ message: "Testimonial updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const deleteTestimonial = async (req, res) => {
  const { tid } = req.params;
  const userId = req.user.id;

  try {
    const testimonial = await Testimonial.findOne({ tid });

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found." });
    }

    if (testimonial.userId !== userId) {
      return res.status(403).json({ message: "You can only delete your own testimonials." });
    }

    await Testimonial.deleteOne({ tid });
    res.status(200).json({ message: "Testimonial deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { getTestimonials, addTestimonial, editTestimonial, deleteTestimonial };
