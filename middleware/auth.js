const userModel = require("../db/models/userModels")
const jwt = require("jsonwebtoken")


const auth = async(req, res, next)=>{
    try{
        const token =req.header("Authorization") //read token & put token in header Authorization
        const decoded = jwt.verify(token, "bel") //verify token 
        // res.status(200).send({data:decoded, message: "success login decoded"}) //to check token return by _id & iat
        
        const user = await userModel.findOne({
            _id: decoded._id,
            "tokens.token":token,
            type:"user"
        })
        // req.user.save()
        if(!user) throw new Error("invalid credintials user");
         
            req.user = user
            req.token = token
            next()
         
    }
    catch(e){
    res.status(500).send({
        apiStatus:false,
        errors:e.message,
        message:"error to get token"
    })
    }
}

module.exports= auth