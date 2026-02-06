const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");

router.get("/gallery", dataController.getAllPhotos); // Fetch all
router.get("/map-charger", dataController.getAllMaps); // Fetch all
router.get("/blogs/all", dataController.getAllBlogs); // Fetch all
router.use("/support-logo", dataController.getSupport);
router.use("/contact", dataController.getContacts);

router.use("/products", dataController.getProductRoutes);
router.use("/products/categories", dataController.getProductCategoryRoutes);

module.exports = router;
