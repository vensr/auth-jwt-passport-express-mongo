const mongoose = require('mongoose');

// user schema definition
const Schema = mongoose.Schema;
const RoleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
});

const RoleModel = mongoose.model('role', RoleSchema);

module.exports = RoleModel;
