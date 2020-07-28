const Model = require("../models");
const { jwt, bcryptSalt, arrayFunctions, custom } = require("../helpers");
const { response } = require("../lang");
const { validationRegex } = require("../config");
const bcrypt = require("bcrypt");

/**destructing model schema  */
const { UserModel } = Model;

module.exports = {
  adminLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const hashPassword = await arrayFunctions.hashPassword(
        password,
        bcryptSalt
      );
      const findObject = {
        email: email
      };
      const result = await custom.findOneObject(UserModel, findObject);
      if (result && result.password != "") {
        const comparePassword = await arrayFunctions.comparePassword(
          password,
          result.password
        );
        if (comparePassword == true) {
          const payload = {
            email: result.email,
            status: 1,
            userId: result._id
          };
          const token = await jwt.issueJWT(payload);
          res.status(200).send({
            status: response.message.success.status,
            statusCode: response.message.success.statusCode,
            message: "Admin logged in successfully",
            token: token,
            userData: result
          });
        } else {
          res.status(200).send({
            status: response.message.error.status,
            statusCode: response.message.error.statusCode,
            message: "Email does not exist"
          });
        }
      } else {
        res.status(200).send({
          status: response.message.error.status,
          statusCode: response.message.error.statusCode,
          message: "Email does not exist in record"
        });
      }
    } catch (error) {
      res.status(400).send({
        status: response.message.error.status,
        statusCode: response.message.error.statusCode,
        message: error.message
      });
    }
  },

  adminAddStaff: async (req, res) => {
    try {
      const { _id, name, email, password, role } = req.body;
      console.log("req.body ", req.body);
      if (_id) {
        const findObject = {
          _id: _id
        };
        const setObject = {
          $set: {
            name: name,
            email: email,
            roleId: role
          }
        };
        var dbSave = await custom.UpdateDocument(
          UserModel,
          findObject,
          setObject
        );
        var message = `Staff updated successfully.`;
      } else {
        const hashPassword = await arrayFunctions.hashPassword(
          password,
          bcryptSalt
        );
        const dbObject = {
          name: name,
          email: email,
          password: hashPassword,
          roleId: role,
          userType: 2,
          loginType: 5
        };

        var dbSave = await UserModel.create(dbObject);
        var message = `Staff added successfully.`;
      }
      if (dbSave) {
        res.status(200).send({
          status: response.message.success.status,
          statusCode: response.message.success.statusCode,
          message: message
        });
      } else {
        res.status(200).send({
          status: response.message.error.status,
          statusCode: response.message.error.statusCode,
          message: "Error in adding page."
        });
      }
    } catch (error) {
      res.status(400).send({
        status: response.message.error.status,
        statusCode: response.message.error.statusCode,
        message: error.message
      });
    }
  },

  getStaff: async (req, res) => {
    console.log("aaaaaaaaaaaaaaaaa");
    try {
      const findObject = {
        isDeleted: 0,
        userType: 2
      };
      const getList = await custom.findListObject(UserModel, findObject);
      console.log("getList ", getList);
      if (getList) {
        res.status(200).send({
          status: response.message.success.status,
          statusCode: response.message.success.statusCode,
          message: `Modules listed successfully.`,
          data: getList
        });
      } else {
        res.status(200).send({
          status: response.message.error.status,
          statusCode: response.message.error.statusCode,
          message: "Error in listing Modules."
        });
      }
    } catch (error) {
      res.status(400).send({
        status: response.message.error.status,
        statusCode: response.message.error.statusCode,
        message: error.message
      });
    }
  },

  adminDeleteStaff: async (req, res) => {
    try {
      console.log("yyyyyyyyyyyyyyyyyyyyyy");
      const findObject = {
        _id: req.headers["staffid"]
      };
      const setObject = {
        $set: {
          isDeleted: 1
        }
      };
      const updateDeleteStatus = await custom.UpdateDocument(
        UserModel,
        findObject,
        setObject
      );
      if (updateDeleteStatus) {
        res.status(200).send({
          status: response.message.success.status,
          statusCode: response.message.success.statusCode,
          message: `Staff deleted successfully.`
        });
      } else {
        res.status(200).send({
          status: response.message.error.status,
          statusCode: response.message.error.statusCode,
          message: "Error in deleting staff."
        });
      }
    } catch (error) {
      res.status(400).send({
        status: response.message.error.status,
        statusCode: response.message.error.statusCode,
        message: error.message
      });
    }
  },

  adminChangeStaffStatus: async (req, res) => {
    try {
      console.log(req.headers["status"])
      if (req.headers["status"] == 0) {
        var status = 1;
      } else {
        var status = 0;
      }
      const findObject = {
        _id: req.headers["staffid"],
        status: req.headers["status"]
      };
      const setObject = {
        $set: {
          status: status
        }
      };
      const updateStatus = await custom.UpdateDocument(
        UserModel,
        findObject,
        setObject
      );
      if (updateStatus) {
        res.status(200).send({
          status: response.message.success.status,
          statusCode: response.message.success.statusCode,
          message: `Staff status updated successfully.`
        });
      } else {
        res.status(200).send({
          status: response.message.error.status,
          statusCode: response.message.error.statusCode,
          message: "Error in updating  status."
        });
      }
    } catch (error) {
      res.status(400).send({
        status: response.message.error.status,
        statusCode: response.message.error.statusCode,
        message: error.message
      });
    }
  },

  getStaffById: async (req, res) => {
    try {
      const findObject = {
        _id: req.headers["staffid"]
      };
      const staffData = await custom.findOneObject(UserModel, findObject);
      if (staffData) {
        res.status(200).send({
          status: response.message.success.status,
          statusCode: response.message.success.statusCode,
          message: `Staff listed successfully.`,
          data: staffData
        });
      } else {
        res.status(200).send({
          status: response.message.error.status,
          statusCode: response.message.error.statusCode,
          message: "Error in listing staff."
        });
      }
    } catch (error) {
      res.status(400).send({
        status: response.message.error.status,
        statusCode: response.message.error.statusCode,
        message: error.message
      });
    }
  }
};
