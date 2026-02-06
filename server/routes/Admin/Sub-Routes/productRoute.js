const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/Admin/productAdmin");

router.post("/add", controller.addProduct);
router.get("/all", controller.getAllProducts);
router.put("/update/:id", controller.updateProduct);
router.delete("/delete/:id", controller.deleteProduct);

module.exports = router;
