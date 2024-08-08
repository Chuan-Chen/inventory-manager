const express = require('express');

const app = express();
const cors = require("cors");
const dotenv = require('dotenv');
const itemRoutes = require("./routes/itemRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const oauthRoutes = require("./routes/oauthRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes")
const searchRoutes = require("./routes/searchRoutes")
const imageRoutes = require("./routes/imageRoutes")
const { generateToken } = require('./middleware/authentication');
dotenv.config();



const corsOptions = {
    origin: ["http://localhost:5173"],
}

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors(corsOptions));

app.use("/api/oauth", oauthRoutes);
app.use("/api/item", cors(corsOptions), itemRoutes);
app.use("/api/user", cors(corsOptions), userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/ai", chatbotRoutes)
app.use("/api/search", searchRoutes)
app.use("/api/image", imageRoutes);



app.use("/", (req, res)=>{
    res.send(`null`)
});



module.exports = app;