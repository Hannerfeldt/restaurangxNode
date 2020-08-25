const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config/config");
const main = require("./router/main");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors())

app.use(bodyParser.json());

app.set("view engine", "ejs");

app.use(main);

const PORT = process.env.PORT || 8000;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose.connect(config.databaseURL, options).then(() => {
  console.log("Server is hosted on port " + PORT);
  app.listen(PORT);
});

module.exports = app;
