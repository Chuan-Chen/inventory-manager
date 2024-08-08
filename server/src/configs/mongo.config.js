const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    URI: process.env.MONGO_URI,
    Connection_Options: {
        dbName: "Inventory_Manager",
    },
};