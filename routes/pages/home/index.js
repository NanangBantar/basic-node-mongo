const express = require("express");
const router = express.Router();
const authenticateJWT = require("../../auth/tokencheck/authenticateJWT");

router.get("/", authenticateJWT, async (req, res) => {
  // common require
  const data = require("../../../views/pages/common/utils/data");
  const defaultimage = require("../../../views/pages/common/utils/defaultimage");
  // only this page require
  const divisionData = require("../../../views/pages/home/utils/divisiondata");
  const offDayData = require("../../../views/pages/home/utils/offdaydata");
  const getNameOfDay = require("../../../views/pages/home/helpers/getNameOfDay");
  const contractmodaldetail = require("../../../views/pages/home/utils/contractmodaldetail");
  const retypepasswordmodal = require("../../../views/pages/home/utils/retypenewpassword");
  const resp = await data(req.user.email);
  return res.render("./pages", {
    pages: "home",
    divisionData,
    getNameOfDay,
    contractmodaldetail,
    retypepasswordmodal,
    defaultimage,
    offDayData,
    data: resp,
  });
});

module.exports = router;
