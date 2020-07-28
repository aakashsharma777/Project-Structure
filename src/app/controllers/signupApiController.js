const { parsePhoneNumberFromString } = require("libphonenumber-js");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const fs = require("fs");
//const validatePhoneNumber = require("validate-phone-number-node-js");
//const formidable = require('formidable');
const Model = require("../models");
const path = require("path");
const {
  custom,
  twilloCustom,
  jwt,
  bcryptSalt,
  arrayFunctions,
  nodemailerCustom
} = require("../helpers");
const { response } = require("../lang");
const { config, validationRegex } = require("../config");
const { UserModel } = Model;
//const moment = require('moment');
//const moment = require('moment-timezone');

module.exports = {
  /**
   * Sms Authenication api for signup user
   * @route POST /signup
   * @group Signup
   * @param {string} phoneNumber.required eg: +917986403179
   * @param {string} email.required eg: shiv@gmail.com
   * @param {string} password.required eg: 123456
   * @returns {object} 200 - success
   */
  signup: async (req, res) => {
    try {
      const { phoneNumber, email, password } = req.body;
      let findPhone = {
        phoneNumber: phoneNumber,
        isDeleted: 0
      };     
      let findUserPhone = await custom.findOneObject(UserModel, findPhone);     
      if (findUserPhone == null) {
        let findEmail = {
          email: email,
          isDeleted: 0
        }; 
        let findUserEmail = await custom.findOneObject(UserModel, findEmail);         
        if (findUserEmail == null) {
          let findObject = {
            phoneNumber: phoneNumber,
            email: email,
            isDeleted: 0
          };
          let findUser = await custom.findOneObject(UserModel, findObject);
          if (findUser == null) {
            let otp = Math.floor(1000 + Math.random() * 9000);
            let sendSms = await twilloCustom.smsTwillo(phoneNumber, otp);          
            const hashPassword = await arrayFunctions.hashPassword(
              password,
              bcryptSalt
            );
            if (sendSms) {
              let dbObject = {
                phoneNumber: phoneNumber,
                email: email,
                password: hashPassword,
                otp: otp,
                loginType: 1,
                userType: 1,
                role: 3
              };
              let dbSave = await UserModel.create(dbObject);             
              if (dbSave) {
                res.status(200).send({
                  status: response.message.success.status,
                  statusCode: response.message.success.statusCode,
                  message: `We sent a code to ${phoneNumber} to verify your phone number.`
                });
              } else {
                res.status(400).send({
                  status: response.message.error.statusCode,
                  statusCode: response.message.error.statusCode,
                  message: response.message.error.messageError
                });
              }
            } else {
              res.status(400).send({
                status: response.message.error.statusCode,
                statusCode: response.message.error.statusCode,
                message: "Error in sending SMS please recheck your number."
              });
            }
          } else {
            res.status(400).send({
              status: response.message.error.statusCode,
              statusCode: response.message.error.statusCode,
              message: "User already exist."
            });
          }
        } else {
          res.status(400).send({
            status: response.message.error.statusCode,
            statusCode: response.message.error.statusCode,
            message: "Email already exist."
          });
        }
      } else {
        res.status(400).send({
          status: response.message.error.statusCode,
          statusCode: response.message.error.statusCode,
          message: "Phone Number already exist."
        });
      }
    } catch (error) {
      res.status(400).send({
        status: response.message.error.messageError,
        statusCode: response.message.error.statusCode,
        message: response.message.error.messageError
      });
    }
  },

  /**
   * confirm the phone otp sms from user
   * @route POST /confirmPhoneOtp
   * @group Signup
   * @param {string} phoneNumber.required eg: +917986403179
   * @param {string} otp.required
   * @param {string} deviceToken.required
   * @returns {object} 200 - success
   */
  confirmPhoneOtp: async (req, res) => {
    try {
      const { phoneNumber, otp, deviceToken } = req.body;
      let findObject = {
        phoneNumber: phoneNumber,
        otp: otp,
        role: 3,
        isDeleted: 0
      };
      let findUser = await custom.findOneObject(UserModel, findObject);
      if (findUser) {
        let issueToken = {
          phoneNumber: phoneNumber,
          email: findUser.email,
          status: 1,
          role: 3,
          userId: findUser._id
        };
        let token = await jwt.issueJWT(issueToken);
        let setObject = {
          $set: {
            status: 1,
            deviceToken: deviceToken
          }
        };
        let activateUser = await custom.UpdateDocument(
          UserModel,
          findObject,
          setObject
        );
        if (activateUser) {
          res.status(200).send({
            status: response.message.success.status,
            statusCode: response.message.success.statusCode,
            message: response.confirmMessage.success.message,
            data: {
              userId: findUser._id,
              token: token,
              findUser
            }
          });
        }
      } else {
        res.status(400).send({
          status: response.message.error.status,
          statusCode: response.message.error.statusCode,
          message: response.message.error.WrongOtpError
        });
      }
    } catch (error) {
      res.status(400).send({
        status: response.message.error.status,
        statusCode: response.message.error.statusCode,
        message: response.message.error.messageError
      });
    }
  },

  /**
   * confirm the phone otp sms from user
   * @route POST /login
   * @group Signup
   * @param {string} phoneNumber eg: +917986403179
   * @param {string} email eg: shiv@gmail.com
   * @param {string} password.required
   * @returns {object} 200 - success
   */
  login: async (req, res) => {
    try {
      const { email, phoneNumber, password, deviceToken } = req.body;
      if (phoneNumber) {
        var findObject = {
          phoneNumber: phoneNumber,
          isDeleted: 0
        };
      } else if (email) {
        console.log("uuuuu");
        var findObject = {
          email: email,
          isDeleted: 0
        };
      }
      let findUser = await custom.findOneObject(UserModel, findObject);
      if (findUser) {
        if (findUser.status == 1) {
          let compPassword = await arrayFunctions.comparePassword(
            password,
            findUser.password
          );
          if (compPassword == true) {
            let issueToken = {
              phoneNumber: findUser.phoneNumber,
              email: findUser.email,
              status: 1,
              role: 3,
              userId: findUser._id
            };
            let token = await jwt.issueJWT(issueToken);
            res.status(200).send({
              status: response.message.success.status,
              statusCode: response.message.success.statusCode,
              message: response.confirmMessage.success.message,
              data: {
                userId: findUser._id,
                token: token,
                findUser
              }
            });
          } else {
            res.status(400).send({
              status: response.message.error.status,
              statusCode: response.message.error.statusCode,
              message: "Wrong Password!!"
            });
          }
        } else {
          res.status(400).send({
            status: response.message.error.status,
            statusCode: response.message.error.statusCode,
            message: "User not Active!!"
          });
        }
      } else {
        res.status(400).send({
          status: response.message.error.status,
          statusCode: response.message.error.statusCode,
          message: "User Not Exist!!"
        });
      }
    } catch (error) {
      res.status(400).send({
        status: response.message.error.status,
        statusCode: response.message.error.statusCode,
        message: response.message.error.messageError
      });
    }
  },

  /**
   * Social signup profile of user
   * @route POST /socialSignup
   * @group Signup
   * @param {string} name eg: test
   * @param {string} socialId.required eg: yrhffhdjhkdjfhs
   * @param {string} email eg: test@gmail.com
   * @param {string} deviceToken.required
   * @param {string} loginType.required  eg: 2 for facebook, 3 for apple, 4 for google
   * @param {string} userType.required eg: 2FB/3 Google/4 Apple  //change by new team
   * @returns {object} 200 - success
   */
  socialSignup: async (req, res) => {
    try {
      const {
        name,
        socialId,
        email,
        deviceToken,
        loginType,
        userType
      } = req.body;
     
      //Add colum userType by new team
      let findObject = {
        socialId: socialId,
        loginType: loginType,
        isDeleted: 0
      };
      let findUser = await custom.findOneObject(UserModel, findObject);
      console.log("findUser ", findUser);
      if (findUser == null) {
        let dbObject = {
          socialId: socialId,
          email: email,
          loginType: loginType,
          name: name||"socialLogin",
          status: 1,
          userType: userType //Add by new team
        };
        const dbSave = await UserModel.create(dbObject);
        if (dbSave) {
          let findUserData = await custom.findOneObject(UserModel, findObject);
          console.log("findUserData ", findUserData);
          let issueToken = {
            socialId: socialId,
            status: 1,
            name: name||"socialLogin",
            loginType: loginType,
            userId: findUserData._id,
            userType: userType //Add by new team
          };
          let token = await jwt.issueJWT(issueToken);
          res.status(200).send({
            status: response.message.success.status,
            statusCode: response.message.success.statusCode,
            message: `user added`,
            token: token,
            findUserData
          });
        }
      } else {
        let issueToken = {
          socialId: socialId,
          status: 1,
          name: name||"socialLogin",
          loginType: loginType,
          userId: findUser._id,
          userType: userType //Add by new team
        };
        let token = await jwt.issueJWT(issueToken);
        res.status(200).send({
          status: response.message.success.status,
          statusCode: response.message.success.statusCode,
          message: `user added`,
          token: token,
          findUser
        });
      }
    } catch (error) {
      res.status(400).send({
        status: response.message.error.messageError,
        statusCode: response.message.error.statusCode,
        message: error.message
      });
    }
  },

  /**
   * Forgot Password by sending Email
   * @route POST /forgotPasswordWithEmail
   * @group Signup
   * @param {string} email.required eg: test@gmail.com
   * @returns {object} 200 - success
   */
  forgotPasswordWithEmail: async (req, res) => {
    try {
      const { email } = req.body;
      let findObject = {
        email: email,
        status: 1,
        isDeleted: 0,
        loginType: 1
      };
      let findUser = await custom.findOneObject(UserModel, findObject);
      if (findUser == null) {
        res.status(400).send({
          status: response.message.error.status,
          statusCode: response.message.error.statusCode,
          message: "user does not exist"
        });
      } else {
        let subject = "Forgot password Email";
        let newPassword = Math.floor(145000 + Math.random() * 98074700);
        let hashPassword = await arrayFunctions.hashPassword(
          newPassword.toString(),
          bcryptSalt
        );
        let content =
          "<p>Your new generated password is</p><b>" + newPassword + "</b>";
        let authMail = await nodemailerCustom.sendMail(email, subject, content);
        if (authMail) {
          let setObject = {
            $set: {
              password: hashPassword
            }
          };
          let result = await custom.UpdateDocument(
            UserModel,
            findObject,
            setObject
          );
          if (result) {
            res.status(200).send({
              status: response.message.success.status,
              statusCode: response.message.success.statusCode,
              message: `We have sent new password to ${email} .`
            });
          }
        }
      }
    } catch (error) {
      res.status(400).send({
        status: response.message.error.messageError,
        statusCode: response.message.error.statusCode,
        message: error.message
      });
    }
  },

  /**
   * Forgot Password by sending OTP
   * @route POST /forgotPassword
   * @group Signup
   * @param {string} phoneNumber.required eg: +919954574512
   * @returns {object} 200 - success
   */
  forgotPasswordWithOtp: async (req, res) => {
    try {
      const { phoneNumber } = req.body;
      let findObject = {
        phoneNumber: phoneNumber,
        status: 1,
        isDeleted: 0,
        loginType: 1
      };
      let findUser = await custom.findOneObject(UserModel, findObject);
      if (findUser == null) {
        res.status(400).send({
          status: response.message.error.status,
          statusCode: response.message.error.statusCode,
          message: "user does not exist"
        });
      } else {
        let otp = Math.floor(1000 + Math.random() * 9000);
        let sendSms = await twilloCustom.smsTwillo(phoneNumber, otp);
        if (sendSms) {
          let setObject = {
            $set: {
              otp: otp
            }
          };
          let result = await custom.UpdateDocument(
            UserModel,
            findObject,
            setObject
          );
          if (result) {
            res.status(200).send({
              status: response.message.success.status,
              statusCode: response.message.success.statusCode,
              message: `We sent a code to ${phoneNumber} to verify your phone number.`
            });
          }
        }
      }
    } catch (error) {
      res.status(400).send({
        status: response.message.error.messageError,
        statusCode: response.message.error.statusCode,
        message: error.message
      });
    }
  },

  /**
   * Reset User Password
   * @route POST /resetPassword
   * @group Signup
   * @param {string} phoneNumber.required eg: +917986403179
   * @param {string} password.required eg: 123456
   * @returns {object} 200 - success
   */
  resetPassword: async (req, res) => {
    try {
      const { phoneNumber, password } = req.body;
      const hashPassword = await arrayFunctions.hashPassword(
        password,
        bcryptSalt
      );
      let findObject = {
        phoneNumber: phoneNumber,
        status: 1,
        isDeleted: 0,
        loginType: 1
      };
      let setObject = {
        $set: {
          password: hashPassword
        }
      };
      let result = await custom.UpdateDocument(
        UserModel,
        findObject,
        setObject
      );
      if (result) {
        res.status(200).send({
          status: response.message.success.status,
          statusCode: response.message.success.statusCode,
          message: `Password Reset Successfully.`
        });
      } else {
        res.status(400).send({
          status: response.message.success.status,
          statusCode: response.message.success.statusCode,
          message: `Eroor in reseting password.`
        });
      }
    } catch (error) {
      res.status(400).send({
        status: response.message.error.messageError,
        statusCode: response.message.error.statusCode,
        message: response.message.error.messageError
      });
    }
  },

  updateUserProfile: async (req, res) => {
    try {
      var { id , name , phoneNumber , email , image } = req.body
      var dbUpdateUserProfile;
      var message;      
      var userCheckById = await UserModel.find({ _id :id })            
      if(image.length!=0){
        var path = await userCheckById.map((data)=>{var str = data.image;var res = str.slice(26); return res})                
        fs.unlink('uploads/'+path,async(err)=>{})      
      }
      if(userCheckById.length!=0){
          dbUpdateUserProfile = await UserModel.updateOne({ _id : id } , { $set : { name: name ,image : image } })     
          message="user Profile updated successfully"
      } else{
          message="user not exits"
      }       
      res.status(200).send({
        status: response.message.success.status,
        statusCode: response.message.success.statusCode,
        message: message,
        data :dbUpdateUserProfile           
      });
    } catch (error) {
      res.status(400).send({
        status: response.message.error.messageError,
        statusCode: response.message.error.statusCode,
        message: response.message.error.messageError
      });
    }
  },

  showProfileInformation : async (req, res) => {
    try {
      var { id } = req.body;
      dbShowProfileInformation = await UserModel.findOne({ $and:[ { _id: id } , { isDeleted : 0 } ] });            
      res.status(200).send({
          status: response.message.success.status,
          statusCode: response.message.success.statusCode,
          message: "successfully showProfileInformation",
          data: dbShowProfileInformation
      });
    } catch (error) {
      res.status(400).send({
          status: response.message.error.messageError,
          statusCode: response.message.error.statusCode,
          message: response.message.error.messageError
      });
    }
  },
};
