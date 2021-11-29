const express = require("express");
const router = express.Router();
const { produce } = require("immer");
const authenticateJWT = require("../../auth/tokencheck/authenticateJWT");
const { check, validationResult } = require("express-validator");
const User = require("../../../models/User");

router.post("/", authenticateJWT, [
    check("jam_masuk").not().isEmpty(),
    check("jam_istirahat").not().isEmpty(),
    check("jam_selesai_istirahat").not().isEmpty(),
    check("jam_pulang").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { jam_masuk, jam_istirahat, jam_selesai_istirahat, jam_pulang } = req.body;
        const { email } = req.user;

        let user = await User.find({
            email
        });

        if (user) {
            const nextState = produce(user, draft => {
                draft[0].user_data.attendance_data = {
                    jam_masuk,
                    jam_istirahat,
                    jam_selesai_istirahat,
                    jam_pulang
                };
            });
            await User.findOneAndUpdate(
                { email },
                {
                    $set: { "user_data.attendance_data": nextState[0].user_data.attendance_data }
                }
            );
            return res.json({
                status: "success",
                msg: "Attendance data successfully updated..!"
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