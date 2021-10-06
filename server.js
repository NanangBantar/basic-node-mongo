const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
app.use(cookieParser("secret"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('./public'));

// api
app.use("/api/auth/login", require("./routes/auth/login/login"));

// views
app.use("/view", require("./public/view"));

app.get("/", (req, res) => {
    res.send(req.signedCookies)
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server Running AT PORT ${process.env.SERVER_PORT}`);
});