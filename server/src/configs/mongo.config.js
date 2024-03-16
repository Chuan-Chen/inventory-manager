const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    URI: process.env.MONGO_URI,
    Connection_Options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "Inventory_Manager",
    },
};