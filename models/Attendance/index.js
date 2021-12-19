const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    attendance_data: {},
  },
  { minimize: false }
);

module.exports = Attendance = mongoose.model("attendance", AttendanceSchema);
