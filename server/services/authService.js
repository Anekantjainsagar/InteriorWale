const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const registerUser = async (userData) => {
  // Check if user exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Create user
  const user = await User.create(userData);

  // Generate token
  const token = generateToken(user._id, user.role);

  return { user, token };
};

const loginUser = async (email, password) => {
  // Check if user exists
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Check if password matches
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // Generate token
  const token = generateToken(user._id, user.role);

  return { user, token };
};

const getGoogleAuthUser = async (profile) => {
  let user = await User.findOne({ googleId: profile.id });

  if (!user) {
    user = await User.create({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      isVerified: true,
      avatar: profile.photos[0].value,
    });
  }

  const token = generateToken(user._id);
  return { user, token };
};

module.exports = {
  registerUser,
  loginUser,
  getGoogleAuthUser,
};
