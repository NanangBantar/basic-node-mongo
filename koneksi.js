import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const koneksi = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});

export default koneksi;
