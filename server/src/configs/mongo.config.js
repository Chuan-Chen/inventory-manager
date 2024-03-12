const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    URI: process.env.MONGO_URI,
    DB_NAME: "Inventory_Manager",
};