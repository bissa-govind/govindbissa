//const Use = require("../models/user");
//const blogs = require("../models/blogs");
//const mongoose = require("mongoose")
const express = require("express");
// const BLG = require("../models/blogs")
const JWT = require("jsonwebtoken");
const Router = express();
const UserController = require("../controllers/userController");
// const isTokenMiddleware = require("../middleware/isTokenValid")


Router.post("/userSignUp",UserController.SignUp);

Router.post("/userLogin", UserController.Login);

Router.get("/userGet/:id", UserController.GetUserById)

Router.post("/postBlog", UserController.PostBlog);

Router.get("/getBlog/:id", UserController.GetBlog);



module.exports = Router;