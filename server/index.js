const dotenv = require("dotenv").config();
const server = require("./src/app");
const connectDB = require("./src/services/mongo");
const preflight = require("./src/services/preflight");
connectDB();
preflight();

server.listen(process.env.PORT, ()=>{
    console.log(`listening on http://localhost:${process.env.PORT}`)
})
