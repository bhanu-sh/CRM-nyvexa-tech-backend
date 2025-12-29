import Role from "../models/role.models.js";

/**
 * CREATE Role
 */
export const createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json({ success: true, data: role });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

/**
 * GET all Roles
 */
export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find()
      .populate("permissions", "name module")
      .sort({ name: 1 });

    res.status(200).json({ success: true, data: roles });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/**
 * GET Role by ID
 */
export const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id)
      .populate("permissions", "name module");

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found"
      });
    }

    res.status(200).json({ success: true, data: role });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

/**
 * UPDATE Role
 */
export const updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("permissions", "name module");

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found"
      });
    }

    res.status(200).json({ success: true, data: role });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

/**
 * DELETE Role
 * (Protect system roles)
 */
export const deleteRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found"
      });
    }

    if (role.isSystemRole) {
      return res.status(403).json({
        success: false,
        message: "System roles cannot be deleted"
      });
    }

    await role.deleteOne();

    res.status(200).json({
      success: true,
      message: "Role deleted successfully"
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
