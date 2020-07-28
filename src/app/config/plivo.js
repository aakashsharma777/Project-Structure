const env = require("dotenv").config();

const plivoConfig = {
  PLIVO_AUTH_ID: process.env.PLIVO_AUTH_ID,
  PLIVO_TOKEN: process.env.PLIVO_TOKEN,
  PLIVO_NUMBER: process.env.PLIVO_NUMBER
};

module.exports = plivoConfig;
