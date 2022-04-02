const userModel = require("../db/models/userModels")
require("path")
class User {
    static register = async(req, res)=>{
        try{
            const user = new userModel(req.body)
            await user.save()
            res.status(200).send({
                apiStatus: true,
                data: user,
                message:"user is registered"
        })
         }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"Sorry Can't Post Register i come from register post man"
        })
         }
        
    }
    static showAllUser= async(req, res)=>{
        try{
                const users = await userModel.find()
                res.status(200).send({
                    apiStatus:true,
                    data:users,
                    message:"this all users fetching" 
                })}
        catch(e){
            res.status(500).send({errors:e, message:"Sorry Can't Get All Users i come from show post man"})
        }

    }
    static showSingleUser =async(req, res)=>{
        try{
            const user = await userModel.findById(req.params.id)
        res.status(200).send({
            apiStatus:true,
            data: user,
            message:"fetch single user" + `${console.log(user)}`
        })}
        
        catch(e){
            res.status(500).send({errors:e.message, message:"Sorry Can't Get Single User i come from single post man"})
        }

    }
    static login =async(req, res)=>{
        try{
            const user = await userModel.loginUser(req.body.email ,req.body.password)
            const token = await user.generateToken()
            res.status(200).send({
                data: {user, token},
                //  message:"success you are now login" +
                // `${console.log(req.body.email)}
                //  ${console.log(req.body.password)}
                //  ${console.log(token)}`
                })
            if(!user) throw new Error("thhis not user")
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in login check the email && password i come from login post man"
            })
        }
    }

    static loginAdmin =async(req, res)=>{
        try{
            const admin = await userModel.loginUser(req.body.email ,req.body.password)
            const token = await admin.generateToken()
            res.status(200).send({
                data: {admin, token},
                //  message:"success you are now login" +
                // `${console.log(req.body.email)}
                //  ${console.log(req.body.password)}
                //  ${console.log(token)}`
                })
            if(!admin) throw new Error("this not admin")
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in login as admin check the email && password i come from -- post man"
            })
        }
    }

    static deletedUser= async(req, res)=>{
        try{
        const user = await userModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
           message:"succsess deleted ",
            data: user,
        })
        }
        catch(e){
            res.send({errors:e.message, message:"can't delete user i come from deleteUser post man"})
        }
    }
    static editUser =async(req, res)=>{

    }
    static logOut =async(req, res)=>{
        //remove token from tokens =>filter
        try{
            // console.log(req.token)
            
        req.user.tokens= req.user.tokens.filter(t=>{
            return t.token != req.token
        })
        await req.user.save()
        res.status(200).send({
            data:req.user, message: "you logout"
        })
        }
        catch(e){
            res.send({errors:e.message, message:"sorry can't logOut i come from logout post man"})
        }
    }
    static logOutAll = async(req, res)=>{
        //remove all tokens req.user.tokens= []
        try{
            const user = req.user.tokens = []
            await req.user.save()
            res.status(200).send({data:"", message:"you logedout all device"})
        }
        catch(e){
            res.send({errors: e.message, message:"can't loged for all deviced i come from logoutall post man"})
        }
    }
    static changePassword = async(req, res)=>{
        try{
         req.user.password = req.body.password
         await req.user.save()
         res.status(200).send({apiStatus:true})
        }
        catch(e){
            res.status(500).send({errors:e.message, message:"this password changed i come from changePassword post man"})
        }
    }
    static profile = async(req, res)=>{
        res.status(200).send({data:req.user, message: "hi get the progile"})
    }
    static profileImg= async(req, res)=>{
        try{ req.user.image = req.file.path
        await req.user.save()
        res.status(200).send({
            data:res.file,
            message:"success upload"
        })
        }
       catch(e){res.status(500).send({errors:e.message, message:"failed i come from profile post man"})}
        
    }

}
module.exports = User