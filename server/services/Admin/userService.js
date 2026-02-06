const User = require("../../models/User");

const getAllUsers = async () => {
  const users = await User.find();
  if (!users) {
    throw new Error("Users not found");
  }
  return users;
};

const deleteUser = async (userId) => {
  const response = await User.deleteOne({ _id: userId });
  if (!response) {
    throw new Error("Users not found");
  }
  return response;
};

module.exports = {
  getAllUsers,
  deleteUser,
};
