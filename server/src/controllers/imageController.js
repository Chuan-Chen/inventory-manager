const { readStream } = require("./itemController")

const upload = (req, res) => {
    try{
        res.status(200).json({result: `http://localhost:3000/api/image/${req.file.filename}`, msg: "file uploaded"});
    }catch(err){
        res.status(400).json({result: "", msg: "Please upload an png or jpeg", err: err.toString()})
    }
}

const remove = (req, res) => {
    
}

module.exports = {
    upload,
    remove
}