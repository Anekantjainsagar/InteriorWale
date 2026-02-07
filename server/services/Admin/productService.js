const Product = require("../../models/Product");

const getAllProducts = async () => {
  return await Product.find();
};

const addProduct = async (data) => {
  return await Product.create(data);
};

const updateProduct = async (id, data) => {
  const updated = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!updated) throw new Error("Product not found or update failed");
  return updated;
};

const deleteProduct = async (id) => {
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) throw new Error("Product not found or delete failed");
  return deleted;
};

module.exports = { getAllProducts, addProduct, updateProduct, deleteProduct };
