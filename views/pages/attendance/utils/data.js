const moment = require("moment");
const Attendance = require("../../../../models/Attendance");
const User = require("../../../../models/User");

moment.locale("id");

const data = async (statement) => {
  try {
    let user = await User.find({
      email: statement,
    }).select("-_id -__v");
  } catch (error) {
    return res.json({
      errors: [
        {
          msg: "Server Error",
        },
      ],
    });
  }
};

module.exports = data;
