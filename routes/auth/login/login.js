const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { check, validationResult } = require("express-validator");
const User = require("../../../models/User");

dotenv.config();

router.post("/", [
    check('email').isEmail(),
    check('password', 'Password is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        let user = await User.findOne({
            email
        });

        if (user) {
            const isMatch = await bcrypt.compare(password, user.passwordText);

            if (isMatch) {
                const payload = {
                    email
                };
                const token = jwt.sign(payload, process.env.ACCESS_TOKEN);
                res.cookie('secret', token, { signed: true });
                return res.json({
                    status: "success",
                    msg: "Successfully logged in..!"
                });
            }
            return res.json({
                status: "failed",
                msg: "Wrong password or email..!"
            });
        }
        return res.json({
            status: "failed",
            msg: "Account doesnt exist..!"
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