const mongoose = require("mongoose")
const validator =require("validator")
const bcrypt = require("bcryptjs")
const jwt  = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true,
        minlength:3,
        maxlength:25
    },
    password:{
        type:String,
        required: true,
        minlength:3,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase: true,
        validator(value) {
            if(!validator.isEmail(value)){ throw new Error ('email is invalid one')}
        }
    },
    phone:{
        type: String,
        trim:true,
        required:false,
        validator(value){
            if(!validator.isMobilePhone(value, ['ar-EG'])){throw new Error("it's not phone")}
        }
    },
    age:{
        type:Number,
        min:16,
        max:60,
        validator(value){if(value<=min){throw new Error("you are not adult")}}
    },
    gender:{
        type:String,
        trim:true,
        enum:['male', 'female']
    },
    type:{
        type:String,
        default:"user",
        enum:["user", "admin"]
    },
    image:{
        type:String,
        trim:true,
        // required:()=> this.postType=="img"
    },
    tokens:[{
        token:{
            type:String
        }
    }]

},
    {timestamps:true}
)
//handling (removing) return data from postman
userSchema.methods.toJSON = function(){
    const user = this.toObject()
    // delete user.password
    delete user.__v
    return user
    // console,log(user)S
}

userSchema.pre("save", async function(){
    const user = this
   if(user.isModified("password"))
    user.password = await bcrypt.hash(user.password, Number(process.env.passwordSalt))
    console.log(user)
})
// create login by email, password post way 
userSchema.statics.loginUser= async(email, password)=>{
    const user = await User.findOne({email:email}) // find email user
    if(!user) throw new Error("this invalid email")
    const matched = await bcrypt.compare(password, user.password) //match password vs user.password
    if(!matched)throw new Error("this invalid password")
    return user 
}
userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id}, "bel")
    user.tokens = user.tokens.concat({token}) //increase & put tokens in database
    await user.save()
    return token
}
userSchema.virtual("userPosts", {
    ref:"Posts",
    localField:"_id",
    foreignField:"userId"
})
const User = mongoose.model("Users",userSchema ) //create the name table
module.exports = User 