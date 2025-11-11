// import Event from "../models/EventSchema.js";
// import cloudinary from "../config/cloudinary.js";
// import fs from "fs";
// import mongoose from "mongoose";

// // Helper: upload file to Cloudinary
// const uploadToCloudinary = async (filePath, folder = "event_images") => {
//   const result = await cloudinary.uploader.upload(filePath, { folder });
//   fs.unlinkSync(filePath); // remove file from local uploads/
//   return result.secure_url;
// };

// // Validate MongoDB ID
// const isValidObjectId = (id) => {
//   return mongoose.Types.ObjectId.isValid(id);
// };

// // Create Event
// export const createEvent = async (req, res) => {
//   try {
//     const { heading, subHeading, date, title, description, eventInfo } = req.body;

//     if (!heading || !subHeading || !date) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required fields (heading, subHeading, date).",
//       });
//     }

//     // Handle thumbnail
//     let imageUrl = null;
//     if (req.files?.img && req.files.img[0]) {
//       imageUrl = await uploadToCloudinary(req.files.img[0].path);
//     } else if (req.body.img) {
//       imageUrl = req.body.img;
//     }

//     // Handle gallery images
//     let galleryUrls = [];
//     if (req.files?.imageScroll) {
//       for (const file of req.files.imageScroll) {
//         const url = await uploadToCloudinary(file.path);
//         galleryUrls.push(url);
//       }
//     } else if (req.body.imageScroll) {
//       galleryUrls = Array.isArray(req.body.imageScroll)
//         ? req.body.imageScroll
//         : [req.body.imageScroll];
//     }

//     // Handle eventInfo
//     let parsedEventInfo = [];
//     if (eventInfo) {
//       try {
//         parsedEventInfo = typeof eventInfo === "string" 
//           ? JSON.parse(eventInfo) 
//           : eventInfo;
//       } catch (err) {
//         return res.status(400).json({ 
//           success: false, 
//           message: "Invalid eventInfo format." 
//         });
//       }
//     }

//     const newEvent = new Event({
//       heading,
//       subHeading,
//       img: imageUrl,
//       date,
//       title,
//       description,
//       imageScroll: galleryUrls,
//       eventInfo: parsedEventInfo,
//     });

//     const savedEvent = await newEvent.save();

//     res.status(201).json(savedEvent);
//   } catch (error) {
//     console.error("Error creating event:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to create event.",
//       error: error.message,
//     });
//   }
// };

// // Get All Events
// export const getAllEvents = async (req, res) => {
//   try {
//     const events = await Event.find().sort({ date: -1 });
//     res.status(200).json(events);
//   } catch (error) {
//     console.error("Error fetching events:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch events.",
//       error: error.message,
//     });
//   }
// };

// // Get Event By ID
// export const getEventById = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     // Validate ID format
//     if (!isValidObjectId(id)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid event ID format",
//         receivedId: id
//       });
//     }

//     const event = await Event.findById(id);
//     if (!event) {
//       return res.status(404).json({
//         success: false,
//         message: "Event not found"
//       });
//     }

//     res.status(200).json(event);
//   } catch (error) {
//     console.error("Error fetching event:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch event.",
//       error: error.message,
//     });
//   }
// };

// // Update Event
// export const updateEvent = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     // Validate ID format
//     if (!isValidObjectId(id)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid event ID format"
//       });
//     }

//     const existingEvent = await Event.findById(id);
//     if (!existingEvent) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Event not found." 
//       });
//     }

//     const { heading, subHeading, date, title, description, eventInfo } = req.body;

//     // Handle thumbnail update
//     let updatedImg = existingEvent.img;
//     if (req.files?.img && req.files.img[0]) {
//       updatedImg = await uploadToCloudinary(req.files.img[0].path);
//     } else if (req.body.img) {
//       updatedImg = req.body.img;
//     }

//     // Handle gallery images update
//     let updatedGallery = existingEvent.imageScroll || [];
//     if (req.files?.imageScroll) {
//       updatedGallery = [];
//       for (const file of req.files.imageScroll) {
//         const url = await uploadToCloudinary(file.path);
//         updatedGallery.push(url);
//       }
//     } else if (req.body.imageScroll) {
//       updatedGallery = Array.isArray(req.body.imageScroll)
//         ? req.body.imageScroll
//         : [req.body.imageScroll];
//     }

//     // Handle eventInfo update
//     let parsedEventInfo = existingEvent.eventInfo;
//     if (eventInfo) {
//       try {
//         parsedEventInfo = typeof eventInfo === "string" 
//           ? JSON.parse(eventInfo) 
//           : eventInfo;
//       } catch (err) {
//         return res.status(400).json({ 
//           success: false, 
//           message: "Invalid eventInfo format." 
//         });
//       }
//     }

//     const updatedEvent = await Event.findByIdAndUpdate(
//       id,
//       {
//         heading,
//         subHeading,
//         img: updatedImg,
//         date,
//         title,
//         description,
//         imageScroll: updatedGallery,
//         eventInfo: parsedEventInfo,
//       },
//       { new: true, runValidators: true }
//     );

//     res.status(200).json(updatedEvent);
//   } catch (error) {
//     console.error("Error updating event:", error.message);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to update event.",
//       error: error.message
//     });
//   }
// };

// // Delete Event
// export const deleteEvent = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     // Validate ID format
//     if (!isValidObjectId(id)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid event ID format"
//       });
//     }

//     const event = await Event.findById(id);
//     if (!event) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Event not found." 
//       });
//     }

//     // Delete image from Cloudinary
//     if (event.img) {
//       const publicId = event.img.split("/").pop().split(".")[0];
//       await cloudinary.uploader.destroy(`event_images/${publicId}`);
//     }

//     await Event.findByIdAndDelete(id);
//     res.status(200).json({ 
//       success: true, 
//       message: "Event deleted successfully." 
//     });
//   } catch (error) {
//     console.error("Error deleting event:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Failed to delete event.",
//       error: error.message
//     });
//   }
// };




import Event from "../models/EventSchema.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import mongoose from "mongoose";

// 📤 Helper: Upload file to Cloudinary
const uploadToCloudinary = async (filePath, folder = "event_images") => {
  const result = await cloudinary.uploader.upload(filePath, { folder });
  fs.unlinkSync(filePath); // remove file from local uploads
  return result.secure_url;
};

// ✅ Validate MongoDB ID
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// 🟢 Create Event
export const createEvent = async (req, res) => {
  try {
    const { heading, subHeading, date, title, description, eventInfo, schedule } = req.body;

    if (!heading || !subHeading || !date) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (heading, subHeading, date).",
      });
    }

    // 🖼️ Thumbnail upload
    let imageUrl = null;
    if (req.files?.img && req.files.img[0]) {
      imageUrl = await uploadToCloudinary(req.files.img[0].path);
    } else if (req.body.img) {
      imageUrl = req.body.img;
    }

    // 📸 Gallery images upload
    let galleryUrls = [];
    if (req.files?.imageScroll) {
      for (const file of req.files.imageScroll) {
        const url = await uploadToCloudinary(file.path);
        galleryUrls.push(url);
      }
    } else if (req.body.imageScroll) {
      galleryUrls = Array.isArray(req.body.imageScroll)
        ? req.body.imageScroll
        : [req.body.imageScroll];
    }

    // 🧩 Parse eventInfo (JSON string or object)
    let parsedEventInfo = {};
    if (eventInfo) {
      try {
        parsedEventInfo = typeof eventInfo === "string" ? JSON.parse(eventInfo) : eventInfo;
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid eventInfo format.",
        });
      }
    }

    // ⏰ Parse schedule (JSON string or object)
    let parsedSchedule = [];
    if (schedule) {
      try {
        parsedSchedule = typeof schedule === "string" ? JSON.parse(schedule) : schedule;
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid schedule format.",
        });
      }
    }

    // ✅ Create new event document
    const newEvent = new Event({
      heading,
      subHeading,
      img: imageUrl,
      date,
      title,
      description,
      imageScroll: galleryUrls,
      eventInfo: parsedEventInfo,
      schedule: parsedSchedule,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create event.",
      error: error.message,
    });
  }
};

// 🔵 Get All Events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch events.",
      error: error.message,
    });
  }
};

// 🟣 Get Event By ID
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
      });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch event.",
      error: error.message,
    });
  }
};

// 🟠 Update Event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, subHeading, date, title, description, eventInfo, schedule } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
      });
    }

    const existingEvent = await Event.findById(id);
    if (!existingEvent) {
      return res.status(404).json({ success: false, message: "Event not found." });
    }

    // 🖼️ Thumbnail update
    let updatedImg = existingEvent.img;
    if (req.files?.img && req.files.img[0]) {
      updatedImg = await uploadToCloudinary(req.files.img[0].path);
    } else if (req.body.img) {
      updatedImg = req.body.img;
    }

    // 📸 Gallery images update
    let updatedGallery = existingEvent.imageScroll || [];
    if (req.files?.imageScroll) {
      updatedGallery = [];
      for (const file of req.files.imageScroll) {
        const url = await uploadToCloudinary(file.path);
        updatedGallery.push(url);
      }
    } else if (req.body.imageScroll) {
      updatedGallery = Array.isArray(req.body.imageScroll)
        ? req.body.imageScroll
        : [req.body.imageScroll];
    }

    // 🧩 Parse eventInfo
    let parsedEventInfo = existingEvent.eventInfo;
    if (eventInfo) {
      try {
        parsedEventInfo = typeof eventInfo === "string" ? JSON.parse(eventInfo) : eventInfo;
      } catch {
        return res.status(400).json({ success: false, message: "Invalid eventInfo format." });
      }
    }

    // ⏰ Parse schedule
    let parsedSchedule = existingEvent.schedule || [];
    if (schedule) {
      try {
        parsedSchedule = typeof schedule === "string" ? JSON.parse(schedule) : schedule;
      } catch {
        return res.status(400).json({ success: false, message: "Invalid schedule format." });
      }
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        heading,
        subHeading,
        img: updatedImg,
        date,
        title,
        description,
        imageScroll: updatedGallery,
        eventInfo: parsedEventInfo,
        schedule: parsedSchedule,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update event.",
      error: error.message,
    });
  }
};

// 🔴 Delete Event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
      });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    // 🧹 Delete image from Cloudinary
    if (event.img) {
      const publicId = event.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`event_images/${publicId}`);
    }

    await Event.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Event deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete event.",
      error: error.message,
    });
  }
};
