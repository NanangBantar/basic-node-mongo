const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

//authentication
const authenticateJWT = require("../../auth/tokencheck/authenticateJWT.js");

router.get("/", (req, res) => {
    jwt.verify(req.signedCookies['token'], process.env.ACCESS_TOKEN, (err) => {
        if (err) {
            res.redirect("/");
        } else {
            res.render("pages/",{
                pages: "Home"
            });
        }
    });
});

module.exports = router;