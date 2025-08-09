import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const authSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true

    },
    image:{
        type:String,
        trim:true
    },
    refreshToken:{
        type:String
    },
    expiry :{
        type:Date
    }
},{timestamps:true})

authSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,12)
    next()
})

authSchema.pre('save' , function(next){
    this.refreshToken = null
    this.expiry = null
    next()

})


const AuthModel = mongoose.model('Auth',authSchema)
export default AuthModel