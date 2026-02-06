const adminUserService = require("../../services/Admin/userService");

const getAllUsers = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({
      success: false,
      error: "Not authorized to access this route",
    });
  }

  try {
    const users = await adminUserService.getAllUsers(req.body);

    res.status(200).json({
      success: true,
      data: users.filter((e) => e?.role == "user"),
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({
      success: false,
      error: "Not authorized to access this route",
    });
  }

  if (!req.query.id) {
    return res.status(400).json({
      success: false,
      error: "Internal Server Error",
    });
  }

  try {
    const deletedUser = await adminUserService.deleteUser(req.query.id);

    res.status(201).json({
      success: true,
      data: deletedUser,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUsers, deleteUser };
