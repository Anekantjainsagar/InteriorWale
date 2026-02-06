const express = require("express");
const router = express.Router();
const officeController = require("../../../controllers/Admin/officeController");

// CRUD Routes
router.post("/add", officeController.createOffice);
router.get("/all", officeController.getAllOffices);
router.put("/update/:id", officeController.updateOffice);
router.delete("/delete/:id", officeController.deleteOffice);

module.exports = router;
