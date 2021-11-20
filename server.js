const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({
    extended: false
}));

// using template engine ejs
app.set('view engine', 'ejs');
app.use(cookieParser("secret"));
app.use(express.static('./assets'));

// user api management
app.use("/api/user", require("./routes/auth/login/login"));

// login page management
app.get('/', function (req, res) {
    res.render("./pages/login/login");
});

// register page management
app.get('/createaccount', function (req, res) {
    res.render("./pages/create_account/create_account");
});



app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server Running AT PORT ${process.env.SERVER_PORT}`);
});