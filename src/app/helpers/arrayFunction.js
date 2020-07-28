const bcrypt = require("bcrypt");
const arrayFunction = {
  hashPassword: async (password, bcryptSalt) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, bcryptSalt, function(err, hash) {
        resolve(hash);
      });
    });
  },
  comparePassword: async (password, hash) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, function(err, res) {
        resolve(res);
      });
    });
  }

  /* getUnique: async (arr, comp) => { //console.log(comp)
    return new Promise((resolve, reject) => {
      const unique = arr
        .map(e => e[comp])
      // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
        .filter(e => arr[e])
        .map(e => arr[e]);
      resolve(unique);
    });
  }, */
  /* dateString: (date = null) => {
    const currentDate = new Date(date);
    const dates = currentDate.getDate();
    const month = currentDate.getMonth(); //Be careful! January is 0 not 1
    const year = currentDate.getFullYear();
    const String = month + 1 + '-' + year;
    return String;
  }, */
  /* dateFunction: (date = null) => {
    const currentDate = new Date(date);
    const dates = currentDate.getDate();
    const month = currentDate.getMonth() + 1; //Be careful! January is 0 not 1
    const year = currentDate.getFullYear();
    const String = dates;
    return String;
  }, */
  /* fullDate: (date = null) => {
    const currentDate = new Date(date);
    const dates = currentDate.getDate();
    const month = currentDate.getMonth() + 1; //Be careful! January is 0 not 1
    const year = currentDate.getFullYear();
    const String = year + '-' + month + '-' + dates;
    return String;
  }, */
  /* currentDate: () => {
    const currentDate = new Date();
    const dates = currentDate.getDate();
    const month = currentDate.getMonth() + 1; //Be careful! January is 0 not 1
    const year = currentDate.getFullYear();
    const String = year+'-'+ ('0' + month).slice(-2) +'-'+('0' + dates).slice(-2);
    return String;
  }, */
  /* tranCountByDesc: (data, prop) => {
  return data
    .reduce((res, item) => Object
      .assign(res, {
        [item[prop]]: 1 + (res[item[prop]] || 0)
      }), Object.create(null));
  }, */
};

module.exports = arrayFunction;
