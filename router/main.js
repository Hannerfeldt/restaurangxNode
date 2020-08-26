const express = require("express");
const router = express.Router();

const BookingModel = require("../models/booking");
const GuestModel = require("../models/guest");

router.get("/",(req, res) => {

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

  const booking = BookingModel.find({date: req.body.date, time: req.body.time});
  console.log("XXXXXXXXXXXX CONSOLE LOG BOOKING", booking);
  new BookingModel({
    count: req.body.count,
    date: req.body.date,
    time: req.body.time,
    guestId: 999,
    id: 3
  }).save();

});

router.post("/guest", async (req, res) => {

  

  new GuestModel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phonenr: req.body.phonenr,
    id: 0
  }).save();

});

module.exports = router;