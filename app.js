const express = require("express");
const app = express();
const cors = require("cors");
const blogController = require("./controllers/blogs");
const userController = require("./controllers/users");
const loginController = require("./controllers/login");
const testingRouter = require("./controllers/testing");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const config = require("./utils/config");

let DB_URL;

app.use(cors());
console.log("config node env", config.NODE_ENV);
if (config.NODE_ENV === "test" || config.NODE_ENV === "development") {
  DB_URL = config.DB_URL_TEST;
  app.use(testingRouter);
} else {
  DB_URL = config.DB_URL_PRODUCTION;
}
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.error("Unable to connect to database", err.message);
  });
//app.use(middleware.userExtractor)
app.use(express.json());
app.use(loginController);
app.use(middleware.tokenExtractor, blogController);
app.use(userController);
app.use(middleware.errorMiddleware);
app.use(express.static("./front-end/dist/"));
module.exports = app;
