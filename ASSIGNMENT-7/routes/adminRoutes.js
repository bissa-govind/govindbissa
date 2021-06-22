const Admin = require("../models/admin");
// const blog = require("../models/blogs");
const express = require("express");
const Router = express();
const adminController = require("../controllers/adminController") 



Router.post("/adminSignup",adminController.signup);

Router.post("/adminLogin",adminController.login);




module.exports = Router;