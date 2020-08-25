const express = require("express");
const router = express.Router();

const BookingModel = require("../models/booking");
const GuestModel = require("../models/guest");

router.get("/", async (req, res) => {

  const guest = await GuestModel.find()
  const booking = await BookingModel.find()

  res.send(guest + booking);

});

router.post("/", async (req, res) => {

  // new BookingModel({
  //   count: 4,
  //   date: new Date(2020, 08, 05),
  //   time: 18.00,
  //   guestId: 999,
  //   id: 3,
  // }).save();

});

module.exports = router;
