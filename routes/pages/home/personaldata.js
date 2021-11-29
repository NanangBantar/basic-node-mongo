const express = require("express");
const router = express.Router();
const { produce } = require("immer");
const authenticateJWT = require("../../auth/tokencheck/authenticateJWT");
const { check, validationResult } = require("express-validator");
const User = require("../../../models/User");

router.post("/", authenticateJWT, [
    check("nama_karyawan").not().isEmpty(),
    check("alamat_ktp").not().isEmpty(),
    check("nomor_hp").not().isEmpty(),
    check("nomor_serumah").not().isEmpty(),
    check("jenis_kelamin").not().isEmpty(),
    check("no_ktp").not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { nama_karyawan, alamat_ktp, nomor_hp, nomor_serumah, jenis_kelamin, no_ktp, no_sim, no_npwp } = req.body;
        const { email } = req.user;
        let user = await User.find({
            email
        });
        if (user) {
            const nextState = produce(user, draft => {
                draft[0].user_data.personal_data = {
                    nama_karyawan,
                    alamat_ktp,
                    nomor_hp,
                    nomor_serumah,
                    jenis_kelamin,
                    no_ktp,
                    no_sim,
                    no_npwp
                };
            });
            await User.findOneAndUpdate(
                { email },
                {
                    $set: { "user_data.personal_data": nextState[0].user_data.personal_data }
                }
            );
            return res.json({
                status: "success",
                msg: "Personal data successfully updated..!"
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