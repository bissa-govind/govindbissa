const mongoose = require("mongoose");
const User = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
    },

    lastName:{
        type:String,
        required: true,
    },

    email:{
        type:String,
        required: true,
    },

    Password:{
        type:String,
        required: true,
    },

    DOB:{
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model("user", User, "user")