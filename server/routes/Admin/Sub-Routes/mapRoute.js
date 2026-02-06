const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/Admin/mapAdmin");

router.get("/all", controller.getAllCords);
router.post("/add", controller.addCords);
router.put("/update/:id", controller.updateCords);
router.delete("/delete/:id", controller.deleteCords);

module.exports = router;
