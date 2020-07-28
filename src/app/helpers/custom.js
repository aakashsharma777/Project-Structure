const Model = require("../models");
const { UserModel } = Model;
const ObjectId = require("mongodb").ObjectID;
const { response } = require("../lang");

const custom = {
  /**
   * check user exist already or not in the user model
   * modelName relates to any model you can pass.
   * @findObject means object that we can pass it.
   */
  /* userExistCb: async (modelName, findObject) => {
		const valueExist = await modelName.findOne(findObject);
		//return valueExist;
		if (valueExist) {
			console.log('valueExist ',valueExist)
			//return '1';
			if(valueExist.status  == 0){
				return {'message':'User Deactive','value':0,'data':valueExist};
			}else if(valueExist.status  == 1){
				return {'message':'user exist','value':1,'data':valueExist};
			}else if(valueExist.status  == 2){
				let d = new Date(valueExist.suspendDate),
        			month = '' + (d.getMonth() + 1),
        			day = '' + d.getDate(),
        			year = d.getFullYear();
				if (month.length < 2) 
        			month = '0' + month;
    			if (day.length < 2) 
        			day = '0' + day;
				let suspendedDate = [year, month, day].join('-');
				return {'message':'User Suspended by Admin from '+suspendedDate+' for '+valueExist.suspendDays+' Days','value':2,'data':valueExist};
			}else if(valueExist.status  == 3){
				return {'message':'User Account Deactived By Admin','value':3,'data':valueExist};
			}
		} else {
			return {'message':'user does not exist','value':4,'data':valueExist};
		}
	}, */

  /* findUserWithPets: async (modelName,userId) => {
		const ObjectId = require('mongodb').ObjectID;
		let result = await modelName.aggregate([
			{ 
				"$lookup": {
					"from": "pets",
					let: { 'u_id': '$_id' },
					"pipeline":[
						{$match:{"$expr":{"$eq":["$userId",'$$u_id']}}},
						{$match:{"$expr":{"$eq":["$isDeleted",0]}}},
					],
					"as": "pets"
				}
			},
			{
				$match: {
					'_id': {$eq: ObjectId(userId)},
				}
			},
		]);
		return result[0];
	}, */

  /**
   * @async function
   * update document common function
   * @findObject used for find condition
   * @setObject used for update particular objects fields
   */
  UpdateDocument: async (modelName, findObject, setObject) => {
    const updateRecord = await modelName.updateOne(findObject, setObject);
    return updateRecord;
  },
  /**
   * @async function for find & update document
   * @findObject for find condition
   * @setObject for set or update object fields
   */
  findUpdateDocument: async (modelName, findObject, setObject) => {
    const findUpdateRecord = await modelName.findOneAndUpdate(
      findObject,
      setObject
    );
    return findUpdateRecord;
  },
  /**
   * @async function for find and return object
   * @findObject for find condition
   */
  findOneObject: async (modelName, findObject) => {
    console
    const data = await modelName.findOne(findObject);
    return data;
  },
  /**
   * @async function for find list and return object
   * @findObject for find condition
   */
  findListObject: async (modelName, findObject) => {
    console.log("jjjjjjjjjjjj", modelName);
    const data = await modelName.find(findObject).sort({ createdAt: -1 });
    return data;
  },
  findListDealsObject: async (modelName, findObject) => {
    const data = await modelName.find(findObject).sort({ dealOrder: 1 });
    return data;
  },
  /**
   * @async function for create the object in db and return object
   * @createObject for populating data in the document.
   */
  createOneObject: async (modelName, createObject) => {
    const data = await modelName.create(createObject);
    return data;
  },
  findMatchedProfiles: async (modelName, findObject) => {
    console.log(findObject);
    const data = await modelName.find(findObject).limit(10);
    return data;
  },
  findListMessages: async (modelName, findObject) => {
    const data = await modelName.find(findObject);
    return data;
  },
  findCountObject: async (modelName, findObject) => {
    const data = await modelName.find(findObject).count();
    return data;
  },
  RemoveDocument: async (modelName, findObject) => {
    const findR = await modelName.findOne(findObject);
    const updateRecord = await modelName.deleteMany({ _id: findR._id });
    return updateRecord;
  },

  findCatObject: async (modelName, findObject) => {
    console.log("childddddddddddd");
    const data = await modelName.find(findObject);
    console.log("dataaaaaaaaa ", data);
    return data;
  },

  findCatChildObject: async (modelName, findObject) => {
    console.log("childddddddddddd");
    console.log("findObject ", findObject);
    const data = await modelName.findOne(findObject);
    console.log("dataaaaaaaaa ", data);
    return data;
  },

  //db.categories.findOne( { _id: "Databases" } ).children

  checkUserStatus: async (req, res, next) => {
    let findObject = {
      _id: ObjectId(req["headers"]["userId"]),
      isDeleted: 0
    };
    const userExist = await UserModel.findOne(findObject);
    if (userExist) {
      if (userExist.status == 0) {
        res.status(400).send({
          status: response.message.error.status,
          statusCode: response.message.error.statusCode,
          message: response.message.error.UserDeactive
        });
      } else if (userExist.status == 1) {
        req.user = userExist;
        next();
      }
    } else {
      res.status(400).send({
        status: response.message.error.status,
        statusCode: response.message.error.statusCode,
        message: response.message.error.UserEmptyError
      });
    }
  }

  /* sendSuccessResponse: async (req, res, next) => { 
		if(res.messageType == 'success'){
			res.status(200).send({
				status: response.message.success.status,
				statusCode: response.message.success.statusCode,
				message:res.message,
			}); 
		}else{
			next()
		}
	}, */
  /* sendFailureResponse: async (req, res, next) => { 
		res.status(200).send({
			status: response.message.error.status,
			statusCode: response.message.error.statusCode,
			message:res.message,
		}); 
	}, */
};

module.exports = custom;
