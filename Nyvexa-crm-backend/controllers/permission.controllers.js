import Permission from "../models/permission.models.js";

/**
 * CREATE Permission
 */
export const createPermission = async (req, res) => {
  try {
    const permission = await Permission.create(req.body);
    res.status(201).json({ success: true, data: permission });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

/**
 * GET all Permissions
 */
export const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find().sort({ module: 1, name: 1 });
    res.status(200).json({ success: true, data: permissions });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/**
 * GET Permission by ID
 */
export const getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    if (!permission) {
      return res.status(404).json({
        success: false,
        message: "Permission not found"
      });
    }
    res.status(200).json({ success: true, data: permission });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

/**
 * UPDATE Permission
 */
export const updatePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!permission) {
      return res.status(404).json({
        success: false,
        message: "Permission not found"
      });
    }

    res.status(200).json({ success: true, data: permission });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

/**
 * DELETE Permission
 */
export const deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndDelete(req.params.id);

    if (!permission) {
      return res.status(404).json({
        success: false,
        message: "Permission not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Permission deleted successfully"
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
