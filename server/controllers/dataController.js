const galleryService = require("../services/Admin/galleryService");
const mapService = require("../services/Admin/mapService");
const blogService = require("../services/Admin/blogService");
const productCategoryRoutes = require("../services/Admin/productCategoryService");
const productService = require("../services/Admin/productService");
const contactService = require("../controllers/Admin/officeController");
const supportLogoService = require("../services/Admin/supportLogoService");

const getSupport = async (req, res, next) => {
  try {
    const members = await supportLogoService.getAllLogos();
    res.status(200).json({ success: true, data: members });
  } catch (err) {
    next(err);
  }
};

const getContacts = async (req, res, next) => {
  try {
    const members = await contactService.getAllOffices();
    res.status(200).json({
      success: true,
      data: members,
      message: "Contacts retrieved successfully",
    });
  } catch (err) {
    console.error("Error in getContacts:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Failed to retrieve contacts",
      error: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};

const getProductRoutes = async (req, res, next) => {
  try {
    const members = await productService.getAllProducts();
    res.status(200).json({ success: true, data: members });
  } catch (err) {
    next(err);
  }
};

const getProductCategoryRoutes = async (req, res, next) => {
  try {
    const members = await productCategoryRoutes.getAllProductsCategory();
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

const getAllMaps = async (req, res, next) => {
  try {
    const members = await mapService.getAllCords();
    res.status(200).json({ success: true, data: members });
  } catch (err) {
    next(err);
  }
};

const getAllPhotos = async (req, res, next) => {
  try {
    const members = await galleryService.getAllPhotos();
    res.status(200).json({ success: true, data: members });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllPhotos,
  getAllMaps,
  getAllBlogs,
  getSupport,
  getContacts,
  getProductRoutes,
  getProductCategoryRoutes,
};
