require("dotenv").config();
let DB_URL_TEST = "mongodb://yomidaniel:12345678@localhost:27017/DB_part_five?authMechanism=DEFAULT&authSource=fullstack_tutorial"
let DB_URL_PRODUCTION = "mongodb+srv://adefuyeabayomi:omolewa9@cluster0.ppt7z.mongodb.net/DB_for_part5?retryWrites=true&w=majority";
let PORT = process.env.PORT;
let NODE_ENV = process.env.NODE_ENV;
let SECRET = process.env.SECRET;
module.exports = {
  PORT,
  DB_URL_TEST,
  DB_URL_PRODUCTION,
  NODE_ENV,
  SECRET,
};
