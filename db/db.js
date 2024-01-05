const mongoose= require("mongoose")
require('dotenv').config();

mongoose.connect(process.env.db_connection, {useNewUrlParser: true,
   useUnifiedTopology: true}).then(() => {
    console.log("Database Connected");
  }).then((connec)=>{
    console.log(connec);
  }).catch((err)=>{console.log(err);});

  module.exports= {mongoose};