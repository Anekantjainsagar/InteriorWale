const SupportLogo = require("../../models/SupportLogo");

const getAllLogos = async () => {
  return await SupportLogo.find();
};

const addLogos = async (data) => {
  return await SupportLogo.create(data);
};

const updateLogos = async (id, data) => {
  const updated = await SupportLogo.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!updated) throw new Error("Logo not found or update failed");
  return updated;
};

const deleteLogos = async (id) => {
  const deleted = await SupportLogo.findByIdAndDelete(id);
  if (!deleted) throw new Error("Logo not found or delete failed");
  return deleted;
};

module.exports = { getAllLogos, addLogos, updateLogos, deleteLogos };
