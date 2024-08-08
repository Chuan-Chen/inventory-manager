const { readStream } = require("./itemController")



const upload = (req, res) => {
    try{
        
        res.status(200).json({result: `http://localhost:3000/images/${req.file.filename}`, msg: "file uploaded"});
    }catch(err){
        res.status(400).json({result: "", msg: err})
    }
}

const getImage = async (req, res) => {

}

module.exports = {
    upload,
    getImage

}