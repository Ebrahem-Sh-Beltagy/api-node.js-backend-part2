const postModel = require("../db/models/postModels")
require("path")
class Post {
    static addPost = async(req, res)=>{
        try{
            const postData = new postModel({userId:req.user._id, ...req.body})
            await postData.save()
            res.status(200).send({
                apiStatus:true,
                data:postData,
                message:"hi i'am added your post"
            })
         }
        catch(e){
            res.status(500).send({errors:e.message, message:"Sorry Can't Post addedpost i come from addpost post man"})
        }
        
    }
    static showAllPost = async(req, res)=>{
        try{
            // const posts = await postModel.find()
            await req.user.populate("userPosts")
            res.status(200).send({
            status:true,
            data:req.user.userPosts,
            message:"hi i'am show all posts"
        })
        }
        catch(e){
            res.status(500).send({errors:e.message, message:"Sorry Can't Get All posts i come from show post man"})
        }
    }
    static myPosts = async(req, res)=>{
        try{
            await req.user.populate("userPosts")
            res.status(200).send({data:req.user.userPosts})
        }
        catch(e){res.status(500).send({errors:e.message})}
    }
    static showSinglePost = async(req, res)=>{
        
    }
    static deletePost = async(req, res)=>{

    }
    static editPost = async(req, res)=>{

    }
    static profileImg= async(req, res)=>{
        try{ req.post.image = req.file.path
        await req.post.save()
        res.status(200).send({
            data:res.file,
            message:"success upload"
        })
        }
       catch(e){res.status(500).send({errors:e.message, message:"failed i come from profileimg post post man"})}
        
    }
}

module.exports = Post