const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectMongo = require("./connection/connectMongo");
const authenticateJWT = require("./routes/auth/tokencheck/authenticateJWT");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({
    extended: false
}));
app.use(express.urlencoded({ extended: true }));
connectMongo();

// using template engine ejs
app.set('view engine', 'ejs');
app.use(cookieParser("secret"));
app.use(express.static('./assets'));

// user api management
app.use("/api/user", require("./routes/auth/login/login"));
app.use("/api/createuser", require("./routes/auth/createUser/createUser"));
app.use("/api/logout", require("./routes/auth/logout/logout"));

// login page management
app.get('/', function (req, res) {
    if(req.signedCookies.secret) return res.redirect("/home");
    return res.render("./pages/login/login");
});

// register page management
app.get('/createaccount', function (req, res) {
    if(req.signedCookies.secret) return res.redirect("/home");
    return res.render("./pages/create_account/create_account");
});

app.get('/home', authenticateJWT, function (req, res) {
    return res.render("./pages", { pages: "Home" });
});



app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server Running AT PORT ${process.env.SERVER_PORT}`);
});