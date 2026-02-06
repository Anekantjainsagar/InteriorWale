const Map = require("../../models/Map");

const getAllCords = async () => {
  return await Map.find();
};

const addCords = async (data) => {
  return await Map.create(data);
};

const updateCords = async (id, data) => {
  const updated = await Map.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!updated) throw new Error("State not found or update failed");
  return updated;
};

const deleteCords = async (id) => {
  const deleted = await Map.findByIdAndDelete(id);
  if (!deleted) throw new Error("State not found or delete failed");
  return deleted;
};

module.exports = { getAllCords, addCords, updateCords, deleteCords };
