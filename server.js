const app = require("express")();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const minifyHTML = require("express-minify-html-2");
const _ = require("lodash");
const connectMongo = require("./connection/connectMongo");
const express = require("express");

dotenv.config();

const http = require("http").Server(app);
const io = require("socket.io")(http);
// app.io = io;

io.on("connection", function (socket) {
  console.log("A user connected");

  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

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
app.use("/", require("./routes/auth/login"));
// register page management
app.use("/createaccount", require("./routes/auth/createUser"));
// home page management
app.use("/home", require("./routes/pages/home"));
// attendance page management
app.use("/attendance", require("./routes/pages/attendance"));

http.listen(process.env.SERVER_PORT, () => {
  console.log(`Server Running AT PORT ${process.env.SERVER_PORT}`);
});
