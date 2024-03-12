const dotenv = require("dotenv")
const server = require("./src/app");
const connectDB = require('./src/services/mongo');

dotenv.config()
const PORT = process.env.PORT;

connectDB();

server.listen(PORT, ()=>{
    console.log(`listening on http://localhost:${PORT}`)
})
