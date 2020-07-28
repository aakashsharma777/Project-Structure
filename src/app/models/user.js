const mongoose = require("mongoose");
const schemaValidator = require("./validator/schemaValidator");
const Mixed = mongoose.Schema.Types.Mixed;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: false
    },
    phoneNumber: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: false
    },
    otp: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    loginType: {
      type: Number,
      required: true
    },
    userType: {
      type: Number,
      required: false //change true to false
    },
    role: {
      type: Number,
      required: false
    },
    deviceToken: {
      type: String,
      required: false
    },
    socialId: {
      type: String,
      required: false
    },
    roleId: {
      type: String,
      required: false
    },
    status: {
      type: Number,
      default: 1
    },
    isDeleted: {
      type: Number,
      default: 0
    },
    image: {
      type: String,
      required: false
    },
    kd: {
      type: Number,
      default: 0
    },
    kwd: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);
module.exports = userSchema;
