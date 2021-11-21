const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const { v4: uuidv4 } = require('uuid');

const User = require("../../../models/User");

router.post("/", [
    check("email").isEmail(),
    check("password").not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const passwordText = await bcrypt.hash(password, salt);

        let user = await User.findOne({
            email
        });

        if (!user) {
            user = new User({
                id: uuidv4(),
                email,
                password,
                passwordText,
                user_data: {}
            });

            await user.save();

            return res.json({
                msg: "New User Has Been Created..!"
            });
        }

        return res.json({
            msg: "Email has been used..!"
        });
    } catch (error) {
        return res.json({
            errors: [{
                msg: "Server Error"
            }]
        });
    }
});

module.exports = router;