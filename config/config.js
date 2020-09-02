if (process.env.NODE_ENV !== "production") require("dotenv").config();

const config = {
  databaseURL: process.env.DATABASE,
  email: process.env.email,
  password: process.env.password,
};

module.exports = config;
