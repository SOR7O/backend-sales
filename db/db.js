const mongoose= require("mongoose")
require('dotenv').config();

mongoose.connect(process.env.db_connection).then(() => {
    console.log("Database Connected");
  }).catch((err)=>{
    console.log("HA ocurrido un error");

  });

  module.exports= {mongoose};