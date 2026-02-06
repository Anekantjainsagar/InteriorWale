const Subscribe = require("../models/Subscribe");

const isAdmin = (user) => user.role === "admin";


// @desc    Create a new subscription
// @route   POST /api/subscribe
exports.submitSubscription = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "Please provide a valid email" });
    }

    const existing = await Subscribe.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    const subscription = new Subscribe({ email });
    await subscription.save();

    res.status(201).json({ message: "Subscription successful", subscription });
  } catch (error) {
    console.error("Submit subscription error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all subscriptions
// @route   GET /api/subscribe
exports.getAllSubscriptions = async (req, res) => {
  if (!isAdmin(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });

  try {
    const subscriptions = await Subscribe.find().sort({ createdAt: -1 });
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error("Get subscriptions error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
