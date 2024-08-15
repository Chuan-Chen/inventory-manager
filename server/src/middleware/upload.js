const multer = require("multer");



const storage = new multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/")
        
    },
    filename: (req, file, cb)=>{
        console.log(file);
        cb(null, `${Date.now()}-${(file.originalname)}`.replace(/\s/g, ''))
        
    }
})


module.exports = multer({storage: storage, fileFilter: (req, file, cb) => {
    const acceptedFileTypes = ["image/png", "image/jpeg"];
    if(acceptedFileTypes.indexOf(file.mimetype) !== -1){
        cb(null, true);
    }else{
        req.fileTypeError = true;
        cb(null, false, new Error("Wrong file type"));
    }
}});