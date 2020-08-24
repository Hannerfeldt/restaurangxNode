const mongoose = require("mongoose");

let Schema = mongoose.Schema;

const BookingSchema = new Schema({
  amount: Number,
  date: Date,
  time: String,
  guestId: String,
  id: Number,
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
