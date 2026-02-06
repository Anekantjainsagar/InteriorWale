const productService = require("../../services/Admin/productService");

const isAdmin = (user) => user.role === "admin";

const getAllProducts = async (req, res, next) => {
  if (!isAdmin(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });
  try {
    const projects = await productService.getAllProducts();
    res.status(200).json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
};

const addProduct = async (req, res, next) => {
  if (!isAdmin(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });
  try {
    const project = await productService.addProduct(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  if (!isAdmin(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });
  try {
    const updated = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  if (!isAdmin(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });
  try {
    const deleted = await productService.deleteProduct(req.params.id);
    res.status(200).json({ success: true, data: deleted });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllProducts, addProduct, updateProduct, deleteProduct };
