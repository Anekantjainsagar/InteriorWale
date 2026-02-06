const express = require("express");
const router = express.Router();
const adminBlogController = require("../../../controllers/Admin/blogAdmin");

router.post("/add", adminBlogController.addBlog);
router.get("/all", adminBlogController.getAllBlogs);
router.put("/update/:id", adminBlogController.updateBlog);
router.delete("/delete/:id", adminBlogController.deleteBlog);

module.exports = router;
