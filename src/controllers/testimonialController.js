import Testimonial from "../models/testimonialModel.js";
import cloudinary from "../config/cloudinary.js";

// Helper to extract public_id from Cloudinary URL
const getPublicId = (url) => {
  const parts = url.split("/");
  const fileWithExt = parts.pop();             // myimage.jpg
  const folder = parts.pop();                  // folder
  const publicId = `${folder}/${fileWithExt.split(".")[0]}`;
  return publicId;
};

// CREATE
export const addTestimonial = async (req, res) => {
  try {
    const { name, role, rating, feedback } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    // Upload to Cloudinary
    const uploaded = await cloudinary.uploader.upload(req.file.path, {
      folder: "testimonials",
    });

    const testimonial = await Testimonial.create({
      name,
      role,
      rating,
      feedback,
      image: uploaded.secure_url,     // Cloudinary URL
    });

    res.status(201).json({
      success: true,
      message: "Testimonial added",
      data: testimonial,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// READ ALL
export const getTestimonials = async (req, res) => {
  try {
    const data = await Testimonial.find().sort({ _id: -1 });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
export const updateTestimonial = async (req, res) => {
  try {
    const { name, role, rating, feedback } = req.body;

    let testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial)
      return res.status(404).json({ success: false, message: "Not found" });

    // If new image uploaded → delete old Cloudinary image
    if (req.file) {
      const publicId = getPublicId(testimonial.image);
      await cloudinary.uploader.destroy(publicId);     // delete old cloudinary image

      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        folder: "testimonials",
      });

      testimonial.image = uploaded.secure_url;
    }

    testimonial.name = name || testimonial.name;
    testimonial.role = role || testimonial.role;
    testimonial.rating = rating || testimonial.rating;
    testimonial.feedback = feedback || testimonial.feedback;

    await testimonial.save();

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial)
      return res.status(404).json({ success: false, message: "Not found" });

    const publicId = getPublicId(testimonial.image);
    await cloudinary.uploader.destroy(publicId); // delete cloudinary image

    await testimonial.deleteOne();

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
