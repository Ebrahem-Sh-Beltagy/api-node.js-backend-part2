const mongoose = require("mongoose")
const validator= require("validator")

const postSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    postType:{
        type:String,
        trim:true,
        required:true,
        enum:["txt", "img"]
    },
    // title:{
    //     type:String,
    //     required:true,
    //     // validator(value){if(value = post.value) throw new Error ("is found")}
    // },
    description:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String,
        trim:true,
        required:()=> this.postType=="img"
    },
    content:{
        type:String,
        trim:true,
        required:()=> this.postType=="txt"
    },
    // },
    // interactive:{
    //     type:String,
    //     trim:true,
    //     enum:["like", "disLike"]
    // }
},
    {timestamps:true}
)
const Post = mongoose.model("Posts", postSchema)
module.exports = Post