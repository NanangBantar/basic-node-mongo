const express = require("express");
const router = express.Router();
const koneksi = require("../../../koneksi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

koneksi.connect((err) => {
    if (err) throw err;
    console.log("database connected");
});

router.post("/",
    [
        check('username', 'Username is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty()
    ]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, password } = req.body;

        koneksi.query("SELECT * FROM data_karyawan WHERE ?", { nama: username }, async (err, results) => {
            if (err) throw err;
            if (results.length !== 0) {
                let passwordHash = results[0].test;
                let isMatch = await bcrypt.compare(password, passwordHash);
                if (!isMatch) {
                    return res.send("Username atau Password anda salah");
                }
                const token = jwt.sign(username, process.env.ACCESS_TOKEN);
                res.cookie('token', token, {
                    signed: true,
                    httpOnly: false
                });
                console.log(results);
                res.redirect('/home');
            } else {
                return res.send("Password atau username anda salah..!");
            }
        });
    });

router.get("/", (req, res) => {
    jwt.verify(req.signedCookies['token'], process.env.ACCESS_TOKEN, (err) => {
        if (err) {
            res.render("pages/login/login.ejs");
        } else {
            res.redirect('/home');
        }
    });
});

module.exports = router;