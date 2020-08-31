const mongoose = require("mongoose");

let Schema = mongoose.Schema;

const BookingSchema = new Schema({
  count: Number,
  date: Date,
  time: Number,
  guestId: Number,
  id: Number,
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
