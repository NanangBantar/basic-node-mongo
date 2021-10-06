const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/auth/login", require("./routes/auth/login/login"));

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server Running AT PORT ${process.env.SERVER_PORT}`);
});