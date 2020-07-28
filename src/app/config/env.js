const env = require("dotenv").config();

const config = {
  MONGO_URL: process.env.MONGO_URL,
  JWT_KEY: process.env.JWT_KEY,
  JWT_AUDIENCE: process.env.JWT_AUDIENCE,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  PORT: process.env.PORT,
  SWAGGER_TITLE: process.env.SWAGGER_TITLE,
  SWAGGER_DESCRIPTION: process.env.SWAGGER_DESCRIPTION,
  SWAGGER_VERSION: process.env.SWAGGER_VERSION,
  SWAGGER_API_HOST: process.env.SWAGGER_API_HOST,
  PROFILE_IMG_URL: "/images/userPics/profilePic/",
  PET_IMG_URL: "/images/userPics/petPics/",
  MATCH_PROFILE_LIMIT: 10
};

module.exports = config;
