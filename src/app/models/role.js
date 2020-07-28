const mongoose = require("mongoose");
const schemaValidator = require("./validator/schemaValidator");
const Mixed = mongoose.Schema.Types.Mixed;

const roleSchema = new mongoose.Schema(
  {
    rolename: {
      type: String,
      required: false
    },
    roledesc: {
      type: String,
      required: false
    },
    modules: {
      type: Array,
      required: false
    },
    status: {
      type: Number,
      default: 1
    },
    isDeleted: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);
module.exports = roleSchema;
