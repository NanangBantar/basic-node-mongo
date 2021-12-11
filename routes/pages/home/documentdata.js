const express = require("express");
const router = express.Router();
const { produce } = require("immer");
const { v4: uuidv4 } = require("uuid");
const { check, validationResult } = require("express-validator");
const authenticateJWT = require("../../auth/tokencheck/authenticateJWT");
const User = require("../../../models/User");

router.post(
  "/",
  authenticateJWT,
  [check().not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { image_ktp, image_sim, image_bpjs, image_npwp } = req.body;
      const { email } = req.user;
      let user = await User.find({
        email,
      }).select("-_id -__v");
      if (user) {
        const nextState = produce(user, (draft) => {
          draft[0].user_data.document_data = {
            image_ktp: uuidv4(),
            image_sim: uuidv4(),
            image_bpjs: uuidv4(),
            image_npwp: uuidv4(),
          };
          return draft[0];
        });

        return res.json({
          nextState,
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
