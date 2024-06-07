import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken"
const RegisterUser = async(req,res) => {
    try {
        const {username, name, email, password , role} = req.body; 
        // console.log(req.body)
          
        // checking for if any field is empty
        if([username,name,email,password,role].some((field)=>field?.trim()==="")){
            throw new Error("All fields are required")
        }
        // check for user is exist or not 
        const isUserExist = await User.findOne({
            $or:[{username},{email}]
        })
        if(isUserExist){
            throw new Error("User is already Exist")
        }

        // create user

        const user = User.create({
            username:username.toLowerCase(),
            name,
            email,
            password,
            role
        })

        const createdUser = await User.findById(user._id).select(
            "-password"
          );

          if(createdUser){
            throw new Error("Something went wrong while creating the user")
          }

          return res.status(200).json({status:true,message:"User created succesfully"})
    } catch (error) {
        // console.log("Error while registering a User",error.message)
        res.status(500).json({status:false,message:error.message})
    }
}

const loginUser = async(req,res) =>{
    try {
        const {email,password} = req.body

        // check for the field is not empty
        if(!email || !password){
            throw new Error("All fields are required")
        }

        //check the email is valid or not

        const user = await User.findOne({email})
        if(!user){
            throw new Error("Check your email and password")
        }

        const ispasswordValid = await user.isPasswordCorrect(password)
        
        if(!ispasswordValid){
            // res.status(404).json({status:false,message:"Wrong password"})
            throw new Error("Wrong password")
        }
        const token = jwt.sign({id:user._id},
            process.env.Secretkey,
            {expiresIn:process.env.expiryTime})
        const loggedInUser = await User.findById(user._id).select("-password")
        
        const options = {
            httpOnly: true,
            secure: true
        }
        return res
        .status(200)
        .cookie("Token",token,options)
        .json({status:true,message:"User logged in successfull",user:loggedInUser})
    } catch (error) {
        res.status(500).json({status:false,message:error.message})
    }
}

const logoutUser = async(req,res)=>{
    try{
    //    const Token = req.cookies.Token
        const options = {
            httpOnly: true,
            secure: true
        }
    
        return res
        .status(200)
        .clearCookie("Token", options)
        .json({status:true,message:"User loggedOut"})
    }
     catch (error) {
        res.status(500).json({status:false,message:error.message})
    }
}

const getAllUser = async(req,res) =>{
    try {
        const user =await User.find({});
        res.status(200).json({status:true,data:user})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteUser = async(req,res) =>{
    try {
        const {id} = req.params;
        const deleted = await User.findByIdAndDelete(id);
        res.status(200).json({ message: "deleted" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      } 
}

export {RegisterUser, loginUser,logoutUser,getAllUser, deleteUser};