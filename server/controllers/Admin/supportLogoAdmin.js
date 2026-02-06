const supportLogoService = require("../../services/Admin/supportLogoService");

const isAdmin = (user) => user.role === "admin";

const getAllLogos = async (req, res, next) => {
  if (!isAdmin(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });
  try {
    const members = await supportLogoService.getAllLogos();
    res.status(200).json({ success: true, data: members });
  } catch (err) {
    next(err);
  }
};

const addLogos = async (req, res, next) => {
  if (!isAdmin(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });
  try {
    const member = await supportLogoService.addLogos(req.body);
    res.status(201).json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
};

const updateLogos = async (req, res, next) => {
  if (!isAdmin(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });
  try {
    const updated = await supportLogoService.updateLogos(req.params.id, req.body);
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

const deleteLogos = async (req, res, next) => {
  if (!isAdmin(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });
  try {
    const deleted = await supportLogoService.deleteLogos(req.params.id);
    res.status(200).json({ success: true, data: deleted });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllLogos, addLogos, updateLogos, deleteLogos };
