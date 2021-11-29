const express = require("express");
const router = express.Router();
const authenticateJWT = require("../../auth/tokencheck/authenticateJWT");
const { check, validationResult } = require("express-validator");

router.post("/", authenticateJWT, [
    check("jam_masuk").not().isEmpty(),
    check("jam_istirahat").not().isEmpty(),
    check("jam_selesai_istrahat").not().isEmpty(),
    check("jam_pulang").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    return res.send("ok");
});

module.exports = router;