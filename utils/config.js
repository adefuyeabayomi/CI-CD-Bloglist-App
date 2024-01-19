require("dotenv").config();
let DB_URL_TEST = process.env.DB_URL_TEST;
let DB_URL_PRODUCTION = process.env.DB_URL_PRODUCTION
let PORT = process.env.PORT;
let NODE_ENV = process.env.NODE_ENV;
let SECRET = process.env.SECRET
module.exports = {
     PORT,DB_URL_TEST,DB_URL_PRODUCTION,NODE_ENV,SECRET
}