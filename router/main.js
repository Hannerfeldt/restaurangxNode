const express = require("express");
const router = express.Router();

const BookingModel = require("../models/booking");
const GuestModel = require("../models/guest");

router.get("/", (req, res) => {

  res.render("index");

});

router.get("/guest", async (req, res) => {

  const guest = await GuestModel.find()

  res.send(guest);

});

router.get("/table", async (req, res) => {

  const booking = await BookingModel.find()

  res.send(booking);

});

router.post("/table", async (req, res) => {
  console.log(req.body)
  new BookingModel({
      count: req.body.count,
      date: req.body.date,
      time: req.body.time,
      guestId: 99,
      id: 30
  }).save()
  // new BookingModel({
  //   count: 4,
  //   date: new Date(2020, 08, 05),
  //   time: 18.00,
  //   guestId: 999,
  //   id: 3,
  // }).save();

});

module.exports = router;