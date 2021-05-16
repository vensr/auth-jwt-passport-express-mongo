const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// user schema definition
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{ type: Schema.Types.ObjectId, ref: 'role' }]
});

const RoleModel = require("./role")
const { ADMIN_ROLE, USER_ROLE } = require("../config/constants")

// hash the password before save
UserSchema.pre(
    'save',
    async function (next) {
        const user = this;

        // hash the password
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;

        // associate user role if its not associated with admin role
        if (user.roles.length === 0) {
            await RoleModel.findOne({ name: USER_ROLE }).then(
                (role) => {
                    this.roles.push(role);
                }
            );
        }
        next();
    }
);

// add custom method to validate the password
UserSchema.methods.isPasswordValid = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

// add custom method to validate the password
UserSchema.methods.isAdmin = async function () {
    const user = this;
    const adminRole = await RoleModel.findOne({ name: ADMIN_ROLE });
    return user.roles.includes(adminRole._id);
}

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
