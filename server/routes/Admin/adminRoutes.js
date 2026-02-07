const express = require("express");
const router = express.Router();
const blogRoutes = require("./Sub-Routes/blogRoute");
const productRoutes = require("./Sub-Routes/productRoute");
const { protect } = require("../../middlewares/authMiddleware");

router.use("/blogs", protect, blogRoutes);
router.use("/products", protect, productRoutes);

module.exports = router;
