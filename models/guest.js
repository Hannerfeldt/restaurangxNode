const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const GuestSchema = new Schema({

    firstname: String,
    lastname: String,
    email: String,
    phoneNr: Number,
    id: Number

});

const Guest = mongoose.model("Guest", GuestSchema);

module.exports = Guest;