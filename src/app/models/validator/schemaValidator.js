const validate = require("mongoose-validator");

const schemaValidator = {
  nameValidator: [
    validate({
      validator: "isLength",
      arguments: [4, 50],
      message: "Should be between {ARGS[0]} and {ARGS[1]} characters"
    }),
    validate({
      validator: "matches",
      arguments: /^[-\w\s]+$/,
      passIfEmpty: true,
      message: "Should contain alpha-numeric characters only"
    })
  ],
  emailValidator: [
    validate({
      validator: "isEmail",
      message: "Entered Email is not valid"
    }),
    validate({
      validator: "normalizeEmail"
    })
  ],
  passwordValidator: [
    validate({
      validator: "isLength",
      arguments: [6, 20],
      message: "Should be between {ARGS[0]} and {ARGS[1]} characters"
    }),
    validate({
      validator: "isAlphanumeric",
      message: "Should contain alpha-numeric characters only"
    })
  ],
  postalCodeValidator: [
    validate({
      validator: "isPostalCode",
      arguments: "any",
      message: "Entered Postal Code is not a valid"
    })
  ],
  /*phoneNumberValidator: [
    validate({
      validator: 'isMobilePhone',
      arguments: 'any',
      message: 'Entered Phone Number is not a valid',
    }),
  ],*/
  isAlphaNumericValidator: [
    validate({
      validator: "matches",
      arguments: /^[-\w\s]+$/,
      message: "Should contain alpha-numeric characters only"
    })
  ]
};

module.exports = schemaValidator;
