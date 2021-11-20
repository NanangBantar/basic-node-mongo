const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

router.post("/", [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty()
]
    , async (req, res) => {
        res.send("aaa");
    });

// router.get("/", (req, res) => {
//     res.send("aaaa");
//     // jwt.verify(req.signedCookies['token'], process.env.ACCESS_TOKEN, (err) => {
//     //     if (err) {
//     //         res.render("pages/login/login.ejs");
//     //     } else {
//     //         res.redirect('/home');
//     //     }
//     // });
// });

module.exports = router;