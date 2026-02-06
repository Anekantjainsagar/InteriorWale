const ProductCategory = require("../../models/ProductCategory");

const getAllProductsCategory = async () => {
  return await ProductCategory.find();
};

const addProductCategory = async (data) => {
  return await ProductCategory.create(data);
};

const updateProductCategory = async (id, data) => {
  const updated = await ProductCategory.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!updated) throw new Error("Product Category not found or update failed");
  return updated;
};

const deleteProductCategory = async (id) => {
  const deleted = await ProductCategory.findByIdAndDelete(id);
  if (!deleted) throw new Error("Product Category not found or delete failed");
  return deleted;
};

module.exports = { getAllProductsCategory, addProductCategory, updateProductCategory, deleteProductCategory };
