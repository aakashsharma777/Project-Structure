const env = require("dotenv").config();

const fcmConfig = {
  FCM_SERVER_KEY: process.env.FCM_SERVER_KEY
};

module.exports = fcmConfig;
