import mongoose, {Schema} from "mongoose"
import bcrypt from "bcrypt"

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true, 'password is required']
    },
    role:{
        type:String,
        required:true,
        enum:["Admin","Manager","Chef","Waiter","Delivery"]
    }
},{timestamps:true})

UserSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// UserSchema.methods.isPasswordCorrect = async function(password){
//     return await bcrypt.compare(password, this.password)
// }
UserSchema.methods.isPasswordCorrect = async function(password){
try {
    return await bcrypt.compare(password, this.password);
} catch (error) {
    throw new Error(error);
}
}
export const User = mongoose.model("User",UserSchema)