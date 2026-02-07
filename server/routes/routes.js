const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const { protect } = require("../middlewares/authMiddleware");

router
  .route("/contact")
  .post(contactController.submitContactForm) // Create
  .get(protect, contactController.getAllContactForms); // Fetch all

module.exports = router;
