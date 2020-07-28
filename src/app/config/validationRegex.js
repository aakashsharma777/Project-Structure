/* eslint-disable */
const validationRegex = {
  // regexformatphone: /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g,
  regexformatphone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
  phoneNumberRegex: /^\+?\d{12}$/,
  regexformatname: /^[a-zA-Z ]+$/
};
module.exports = validationRegex;
