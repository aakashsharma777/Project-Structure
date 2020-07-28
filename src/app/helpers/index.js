const jwt = require("./jwt");
const arrayFunctions = require("./arrayFunction");
const custom = require("./custom");
const bcryptSalt = require("./bcryptSalt");
const twilloCustom = require("./twilloCustom");
const nodemailerCustom = require("./nodemailer");
/*const plivoCustom = require('./plivoCustom');
const fcmCustom = require('./fcmCustom');

const sockets = require('./socket');
 */
module.exports = {
  jwt,
  arrayFunctions,
  custom,
  bcryptSalt,
  twilloCustom,
  nodemailerCustom
  /*plivoCustom,
  fcmCustom,
  
  
  
  sockets,
 */
};
