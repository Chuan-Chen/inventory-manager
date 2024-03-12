const mongoose = require('mongoose');
const mongoconfig = require('../configs/mongo.config.js');

const connectDB = async () => {
    try {
      await mongoose.connect(mongoconfig.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: mongoconfig.DB_NAME,
      });
      console.log('MongoDB Connected...');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };
  
module.exports = connectDB;