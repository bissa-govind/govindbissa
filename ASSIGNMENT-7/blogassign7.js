const express = require("express");
const blog = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const adminRoutes = require("./routes/adminRoutes");
const JWT = require("jsonwebtoken");


blog.use(express.urlencoded({extended:false}));
blog.use(express.json());



mongoose.connect("mongodb://localhost:27017/blogDB",{
    useUnifiedTopology: true,
    useNewUrlParser: true,

}).then(()=>{
    console.info("connection established");
}).catch((error)=>{
    console.error("connection NOT established",error);
})



blog.use(userRoute);
blog.use("/admin", adminRoutes);





const PORT = 2210;
blog.listen(PORT,()=>{
    console.log(`server is: ${PORT}`)
})