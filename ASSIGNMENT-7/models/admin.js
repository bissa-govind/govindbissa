const mongoose = require("mongoose");


const Admin = new mongoose.Schema({
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
});




module.exports = mongoose.model("admin", Admin, "admin")
