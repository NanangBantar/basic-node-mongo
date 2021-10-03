import express from "express";
const router = express.Router();

export const login = router.get("/", (req, res) => {
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