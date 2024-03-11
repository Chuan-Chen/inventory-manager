const express = require('express');

const cors = require("cors");
const server = require("./src/app");
const PORT = process.env.PORT;

console.log(process.env.PORT)

server.listen(PORT, ()=>{
    console.log(`listening on http://localhost:${PORT}`)
})
