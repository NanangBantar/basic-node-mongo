const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.signedCookies.secret) return res.redirect("/home");
  return res.render("./pages/login/login");
});

module.exports = router;
