import koneksi from "./koneksi.js";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(cookieParser());

koneksi.connect((err) => {
    if (err) throw err;
    console.log("database connected");

    koneksi.query(`use ${process.env.DB_NAME}`, (err, result) => {
        if (err) throw err;
    });
});

app.get('/', (req, res) => {
    const jwtToken = req.cookies.token;
    if (jwtToken) {
        res.redirect("/home");
    } else {
        res.clearCookie("token");
        res.send(`
        <h1 style="text-align:center;">LOGIN</h1>
        <ul>
            <li><a style="text-decoration:none; font-weight:bold; color:blue; cursor:pointer;">SHOW All USER</a>
            <br>You have to login first to using this WEB app
            <br>
            <br>do this format for login the WEB app
            <br>1. set id
            <br>2. your name<br>
            <b>exp : /login/id/yourname</b>
            </li>
        </ul>
        `);
    }
});

app.get('/login/:id/:name', (req, res) => {
    let { id, name } = req.params;
    koneksi.query(`SELECT * FROM data_karyawan WHERE id = '${id}' AND nama = '${name}'`, (err, result) => {
        if (err) throw err;
        console.log(result.length);
        if (result.length === 0) {
            res.send("Password atau Username anda salah");
        } else {
            const jwtToken = jwt.sign({ id }, process.env.TOKEN);
            res.cookie('token', jwtToken, {
                secure: false,
                httpOnly: false,
            });
            res.redirect("/home");
        }
    });
    koneksi.end();
});

app.get('/home', (req, res) => {
    const jwtToken = req.cookies.token;
    if (!jwtToken) {
        res.redirect("/");
    } else {
        jwt.verify(jwtToken, process.env.TOKEN, (err, verifiedJwt) => {
            if (err) {
                res.redirect("/");
            } else {
                res.send(`
                <h1 style="text-align: center;">HOME</h1>
                <ul>
                    <li><a style="text-decoration:none; font-weight:bold; color:blue;" href="/user">SHOW All USER</a></li>
                </ul>
                <ul>
                    <li><a style="text-decoration:none; font-weight:bold; color:blue;" href="/user/insert/yourname/yourposition/yourdescription">ADD USER</a>
                    <br>do this format for inserting new user<br>
                    <b>exp : /user/insert/yourname/yourposition/yourdescription</b>
                    </li>
                </ul>
                <ul>
                    <li>
                    <a style="text-decoration:none; font-weight:bold; color:blue;" href="/user/update/yourname/yourposition/yourdescription">EDIT USER</a>
                    <br>do this format for inserting new user
                    <br>1. set id
                    <br>2. field 
                    <br>3. new updated data
                    <br><b>exp : /user/insert/yourname/yourposition/yourdescription</b>
                    </li>
                </ul>
                <ul>
                    <li><a style="text-decoration:none; font-weight:bold; color:blue;" href="/user/1">SHOW SPECIFIC USER</a>
                        <br>use id for getting specific user data 
                        <br><b>exp : user/1</b>
                    </li>
                </ul>
                <ul>
                    <li><a style="text-decoration:none; font-weight:bold; color:blue;" href="/user/delete/1">DELETE SPECIFIC USER</a>
                    <br>use id for getting specific user data 
                    <br><b>exp : user/delete/1</b>
                    </li>
                </ul>
                `);
            }
        });
    }
});

app.get('/user', (req, res) => {
    koneksi.query("SELECT * FROM data_karyawan", (err, result) => {
        if (err) throw err;
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(result, null, 4));
    });
    koneksi.end;
});

app.get('/user/insert/:nama/:jabatan/:test', (req, res) => {
    let { nama, jabatan, test } = req.params;
    koneksi.query(`INSERT INTO data_karyawan SET ?`, { nama, jabatan, test }, (err, result) => {
        if (err) throw err;
        res.header("Content-Type", 'application/json');
        if (result.affectedRows !== 0) {
            res.send("Data Berhasil di tambahkan");
        } else {
            res.send("Data tidak di temukan");
        }
    });
    koneksi.end;
});

app.get('/user/update/:id/:field/:description', (req, res) => {
    let { id, field, description } = req.params;
    koneksi.query(`UPDATE data_karyawan SET ${field} = '${description}' WHERE id = '${id}'`, (err, result) => {
        res.header("Content-Type", 'application/json');
        if (err) {
            res.send(err.sqlMessage);
        } else {
            if (result.affectedRows !== 0) {
                res.send("Data berhasil di update");
            } else {
                res.send("Data tidak di temukan");
            }
        }
    });
    koneksi.end;
});

app.get('/user/:id', (req, res) => {
    let id = req.params.id;
    koneksi.query(`SELECT * FROM data_karyawan WHERE ?`, { id }, (err, result) => {
        if (err) throw err;
        res.header("Content-Type", 'application/json');
        if (result.length !== 0) {
            res.send(JSON.stringify(result, null, 4));
        } else {
            res.send("Data tidak di temukan");
        }
    });
    koneksi.end;
});

app.get('/user/delete/:id', (req, res) => {
    let id = req.params.id;
    koneksi.query(`DELETE FROM data_karyawan WHERE ?`, { id }, (err, result) => {
        if (err) throw err;
        res.header("Content-Type", 'application/json');
        if (result.affectedRows !== 0) {
            res.send("Data berhasil di hapus");
        } else {
            res.send("Data tidak di temukan");
        }
    });
    koneksi.end;
});


app.listen("3000", () => {
    console.log("Server has been started");
});