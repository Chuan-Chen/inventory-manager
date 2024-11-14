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
const statsRoutes = require("./routes/statsRoutes");
const contactRoutes = require("./routes/contactRoutes");
const { generateToken } = require('./middleware/authentication');
dotenv.config();



const corsOptions = {
    origin: ['http://localhost:5173'],
}

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors(corsOptions));

app.use("/api/oauth", cors(corsOptions), oauthRoutes);
app.use("/api/item", cors(corsOptions), itemRoutes);
app.use("/api/user", cors(corsOptions), userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/ai", chatbotRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/image", cors(corsOptions), imageRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/contact", contactRoutes)


app.use("/", (req, res)=>{
    res.send(`Backend Null`)
});



module.exports = app;