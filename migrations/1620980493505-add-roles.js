'use strict'

require('dotenv').config();
require("../config/db")
const { USER_ROLE, ADMIN_ROLE } = require("../config/constants")

const RoleModel = require("../model/role")

module.exports.up = async () => {
  await RoleModel.create({ name: USER_ROLE, description: "User Role" });
  await RoleModel.create({ name: ADMIN_ROLE, description: "Admin Role" });
}

module.exports.down = async () => {
  await RoleModel.deleteOne({ name: USER_ROLE });
  await RoleModel.deleteOne({ name: ADMIN_ROLE });
}
