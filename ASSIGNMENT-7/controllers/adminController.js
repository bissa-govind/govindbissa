const express = require("express");
const Admin = require("../models/admin");
const mongoose = require ("mongoose");


exports.signup = (req,res)=>{
    let{firstName, lastName, email, Password} = req.body;
    let user = new Admin({
        firstName,
        lastName,
        email,
        Password,
       
    });
     
    user.save()
      .then(()=>{
          console.info("[SIGN UP DONE!]")
          res.status(200).send({firstName, lastName, email, Password});
      }).catch(()=>{
          return res.status(401).send("ERROR")
    })
}


exports.login = (req,res)=>{
    let{email,Password} = req.body;
    Admin.findOne({email:email}).then((admin)=>{
        
        if(Password === admin.Password){
            console.info(`[user was found name: ${email}]`);
            
            return res.status(200).send("[LOGIN SUCCESSFULLY]")
        }
        console.warn("PASSWORD INCORRECT!")
        return res.status(501).send("[password or email was incorrect]");
    }).catch((error)=>{
        console.error(`[USER WITH EMAIL ${email} was not found]`);
        res.status(401).send("ERROR");
    })
}