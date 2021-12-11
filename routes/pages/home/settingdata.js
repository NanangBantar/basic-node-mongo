const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticateJWT = require("../../auth/tokencheck/authenticateJWT");
const { check, validationResult } = require("express-validator");
const User = require("../../../models/User");

router.post(
  "/",
  authenticateJWT,
  [
    check("password").not().isEmpty(),
    check("new_password").not().isEmpty(),
    check("retype_new_password").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let { new_password } = req.body;
      const { email } = req.user;
      const salt = await bcrypt.genSalt(10);
      let user = await User.find({
        email,
      });
      if (user) {
        const password = await bcrypt.hash(new_password, salt);
        const nextState = user[0];
        nextState.password = new_password;
        nextState.passwordText = password;
        await User.findOneAndUpdate(
          { email },
          {
            $set: nextState,
          }
        );
        return res.json({
          msg: "Password successfully updated...!",
        });
      }
      return res.json({
        status: "failed",
        msg: "Account doesnt exist..!",
      });
    } catch (error) {
      return res.json({
        errors: [
          {
            msg: "Server Error",
          },
        ],
      });
    }
  }
);

module.exports = router;
