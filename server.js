const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectMongo = require("./connection/connectMongo");
const authenticateJWT = require("./routes/auth/tokencheck/authenticateJWT");
const _ = require("lodash");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({
    extended: false
}));
app.locals._ = _;
app.use(express.urlencoded({ extended: true }));
connectMongo();

// using template engine ejs
app.set('view engine', 'ejs');
app.use(cookieParser("secret"));
app.use(express.static('./assets'));
app.helpers({
    renderScriptsTags: function (all) {
        if (all != undefined) {
            return all.map(function (script) {
                return '<script src="/javascripts/' + script + '"></script>';
            }).join('\n ');
        }
        else {
            return '';
        }
    }
});

// user api management
app.use("/api/user", require("./routes/auth/login/login"));
app.use("/api/createuser", require("./routes/auth/createUser/createUser"));
app.use("/api/logout", require("./routes/auth/logout/logout"));

// login page management
app.get('/', function (req, res) {
    if (req.signedCookies.secret) return res.redirect("/home");
    return res.render("./pages/login/login");
});

// register page management
app.get('/createaccount', function (req, res) {
    if (req.signedCookies.secret) return res.redirect("/home");
    return res.render("./pages/create_account/create_account");
});

// home page management
app.get('/home', authenticateJWT, async (req, res) => {
    const data = require("./views/pages/home/utils/data");
    const resp = await data(req.user.email);
    return res.render("./pages", {
        pages: "home",
        data: resp
    });
});



app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server Running AT PORT ${process.env.SERVER_PORT}`);
});