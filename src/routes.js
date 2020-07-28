const express = require('express');
const router = express.Router();
const controllers = require('./app/controllers');
const Model = require("./app/models");
const {custom, twilloCustom, jwt, bcryptSalt, arrayFunctions, nodemailerCustom} = require("./app/helpers");
//const { StaticPagesModel } = Model;

//     ____              __
//    / __ \____  __  __/ /____  _____
//   / /_/ / __ \/ / / / __/ _ \/ ___/
//  / _, _/ /_/ / /_/ / /_/  __(__  )
// /_/ |_|\____/\__,_/\__/\___/____/

/******* API ROUTES START ********/
router
   .post(
      '/signup', 
      controllers.signupApiController.signup
   )
   .post(
      '/confirmPhoneOtp', 
      controllers.signupApiController.confirmPhoneOtp
   )
   .post(
      '/login', 
      //jwt.verifyTokenFn,
      //custom.checkUserStatus,
      controllers.signupApiController.login
   )
   .post(
      '/socialSignup', 
      //jwt.verifyTokenFn,
      //custom.checkUserStatus,
      controllers.signupApiController.socialSignup
   )
   .post(
      '/forgotPasswordWithEmail', 
      //jwt.verifyTokenFn,
      //custom.checkUserStatus,
      controllers.signupApiController.forgotPasswordWithEmail
   )
   .post(
      '/forgotPassword', 
      //jwt.verifyTokenFn,
      //custom.checkUserStatus,
      controllers.signupApiController.forgotPasswordWithOtp
   )
   .post(
      '/resetPassword', 
      //jwt.verifyTokenFn,
      //custom.checkUserStatus,
      controllers.signupApiController.resetPassword
   )
   
   .post(
      '/getSubCategoriesByCatId', 
      //jwt.verifyTokenFn,
      //custom.checkUserStatus,
      controllers.categoryApiController.getSubCategoriesByCatId
   );
   
   
   
	router
		.get(
      '/getCategories', 
      controllers.categoryApiController.getCategories
   );

/******* API ROUTES START ********/

/******* ADMIN ROUTES START ********/
router
   .post(
      '/adminLogin', 
      controllers.UserController.adminLogin
   )
   .post(
      '/adminAddRole', 
      controllers.RoleController.adminAddRole
   )
   .post(
      '/adminAddStaff', 
      controllers.UserController.adminAddStaff
   );
   
router
   .get(
      '/getModules', 
      controllers.ModuleController.getModules
   )
   .get(
      '/getRoles', 
      controllers.RoleController.getRoles
   )
   .get(                                                                 
      '/adminDeleteRole', 
      controllers.RoleController.adminDeleteRole
   )
   .get(                                                                 
      '/adminChangeStatus', 
      controllers.RoleController.adminChangeStatus
   )
   .get(                                                                 
      '/getrolebyid', 
      controllers.RoleController.getRoleById
   )
   .get(
      '/getStaff', 
      controllers.UserController.getStaff
   )
   .get(
      '/adminDeleteStaff', 
      controllers.UserController.adminDeleteStaff
   )
   .get(
      '/adminChangeStaffStatus', 
      controllers.UserController.adminChangeStaffStatus
   )
   .get(
      '/getStaffById', 
      controllers.UserController.getStaffById
   );


/******* ADMIN ROUTES END ********/


  
module.exports = router;


