const User = require("../../../../models/User");

const data = async (statement) => {
    try {
        let user = await User.findOne({
            email: statement
        }).select("-_id -__v -password -passwordText");
        return user;
    } catch (error) {
        return res.json({
            errors: [{
                msg: "Server Error"
            }]
        });
    }
};

module.exports = data;