import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

export const home = () => {
    return router.get("/home", (req, res) => {
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
    })
}

export const jajal = () => {
    return router.get("/jajal", (req, res) => {
        res.send("jajal");
    });
}
