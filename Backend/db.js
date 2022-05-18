const mongoose = require('mongoose');
require('dotenv').config()


const mongoURI=process.env.MONGOURI
   
connectToMongo=()=>{mongoose.connect(mongoURI ,{ useNewUrlParser: true }
    );
  const db=mongoose.connection;
  db.on("error", function(){console.log("error in connecting mongo db")});
  db.once("open",function(){
    console.log("Connected to Mongo Successfully");

  }) }


module.exports = connectToMongo; 