const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const subscribeController = require("../controllers/subscribeController");
const { protect } = require("../middlewares/authMiddleware");

router
  .route("/contact")
  .post(contactController.submitContactForm) // Create
  .get(protect, contactController.getAllContactForms); // Fetch all

router
  .route("/subscribe")
  .post(subscribeController.submitSubscription) // Create
  .get(protect, subscribeController.getAllSubscriptions); // Fetch all

module.exports = router;
