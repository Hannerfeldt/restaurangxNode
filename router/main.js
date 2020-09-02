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

  let tables = Math.ceil(req.body.tables.count / 6);

  new BookingModel({
    count: req.body.tables.count,
    date: req.body.tables.date,
    time: req.body.tables.time,
    table: tables,
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
  if (!registered) {
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
  } else guestId = registered.id;

  res.send({
    guestId,
  });
});

router.delete("/unbook/:id", async (req, res) => {
  await BookingModel.deleteOne({
    id: req.params.id,
  });

  res.send();
});

router.put("/edit/:id", async (req, res) => {
  await BookingModel.updateOne(
    {
      id: req.params.id,
    },
    {
      date: req.body.date,
      time: req.body.time,
      count: req.body.count,
    }
  );

  res.send();
});

router.post("/deleteall", async (req, res) => {
  await BookingModel.deleteMany({});
  await GuestModel.deleteMany({});
});

let othersuccess;

router.post("/availability", async (req, res) => {
  BookingModel.find({
    date: req.body.date,
    time: req.body.time,
  }).then((bookingsFound) => {
    let tables = 0;

    bookingsFound.forEach((booking) => {
      tables += Math.ceil(booking.count / 6);
    });

    if (tables + Math.ceil(req.body.count / 6) > 15) {
      BookingModel.find({
        date: req.body.date,
        time: req.body.time == 21 ? 18 : 21,
      }).then((othertime) => {
        let tables = 0;
        othertime.forEach((booking) => {
          tables += booking.table;
        });

        if (tables >= 15) {
          othersuccess = false;
        } else {
          othersuccess = true;
        }
      });

      res.send({
        success: false,
        othersuccess,
      });
    } else {
      res.send({
        success: true,
        othersuccess,
      });
    }
  });
});

router.post("/filter", async (req, res) => {

  if (req.body.date) {

    const dateFound = await BookingModel.find({
      date: req.body.date,
    });
    res.send(dateFound)
  } else {
    const guestIdFound = await BookingModel.find({
      guestId: req.body.data  
    })
    
    res.send(guestIdFound)
  }
});

router.post("/findname", async (req, res)=> {
  
  const guestFound = await GuestModel.findOne({
    firstname: req.body.filterName.firstname,
    lastname: req.body.filterName.lastname
  })

  res.send(guestFound)
})

module.exports = router;
