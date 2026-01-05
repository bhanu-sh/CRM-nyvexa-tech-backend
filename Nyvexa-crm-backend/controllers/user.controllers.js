import User from "../models/user.models.js";

/**
 * CREATE User
 */
export const createUser = async (req, res) => {
  try {
    const user = await User.create({
      ...req.body,
      createdBy: req.user?._id // optional (JWT)
    });

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        email: user.email
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

/**
 * GET all Users
 */
export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("role", "name")
      .populate("createdBy", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/**
 * GET User by ID
 */
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("role", "name permissions")
      .populate("createdBy", "fullName email");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

/**
 * UPDATE User (no password here)
 */
export const updateUser = async (req, res) => {
  try {
    delete req.body.password; // forbid password update here

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("role", "name");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

/**
 * CHANGE PASSWORD (separate endpoint)
 */
export const changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.password = req.body.password;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully"
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

/**
 * DELETE User (soft delete preferred)
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: "inactive" },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User deactivated"
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
