require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.json());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,"uploads")));



app.get("/user",async(req,res)=>{
  const path = require("path");
  const User=require('../Backend/database/User')
  const user=req.query.username
  
  const result= await User.findOne({username:user}).select('image')
  
  

  if(!result){
    
       const imagePath = path.join(__dirname, 'uploads',`uuuu.png`);
       return    res.sendFile(imagePath)}
  else{
      const imagePath = path.join(__dirname, 'uploads',`${result.image}`);
       return  res.sendFile(imagePath)}
  
  

 })


 app.get("/image",async(req,res)=>{
  const path = require("path");
  
  const user=req.query.username
  console.log(user)
  
  var imagePath=null
   imagePath =  path.join(__dirname, 'uploads',`${user}`);
  if(!imagePath)
      console.log('undefined')
  
  console.log(imagePath)
  res.sendFile(imagePath)

 })







const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },

  filename: function (req, file, cb) {
    const uniqueFilename = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');;
    cb(null, uniqueFilename);
  }
});

const upload = multer({ storage: storage });

mongoose.connect(process.env.url)
  .then(() => {
    console.log("sucessfully done with connect")
  })
  .catch((error) => {
    console.log(error)
  })

require('./routers')({app,mongoose,upload})


 








app.listen(process.env.port, function () {
  console.log("Started application on port %d", 4000)
});