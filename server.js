const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

// using template engine ejs
app.set('view engine', 'ejs');

app.use(cookieParser("secret"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('./assets'));

// api
app.use("/api/auth/login", require("./routes/auth/login/login"));

app.get("/", (req, res) => {
    res.render("pages/");
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server Running AT PORT ${process.env.SERVER_PORT}`);
});