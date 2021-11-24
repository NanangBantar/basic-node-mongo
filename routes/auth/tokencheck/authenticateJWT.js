const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authenticateJWT = (req, res, next) => {
    const authCookie = req.signedCookies.secret;

    if (authCookie) {
        jwt.verify(authCookie, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) {
                return res.redirect("/");
            }
            req.user = user;
            next();
        });
    } else {
        return res.redirect("/");
    }
};

module.exports = authenticateJWT;