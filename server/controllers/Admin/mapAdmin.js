const mapService = require("../../services/Admin/mapService");

const isAdmin = (user) => user.role === "admin";

const getAllCords = async (req, res, next) => {
  if (!isAdmin(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });
  try {
    const members = await mapService.getAllCords();
    res.status(200).json({ success: true, data: members });
  } catch (err) {
    next(err);
  }
};

const addCords = async (req, res, next) => {
  if (!isAdmin(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });
  try {
    const member = await mapService.addCords(req.body);
    res.status(201).json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
};

const updateCords = async (req, res, next) => {
  if (!isAdmin(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });
  try {
    const updated = await mapService.updateCords(req.params.id, req.body);
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

const deleteCords = async (req, res, next) => {
  if (!isAdmin(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });
  try {
    const deleted = await mapService.deleteCords(req.params.id);
    res.status(200).json({ success: true, data: deleted });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllCords, addCords, updateCords, deleteCords };
