/* const AdminController = require('./AdminController');*/
const UserController = require("./UserController");
const ModuleController = require("./ModuleController");
const RoleController = require("./RoleController");
const signupApiController = require("./signupApiController");
const categoryApiController = require("./categoryApiController");
//=================START CODE FOR EMS TEAM=================
const categoryController = require("./categoryController");
const dynamicFormController = require("./dynamicFormController");
const advertisementPostController = require("./advertisementPostController");
const advertisementPackagePricingController = require("./advertisementPackagePricingController");
const adminManageUsersController = require("./adminManageUsersController");
const additionalInformationController = require("./additionalInformationController");
const promoteAdsController = require("./promoteAdsController");
const adminManageFAQsController = require("./adminManageFAQsController");
const reportController = require('./reportController');
const manageAdsController = require('./manageAdsController');
const bannerController = require('./bannerController');
const legalDocumentController = require('./legalDocumentController')
const ticketsController = require('./ticketsController')
const notificationsController = require('./notificationsController')
/*const TraitController = require('./TraitController');
const PageController = require('./PageController');
const DealController = require('./DealController'); */

const controllers = {
  /* AdminController: AdminController,*/
  UserController: UserController,
  ModuleController: ModuleController,
  RoleController: RoleController,
  signupApiController: signupApiController,
  categoryApiController: categoryApiController,
  /*TraitController: TraitController,
   PageController: PageController,
   DealController: DealController, */
  // ========================START CODE FOR EMS TEAM========================
  categoryController: categoryController,
  dynamicFormController: dynamicFormController,
  advertisementPostController: advertisementPostController,
  advertisementPackagePricingController: advertisementPackagePricingController,
  adminManageUsersController: adminManageUsersController,
  additionalInformationController: additionalInformationController,
  promoteAdsController: promoteAdsController,
  adminManageFAQsController: adminManageFAQsController,
  reportController:reportController, 
  manageAdsController:manageAdsController, //sprint 5
  bannerController:bannerController,
  legalDocumentController:legalDocumentController,
  ticketsController:ticketsController,
  notificationsController:notificationsController
};

module.exports = controllers;
