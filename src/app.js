require("dotenv").config() //to include api work
require("../db/connection")
const express = require("express") //to make server
const app = express()
const cors = require("cors")
app.use(cors())
const path = require("path")
// const hbs = require("hbs")

const userRouter = require("../routes/userRouter")
const postRouter = require("../routes/postRouter")
const testRouter = require('../routes/testRouter')
app.use(express.json()) //belongs to dotenv
app.use("/user", userRouter)
app.use("/post", postRouter)
app.use(testRouter)

const staticFiles = path.join("../uploads") // file middlware to put files
app.use(express.static(staticFiles))

app.get("*", (req, res)=> res.status(404).send({
    apiStatus: false, message: "error in router 404 from * app"
}))



module.exports = app