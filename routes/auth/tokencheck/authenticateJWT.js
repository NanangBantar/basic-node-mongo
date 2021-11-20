const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authenticateJWT = (req, res, next) => {
    const authCookie = req.signedCookies.token;

    if (authCookie) {
        jwt.verify(authCookie, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT;