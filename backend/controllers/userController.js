const User = require('../models/userModel')
const jwt = require("jsonwebtoken")

const createToken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn: '3d'})
}


//LOGIN
const login = async (req,res) =>{
    const {email,password}= req.body
    try {
        const user = await User.login(email,password)
        
        //Create Token 
        const token = createToken(user._id)

        res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//SIGNUP
const signup = async (req,res) =>{
    const {name,email,password}= req.body
    try {
        const user= await User.signup(name,email,password)

        //Create Token 
        const token = createToken(user._id)

        res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json(error)
    }
}


module.exports = {login,signup}