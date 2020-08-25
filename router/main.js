const express = require("express");
const router = express.Router();

const BookingModel = require("../models/booking");
const GuestModel = require("../models/guest");

router.get("/", (req, res, next) => {
  
  next()
})

router.post("/", async (req, res, next) => {
  //   const guest = await GuestModel.findOne({
  //       email: req.body.email
  //   });

  // new GuestModel({
  //   firstname: "Chabbe",
  //   lastname: "Chabbsson",
  //   email: "bigdick@email.se",
  //   phoneNr: 590195313,
  //   id: 1999,
  // }).save();
  next()
});

module.exports = router;