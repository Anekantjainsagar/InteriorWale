const User = require("../models/User");

const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const updateUserDetails = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });
  return user;
};

module.exports = {
  getUserById,
  updateUserDetails,
};
