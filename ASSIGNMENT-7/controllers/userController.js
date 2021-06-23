const express = require("express")
const Use = require("../models/user")
const mongoose = require ("mongoose");
const JWT = require("jsonwebtoken")
const BLG = require("../models/blogs")



exports.Login = (req,res)=>{
    
    let{email,Password} = req.body;
    Use.findOne({email:email}).then((user)=>{
        console.info(`user with ${email} was found`);        
        if(Password === user.Password){
            const token = JWT.sign(
                {
                    email: user.email,
                    userid: user.id
                },
                "SECRETKEY",
                {
                    expiresIn: "1h",
                }
            );

            console.info("login done");
            return res.status(200).send({user,token});
        }
        console.warn("password incorrect");
        return res.status(401).send("password was incorrect")
         
   }).catch(()=>{
        console.error(`USER WITH EMAIL ${email} was not found`);
        res.status(501).send("ERROR");
    })


}


exports.SignUp =(req,res)=>{
  
    let{firstName, lastName, email, Password, DOB} = req.body;
    let user = new Use({
        firstName,
        lastName,
        email,
        Password,
        DOB,
    });
     
    user.save()
      .then(()=>{
          res.status(200).send({firstName, lastName, email, Password, DOB});
      }).catch(()=>{
          return res.status(500).send("ERROR")
      })
}

// get user by id 
exports.GetUserById = (req,res)=>{
    let id = req.params.id; //in path
    id = mongoose.Types.ObjectId(id);
    Use.findOne({_id:id}).then((user)=>{
        if(user){
        console.info("user WAS found");
        return res.status(200).send(user);}
        console.error("user was not found");
        return res.status(404).send("ERROR");
    }).catch((error)=>{
        console.error("user not exist");
        return res.status(500).send("INVALID");
        
    })}

//POST BLOG WITH TOKEN, PUTTING IN HEADERS (that takes id from token) 
exports.PostBlog = (req,res)=>{
    let{heading, blog} = req.body;
    if(!req.headers.token){
        console.log("no token was send");
        return res.send(403).send("Invalid token");
        }
        const decodedToken = JWT.verify(req.headers.token,"SECRETKEY");
        let userId = decodedToken[Object.keys(decodedToken)[1]];
        userId = mongoose.Types.ObjectId(userId)
        
    let blg = new BLG({
        heading,
        blog,
        userId,
    });
    blg.save().then(()=>{
        console.info(blg)
       return res.status(200).send(`Blog was created with ${blg}`);
    }).catch(()=>{
        console.error("ERROR");
        res.status(500).send("ERROR");
    })}



//GET blog by writing id in path
exports.GetBlog = (req,res)=>{
    // if(!req.headers.token){
    //     console.log("no token was send");
    //     return res.send(403).send("Invalid token");
    //     }
    //     const decodedToken = JWT.verify(req.headers.token,"SECRETKEY");
        let userId = req.params.id;
        userId = mongoose.Types.ObjectId(userId);
        
    BLG.find({userId})
    .then((blog)=>{
        if(blog.length === 0){
            console.error(`no blog found for user:${userId}`);
           return res.status(404).send(`no blogs available for user: ${userId} `);
        }
        console.info(blog);
        return res.status(200).send(`ALL blogs of user:${userId} are here: ${blog}`);
    }).catch((error)=>{
        console.error("ERROR OCCURRED",error);
        return res.status(417).send("error exists")
    })
}