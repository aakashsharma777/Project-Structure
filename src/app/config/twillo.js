const env = require("dotenv").config();

const twilloConfig = {
  TWILLO_SID: process.env.TWILLO_SID,
  TWILLO_TOKEN: process.env.TWILLO_TOKEN,
  TWILLO_NUMBER: process.env.TWILLO_NUMBER
};

module.exports = twilloConfig;
