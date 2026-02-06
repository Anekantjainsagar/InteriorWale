const Gallery = require("../../models/Gallery");

const getAllPhotos = async () => {
  return await Gallery.find();
};

const addPhotos = async (data) => {
  return await Gallery.create(data);
};

const updatePhotos = async (id, data) => {
  const updated = await Gallery.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!updated) throw new Error("Photo not found or update failed");
  return updated;
};

const deletePhotos = async (id) => {
  const deleted = await Gallery.findByIdAndDelete(id);
  if (!deleted) throw new Error("Photo not found or delete failed");
  return deleted;
};

module.exports = { getAllPhotos, addPhotos, updatePhotos, deletePhotos };
