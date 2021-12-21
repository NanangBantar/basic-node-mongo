const express = require("express");
const router = express.Router();
const authenticateJWT = require("../../auth/tokencheck/authenticateJWT");

router.get("/", authenticateJWT, async (req, res) => {
  // common require
  const data = require("../../../views/pages/common/utils/data");
  const defaultimage = require("../../../views/pages/common/utils/defaultimage");
  // only this page require
  const resp = await data(req.user.email);
  return res.render("./pages", {
    pages: "attendance",
    data: resp,
    defaultimage,
  });
});

module.exports = router;
