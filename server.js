const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
var minifyHTML = require("express-minify-html-2");
const _ = require("lodash");
const connectMongo = require("./connection/connectMongo");
const authenticateJWT = require("./routes/auth/tokencheck/authenticateJWT");

dotenv.config();
const app = express();
app.use(cors());
app.use(
  express.json({
    extended: false,
  })
);
app.locals._ = _;
app.use(express.urlencoded({ extended: true }));
app.use(
  minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      minifyJS: true,
    },
  })
);
connectMongo();

// using template engine ejs
app.set("view engine", "ejs");
app.use(cookieParser("secret"));
app.use(express.static("./assets"));

// start api mananegement ============================================
// user api management
app.use("/api/user", require("./routes/auth/login/login"));
app.use("/api/createuser", require("./routes/auth/createUser/createUser"));
app.use("/api/logout", require("./routes/auth/logout/logout"));

// home api management
app.use("/api/personaldata", require("./routes/pages/home/personaldata"));
app.use("/api/attendancedata", require("./routes/pages/home/attendancedata"));
app.use("/api/divisiondata", require("./routes/pages/home/divisondata"));
app.use("/api/settingdata", require("./routes/pages/home/settingdata"));
app.use("/api/documentdata", require("./routes/pages/home/documentdata"));

// end api mananegement ============================================

// login page management
app.get("/", function (req, res) {
  if (req.signedCookies.secret) return res.redirect("/home");
  return res.render("./pages/login/login");
});

// register page management
app.get("/createaccount", function (req, res) {
  if (req.signedCookies.secret) return res.redirect("/home");
  return res.render("./pages/create_account/create_account");
});

// home page management
app.get("/home", authenticateJWT, async (req, res) => {
  // common require
  const data = require("./views/pages/common/utils/data");
  const defaultimage = require("./views/pages/common/utils/defaultimage");
  // only this page require
  const divisionData = require("./views/pages/home/utils/divisiondata");
  const offDayData = require("./views/pages/home/utils/offdaydata");
  const getNameOfDay = require("./views/pages/home/helpers/getNameOfDay");
  const contractmodaldetail = require("./views/pages/home/utils/contractmodaldetail");
  const retypepasswordmodal = require("./views/pages/home/utils/retypenewpassword");
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

app.get("/attendance", authenticateJWT, async (req, res) => {
  // common require
  const data = require("./views/pages/common/utils/data");
  const defaultimage = require("./views/pages/common/utils/defaultimage");
  // only this page require
  const resp = await data(req.user.email);
  return res.render("./pages", {
    pages: "attendance",
    data: resp,
    defaultimage,
  });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server Running AT PORT ${process.env.SERVER_PORT}`);
});
