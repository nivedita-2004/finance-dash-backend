const userQuery = require("../queries/userQuery");

async function getUsers(req, res, next) {
  try {
    const users = await userQuery.getAllUsers();

    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    const user = await userQuery.getUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const { name, role, status } = req.body;

    const existingUser = await userQuery.getUserById(id);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const fields = {};
    if (name) fields.name = name;
    if (role) fields.role = role;
    if (status) fields.status = status;

    if (Object.keys(fields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update"
      });
    }

    await userQuery.updateUser(id, fields);

    const updatedUser = await userQuery.getUserById(id);

    res.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUsers,
  getUser,
  updateUser
};