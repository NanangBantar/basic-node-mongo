import mysql from "mysql";

const koneksi = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root"
});

export default koneksi;
