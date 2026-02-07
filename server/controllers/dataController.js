const blogService = require("../services/Admin/blogService");
const productService = require("../services/Admin/productService");

const getProductRoutes = async (req, res, next) => {
  try {
    const members = await productService.getAllProducts();
    res.status(200).json({ success: true, data: members });
  } catch (err) {
    next(err);
  }
};

const getAllBlogs = async (req, res, next) => {
  try {
    const members = await blogService.getAllBlogs();
    res.status(200).json({ success: true, data: members.reverse() });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllBlogs,
  getProductRoutes,
};
