  const express = require("express");
  const router = express.Router();

  const BookingModel = require('../models/booking')
  const GuestModel = require('../models/guest');

  router.get('/', (req, res) => {
    res.render("index")

  })

  router.post('/', async (req, res) => {
      //   const guest = await GuestModel.findOne({
      //       email: req.body.email
      //   });

      new GuestModel({
          firstname: "Chabbe",
          lastname: "Chabbsson",
          email: "bigdick@email.se",
          phoneNr: 590195313,
          id: 1999
      }).save()
      res.send("/")
  });

  module.exports = router;