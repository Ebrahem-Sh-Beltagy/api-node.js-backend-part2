const router = require("express").Router()
const fs = require("fs")
const path = require("path")
const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, 'uploads')
    },
    filename:(req, file, cb)=>{
        const fExtension = Date.now() + path.extname(file.originalname)
        cb(null, fExtension)
    }
})
const upload = multer({
storage
})

module.exports = upload