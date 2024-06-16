const express = require('express');
const app = express();
const cors = require("cors");

const itemRoutes = require("./routes/itemRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");


const corsOptions = {
    origin: ["http://localhost:5173"],
}

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors(corsOptions));



app.use("/api/item", itemRoutes);
app.use("/api/user", cors(corsOptions), userRoutes);
app.use("/api/category", categoryRoutes);


app.use("/", (req, res)=>{
    res.send(`null`)
});

module.exports = app;