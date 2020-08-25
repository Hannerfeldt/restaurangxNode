const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config/config");
const main = require("./router/main");

app.use(
  express.urlencoded({
    extended: true,
  })
);


app.use(main);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const PORT = process.env.PORT || 8000;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

mongoose.connect(config.databaseURL, options).then(() => {
  console.log("Server is hosted on port " + PORT);
  app.listen(PORT);
});

module.exports = app;