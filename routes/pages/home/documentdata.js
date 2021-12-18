const express = require("express");
const router = express.Router();
const { produce } = require("immer");
const multer = require("multer");
const path = require("path");
const authenticateJWT = require("../../auth/tokencheck/authenticateJWT");
const User = require("../../../models/User");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/js/pages/home/documentdata/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post(
  "/",
  authenticateJWT,
  upload.single("image_ktp"),
  async (req, res) => {
    try {
      const { image_ktp, image_sim, image_bpjs, image_npwp } = req.body;
      const { email } = req.user;
      let user = await User.find({
        email,
      }).select("-_id -__v");
      if (user) {
        let file = req.file;
        const nextState = produce(user, (draft) => {
          draft[0].user_data.document_data = {
            image_ktp: file.filename,
            image_sim,
            image_bpjs,
            image_npwp,
          };
          return draft[0];
        });
        await User.findOneAndUpdate(
          { email },
          {
            $set: nextState,
          }
        );
        return res.json({
          msg: "Document successfully updated...!",
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
