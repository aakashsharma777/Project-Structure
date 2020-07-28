const jsonwebtoken = require("jsonwebtoken");
const { config } = require("../config");
const { response } = require("../lang");

const jwt = {
  issueJWT: async user => {
    /* if(user.loginType == 2){
         var payload = {
            email: user.email,
            status: user.status,
            loginType: user.loginType,
            userId:user.userId
         };
      }else if(user.loginType == 1){
         var payload = {
            phoneNumber: user.phoneNumber,
            status: user.status,
            loginType: user.loginType,
            userId:user.userId
         };
      }else if(user.loginType == 3){
         var payload = {
            fbId: user.fbId,
            status: user.status,
            loginType: user.loginType,
            userId:user.userId
         };
      }else if(user.loginType == 4){
         var payload = {
            email: user.email,
            status: user.status,
            loginType: user.loginType,
            userId:user.userId
         };
      } */
    //console.log(payload)

    let payload = {
      phoneNumber: user.phoneNumber,
      email: user.email,
      status: user.status,
      role: user.role,
      userId: user.userId
    };
    const options = {
      expiresIn: config.JWT_EXPIRY
    };
    console.log("options ", options);
    const jwtToken = await jsonwebtoken.sign(payload, config.JWT_KEY, options);
    return jwtToken;
  },

  /* verifyJWT: async bearer => { 
    //const token = bearer.split(' ')[1];
    const token = bearer;
    
    const verify = await jsonwebtoken.verify(token, config.JWT_KEY);
    return verify;
  }, */

  verifyTokenFn: async (req, res, next) => {
    let token = req["headers"]["authorization"];
    await jsonwebtoken.verify(token, config.JWT_KEY, function(err, decoded) {
      if (err) {
        res.status(400).send({
          status: response.message.error.status,
          statusCode: response.message.error.statusCode,
          message: response.message.error.tokenError
        });
      } else {
        req["headers"]["userId"] = decoded["userId"];
        next();
      }
    });
  }
};

module.exports = jwt;
