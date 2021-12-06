const express = require("express");
const router = express.Router();
const { produce } = require("immer");
const authenticateJWT = require("../../auth/tokencheck/authenticateJWT");
const { check, validationResult } = require("express-validator");
const User = require("../../../models/User");

router.post(
  "/",
  authenticateJWT,
  [
    check("division").not().isEmpty(),
    check("rank").not().isEmpty(),
    check("offdays").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { division, rank, offdays } = req.body;
      const { email } = req.user;

      let user = await User.find({
        email,
      });

      if (user) {
        const nextState = produce(user, (draft) => {
          draft[0].user_data.division = {
            division,
            rank,
            offdays,
          };
        });

        await User.findOneAndUpdate(
          { email },
          {
            $set: {
              "user_data.division_data": nextState[0].user_data.division,
            },
          }
        );
        return res.json({
          status: "success",
          msg: "Division data successfully updated..!",
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
