const env = require("dotenv").config();

//const fcmConfig = {
//  FCM_SERVER_KEY: process.env.FCM_SERVER_KEY,
//};

//module.exports = fcmConfig;

const NodeGeocoder = require("node-geocoder");

const geocoderConfig = {
  provider: "mapquest",

  // Optional depending on the providers
  httpAdapter: "https", // Default
  apiKey: process.env.GEOCODER_SERVER_KEY, // for Google Premier
  formatter: null // 'gpx', 'string', ...
};

module.exports = geocoderConfig;
