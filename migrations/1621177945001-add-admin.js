'use strict'

require('dotenv').config();
require("../config/db")

const { ADMIN_ROLE } = require("../config/constants")

const UserModel = require("../model/user")
const RoleModel = require("../model/role")

module.exports.up = async (next) => {
  const role = await RoleModel.findOne({ name: ADMIN_ROLE });
  await UserModel.create({ email: 'admin@testing.com', password: 'password', roles: [role] });
}

module.exports.down = async (next) => {
  await UserModel.deleteOne({ email: 'admin@testing.com' });
}
