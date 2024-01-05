const mongoose= require("mongoose")
require('dotenv').config();

mongoose.connect(process.env.db_connection).then(() => {
    console.log("Database Connected");
  });

  module.exports= {mongoose};