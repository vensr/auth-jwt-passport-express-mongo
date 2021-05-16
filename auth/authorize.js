const UserModel = require("../model/user");

const authorize = () => {
    return async (req, res, next) => {
        const user = await UserModel.findById(req.user._id);
        const isAdminUser = await user.isAdmin();
        if (isAdminUser) {
            next();
        } else {
            res.status(401).json({ errors: "Unauthorized to perform this action." })
        }
    }
}
module.exports = authorize;
