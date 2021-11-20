const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    passwordText: {
        type: String,
        required: true
    },
    user_data: {}
}, { minimize: false });

module.exports = User = mongoose.model("employee", UserSchema);