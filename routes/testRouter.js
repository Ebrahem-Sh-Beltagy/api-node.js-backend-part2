// const router = require("express").Router()
const fs = require("fs")
const path = require("path")
const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })
//any type put between the route and function rename middleware :!!!!!!!
// router.post('/profile', upload.single('avatar'), function (req, res) { 
//     const fExtension = path.extname(req.file.originalname)
//     let filePath  = path.join(__dirname, '../',  req.file.path)

//     fs.rename(filePath, `${filePath}${req.file.originalname}`, ()=>{})
//     // res.send("done upload")
//     // res.send(filePath+fExtension)
//     res.send(`${req.file.originalname}`)
// })
const router = require("express").Router()
// const upload  =require("../middleware/uploadFile")
// router.post('/profile', upload.single('avatar'), function (req, res) {
//     res.send("success upload")
//     // res.send(fExtension)

// })
module.exports = router