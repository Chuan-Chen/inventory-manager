const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongoconfig = require('../configs/mongo.config.js');

const connectDB = async () => {
    try {
      const connection = await mongoose.connect(mongoconfig.URI, mongoconfig.Connection_Options);
      console.log('MongoDB Connected...');
    } catch (err) {
      console.error(err.message);
      console.log("Could not establish connection to MongoDB")
      //process.exit(1);
    }
  };
  
module.exports = connectDB;