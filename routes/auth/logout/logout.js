const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.clearCookie("secret");
    res.redirect("/");
});

module.exports = router;
