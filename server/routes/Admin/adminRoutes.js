const express = require("express");
const router = express.Router();
const blogRoutes = require("./Sub-Routes/blogRoute");
const productRoutes = require("./Sub-Routes/productRoute");
const productCategoryRoutes = require("./Sub-Routes/productCategoryRoute");
const mapRoutes = require("./Sub-Routes/mapRoute");
const supportRoute = require("./Sub-Routes/supportLogoRoute");
const galleryRoutes = require("./Sub-Routes/galleryRoute");
const contactRoute = require("./Sub-Routes/contactRoute");
const { protect } = require("../../middlewares/authMiddleware");

router.use("/map-charger", protect, mapRoutes);
router.use("/gallery", protect, galleryRoutes);
router.use("/support-logo", protect, supportRoute);
router.use("/blogs", protect, blogRoutes);
router.use("/contact", protect, contactRoute);

router.use("/products", protect, productRoutes);
router.use("/products/categories", protect, productCategoryRoutes);

module.exports = router;
