const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");

router.get("/blogs/all", dataController.getAllBlogs);
router.use("/products", dataController.getProductRoutes);

module.exports = router;
