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

app.set("view engine", "ejs");

app.use(main);

app.use(
  "/api",
  proxy({
    target: "http://localhost:8000",
    changeOrigin: true,
  })
);

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
