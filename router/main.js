const express = require("express");
const router = express.Router();

const BookingModel = require("../models/booking");
const GuestModel = require("../models/guest");
const Booking = require("../models/booking");

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

  console.log(req.body.guestId)

  new BookingModel({
    count: req.body.tables.count,
    date: req.body.tables.date,
    time: req.body.tables.time,
    guestId: req.body.guestId,
    id: 1000,
  }).save();

  res.send({
    success: true
  })
});


router.post("/guest", async (req, res) => {
  let guestId
  const registered = await GuestModel.findOne({
    email: req.body.email
  })

  if (registered) {
    guestId = registered.id

    new GuestModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phonenr: req.body.phonenr,
      id: registered.id
    }).save()

  } else {
    const latest = await GuestModel.findOne().sort({
      id: -1
    })

    if (latest) guestId = latest.id + 1
    else guestId = 1000

    new GuestModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phonenr: req.body.phonenr,
      id: guestId
    }).save()
  }

  res.send({
    guestId
  })

});

router.post("/deleteall", async (req, res) => {

  await BookingModel.deleteMany({})
  await GuestModel.deleteMany({})
})

router.post("/availablility", async (req, res) => {

  const available = BookingModel.find({
    date: req.body.date,
    time: req.body.time
  }).then(items => {
    let amount = 0
    items.forEach(item => {
      amount += item.count
    });
    if (req.body.count + amount > 15) {
      res.send({
        success: false
      })
    } else {
      res.send({
        success: true
      })
    }
  })

  //res.send({available: available})
})

module.exports = router;