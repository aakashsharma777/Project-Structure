 const mongoose = require("mongoose");
const beautifyUnique = require("mongoose-beautiful-unique-validation");
const user = require("./user");
const role = require("./role");
const category = require("./category");
const adminmodule = require("./adminmodule");
//

const { config } = require("../config");

mongoose.connect(
  config.MONGO_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  },
  (err, con) => {
    if (err) {
      throw err;
    } else {
      console.log("mongodb connected");
    }
  }
);

const database = {
  UserModel: mongoose.model("user", user),
  RoleModel: mongoose.model("role", role),
  ModuleModel: mongoose.model("adminmodule", adminmodule),
  CategoryModel: mongoose.model("category", category),
};

module.exports = database;
