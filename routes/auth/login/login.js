const express = require("express");
const router = express.Router();
const koneksi = require("../../../koneksi");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const e = require("express");

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
            }
        });
        // const salt = await bcrypt.genSalt(10);
        // const passwordhash = await bcrypt.hash(password, salt);
    });
module.exports = router;