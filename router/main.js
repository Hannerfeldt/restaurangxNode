const express = require("express");
const router = express.Router();

const BookingModel = require("../models/booking");
const GuestModel = require("../models/guest");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/guest", async (req, res) => {
  const guest = await GuestModel.find();

  res.send(guest);
});

router.get("/table", async (req, res) => {
  const booking = await BookingModel.find();

  res.send(booking);
});

router.post("/table", async (req, res) => {
  const latest = await BookingModel.findOne().sort({
    id: -1,
  });

  console.log(latest);

  new BookingModel({
    count: req.body.tables.count,
    date: req.body.tables.date,
    time: req.body.tables.time,
    guestId: req.body.guestId,
    id: latest ? latest.id + 1 : 1000,
  }).save();

  res.send({
    success: true,
  });
});

router.post("/guest", async (req, res) => {
  let guestId;
  const registered = await GuestModel.findOne({
    email: req.body.email,
  });

  if (registered) {
    guestId = registered.id;

    new GuestModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phonenr: req.body.phonenr,
      id: registered.id,
    }).save();
  } else {
    const latest = await GuestModel.findOne().sort({
      id: -1,
    });

    if (latest) guestId = latest.id + 1;
    else guestId = 1000;

    new GuestModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phonenr: req.body.phonenr,
      id: guestId,
    }).save();
  }

  res.send({
    guestId,
  });
});

router.post("/deleteall", async (req, res) => {
  await BookingModel.deleteMany({});
  await GuestModel.deleteMany({});
});

router.post("/availability", async (req, res) => {
  BookingModel.find({
    date: req.body.date,
    time: req.body.time,
  }).then((bookingsFound) => {
    let extra = 0;
    let othersuccess;
    bookingsFound.forEach((booking) => {
      if (booking.count > 6) extra++;
    });
    if (bookingsFound.length + extra >= 15) {
      console.log(req.body.time == 21 ? 18 : 21);
      BookingModel.find({
        date: req.body.date,
        time: req.body.time == 21 ? 18 : 21,
      }).then((othertime) => {
        let extra = 0;
        console.log(othertime);
        othertime.forEach((booking) => {
          if (booking.count > 6) extra++;
        });
        if (othertime.length + extra >= 15) {
          othersuccess = false;
        } else {
          othersuccess = true;
        }
      });
      res.send({
        success: false,
        othersuccess: othersuccess,
      });
    } else {
      res.send({
        success: true,
        othersuccess: othersuccess,
      });
    }
  });
  //res.send({available: available})
});

module.exports = router;
