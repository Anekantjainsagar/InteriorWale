const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/Admin/supportLogoAdmin");

router.get("/all", controller.getAllLogos);
router.post("/add", controller.addLogos);
router.put("/update/:id", controller.updateLogos);
router.delete("/delete/:id", controller.deleteLogos);

module.exports = router;
