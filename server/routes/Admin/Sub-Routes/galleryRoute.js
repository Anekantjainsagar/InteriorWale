const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/Admin/galleryAdmin");

router.get("/all", controller.getAllPhotos);
router.post("/add", controller.addPhotos);
router.put("/update/:id", controller.updatePhotos);
router.delete("/delete/:id", controller.deletePhotos);

module.exports = router;
