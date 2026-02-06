const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/Admin/productCategoryAdmin");

router.get("/all", controller.getAllProductsCategory);
router.post("/add", controller.addProductCategory);
router.put("/update/:id", controller.updateProductCategory);
router.delete("/delete/:id", controller.deleteProductCategory);

module.exports = router;
