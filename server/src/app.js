const express = require('express');
const app = express();
const cors = require("cors");

const itemRoutes = require("./routes/itemRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

app.use(cors());

app.use("/", (req, res)=>{
    res.send("hi")
});

app.use("/api/item", itemRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);

module.exports = app;