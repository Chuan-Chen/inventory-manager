const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongoconfig = require('../configs/mongo.config.js');


const connectDB = async (counter = 0) => {
    
    try {
      const connection = await mongoose.connect(mongoconfig.URI, mongoconfig.Connection_Options);
      console.log('MongoDB Connected...');
      return connection;
    } catch (err) {
      console.error(err.message);
      console.log("Could not establish connection to MongoDB attempt (" + counter + ")")
      console.log("Trying reconnection...")
      if(err){
        connectDB(++counter);
      }
      //process.exit(1);
    }
};


module.exports = connectDB;