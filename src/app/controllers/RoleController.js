const Model = require("../models");
const { jwt, bcryptSalt, arrayFunctions, custom } = require("../helpers");
const { response } = require("../lang");
const { validationRegex } = require("../config");
const bcrypt = require("bcrypt");

/**destructing model schema  */
const { RoleModel } = Model;

module.exports = {
  /**
   * User profile update
   */
  adminAddRole: async (req, res) => {
    try {
      const { _id, rolename, roledesc, modules } = req.body;
      if (_id) {
        const findObject = {
          _id: _id
        };
        const setObject = {
          $set: {
            rolename: rolename,
            roledesc: roledesc,
            modules: modules
          }
        };
        var dbSave = await custom.UpdateDocument(
          RoleModel,
          findObject,
          setObject
        );
        var message = `Role updated successfully.`;
      } else {
        const dbObject = {
          rolename: rolename,
          roledesc: roledesc,
          modules: modules
        };
        var dbSave = await RoleModel.create(dbObject);
        var message = `Role added successfully.`;
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

  getRoles: async (req, res) => {
    console.log("hhhhhhhhhhhhh");
    try {
      const findObject = {
        isDeleted: 0
      };
      const getList = await custom.findListObject(RoleModel, findObject);
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
  adminDeleteRole: async (req, res) => {
    try {
      console.log("yyyyyyyyyyyyyyyyyyyyyy");
      const findObject = {
        _id: req.headers["roleid"]
      };
      const setObject = {
        $set: {
          isDeleted: 1
        }
      };
      const updateDeleteStatus = await custom.UpdateDocument(
        RoleModel,
        findObject,
        setObject
      );
      if (updateDeleteStatus) {
        res.status(200).send({
          status: response.message.success.status,
          statusCode: response.message.success.statusCode,
          message: `Role deleted successfully.`
        });
      } else {
        res.status(200).send({
          status: response.message.error.status,
          statusCode: response.message.error.statusCode,
          message: "Error in deleting role."
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
  adminChangeStatus: async (req, res) => {
    try {
      if (req.headers["status"] == 0) {
        var status = 1;
      } else {
        var status = 0;
      }
      const findObject = {
        _id: req.headers["roleid"],
        status: req.headers["status"]
      };
      const setObject = {
        $set: {
          status: status
        }
      };
      const updateStatus = await custom.UpdateDocument(
        RoleModel,
        findObject,
        setObject
      );
      if (updateStatus) {
        res.status(200).send({
          status: response.message.success.status,
          statusCode: response.message.success.statusCode,
          message: `Page status updated successfully.`
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
  getRoleById: async (req, res) => {
    try {
      const findObject = {
        _id: req.headers["roleid"]
      };
      const roleData = await custom.findOneObject(RoleModel, findObject);
      if (roleData) {
        res.status(200).send({
          status: response.message.success.status,
          statusCode: response.message.success.statusCode,
          message: `Role listed successfully.`,
          data: roleData
        });
      } else {
        res.status(200).send({
          status: response.message.error.status,
          statusCode: response.message.error.statusCode,
          message: "Error in listing role."
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
