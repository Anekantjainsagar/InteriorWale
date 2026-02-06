const productCategoryService = require("../../services/Admin/productCategoryService");

const isAdmin = (user) => user.role === "admin";

const getAllProductsCategory = async (req, res, next) => {
  if (!isAdmin(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });
  try {
    const projects = await productCategoryService.getAllProductsCategory();
    res.status(200).json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
};

const addProductCategory = async (req, res, next) => {
  if (!isAdmin(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });
  try {
    const project = await productCategoryService.addProductCategory(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

const updateProductCategory = async (req, res, next) => {
  if (!isAdmin(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });
  try {
    const updated = await productCategoryService.updateProductCategory(req.params.id, req.body);
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

const deleteProductCategory = async (req, res, next) => {
  if (!isAdmin(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });
  try {
    const deleted = await productCategoryService.deleteProductCategory(req.params.id);
    res.status(200).json({ success: true, data: deleted });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllProductsCategory, addProductCategory, updateProductCategory, deleteProductCategory };
