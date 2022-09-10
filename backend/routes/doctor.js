const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Doctor = require("../models/doctor");
const auth = require("../middlewares/auth");

router.post("/get-doctor-info-by-user-id", auth, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.body.userId });
    // console.log(req.body.userId);
    // console.log(doctor);
    res.status(200).send({
      success: true,
      message: "Doctor info fetched successfully",
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting doctor info", success: false, error });
  }
});

router.post("/update-doctor-profile", auth, async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    // console.log(req.body.userId);
    // console.log(doctor);
    res.status(200).send({
      success: true,
      message: "Doctor profile updated successfully",
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting doctor info", success: false, error });
  }
});

module.exports = router;
