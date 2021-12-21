const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.signedCookies.secret) return res.redirect("/home");
  return res.render("./pages/create_account/create_account");
});

module.exports = router;
