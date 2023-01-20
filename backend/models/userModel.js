const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Add Your Name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please Add Your Email'],
        trim: true,
        unique: true
    },
    password: {
        type: String ,
        required: [true, 'Please Add Your Password']
    },
    isAdmin: {
        type: Boolean
    }
},
{
    timestamps: true
})

//Static Signup method
userSchema.statics.signup = async function(name,email,password){

    //Validation
    if(!email || !password){
        throw Error('All Fields Must Be Filled')
    }else if(!validator.isEmail(email)){
        throw Error('Please Enter A Valid Email')
    }else if(password.length<6){
        throw Error('Password Can\'t Be Less Than 6 Characters')
    }



    const exists = await this.findOne({email})

    if(exists){
        throw Error("Email Already In Use")
    }

    //Hashing The Password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({name, email, password: hash, isAdmin: false})

    return user
}

//Static Login Method
userSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error('All Fields Must Be Filled')
    }

    const user= await this.findOne({email})
    if(!user){
        throw Error("User Doesn't Exist")
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Please Check Your Coordinates')
    }

    return user
}

module.exports = mongoose.model('Users', userSchema)