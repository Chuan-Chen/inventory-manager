const multer = require("multer");


const storage = new multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/")
    },
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}-${(file.originalname)}`.replace(/\s/g, ''))
    }
})


module.exports = multer({storage});