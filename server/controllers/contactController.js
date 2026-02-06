const Contact = require("../models/ContactForm");

const isAdmin = (user) => user.role === "admin";


// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, enquiryType, city, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone,
      enquiryType,
      city,
      message,
    });

    res.status(201).json({
      success: true,
      data: contact,
      message: "Contact form submitted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all contact forms
// @route   GET /api/contact
// @access  Admin or Authenticated (optional)
exports.getAllContactForms = async (req, res) => {
  if (!isAdmin(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });

  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
