const config = require("./env");
const twilloConfig = require("./twillo");
const plivoConfig = require("./plivo");
const fcmConfig = require("./fcm");
const geocoderConfig = require("./geocoder");
const validationRegex = require("./validationRegex");

module.exports = {
  config,
  validationRegex,
  twilloConfig,
  plivoConfig,
  fcmConfig,
  geocoderConfig
};
