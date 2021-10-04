import koneksi from "./koneksi.js";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { jajal, home } from "./routes/home/home.js";


dotenv.config();
const __dirname = path.resolve();
const app = express();

koneksi.connect((err) => {
    if (err) throw err;
    koneksi.query(`use ${process.env.DB_NAME}`, (err, result) => {
        if (err) throw err;
        console.log("Database Connected");
    });
});

app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("containers/index");
});

app.get("/jajal", jajal());
app.get("/home", home());

app.listen(process.env.SERVER, () => {
    console.log(`SERVER RUNNING AT PORT ${process.env.SERVER}`);
});