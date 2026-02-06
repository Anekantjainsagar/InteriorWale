const galleryService = require("../../services/Admin/galleryService");

const isAdmin = (user) => user.role === "admin";

const getAllPhotos = async (req, res, next) => {
  if (!isAdmin(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });
  try {
    const members = await galleryService.getAllPhotos();
    res.status(200).json({ success: true, data: members });
  } catch (err) {
    next(err);
  }
};

const addPhotos = async (req, res, next) => {
  if (!isAdmin(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });
  try {
    const member = await galleryService.addPhotos(req.body);
    res.status(201).json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
};

const updatePhotos = async (req, res, next) => {
  if (!isAdmin(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });
  try {
    const updated = await galleryService.updatePhotos(req.params.id, req.body);
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

const deletePhotos = async (req, res, next) => {
  if (!isAdmin(req.user))
    return res.status(401).json({ success: false, error: "Not authorized" });
  try {
    const deleted = await galleryService.deletePhotos(req.params.id);
    res.status(200).json({ success: true, data: deleted });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllPhotos, addPhotos, updatePhotos, deletePhotos };
