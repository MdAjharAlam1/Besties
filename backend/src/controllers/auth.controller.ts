import AuthModel from "../models/auth.models";
import { Request,Response} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {v4 as uuid} from 'uuid'
import moment from "moment";

import { CatchError, TryError } from "../utils/error";
import { PayloadInterface, SessionInterface } from "../middlewares/auth.middleware";


const accessTokenExpires = '7d'

const accessTokenExpiresInTenMinutes = (7*24*60*60)*1000
const refreshTokenExpiresInSevenDays = (7*24*60*60) * 1000

type TokenType = "at" | "rt"

const generateToken = async(payload : PayloadInterface) =>{
    const accessToken = await jwt.sign(payload,process.env.AUTH_SECRET!,{expiresIn:accessTokenExpires})
    const refreshToken =  uuid()
    return {
        refreshToken,
        accessToken
    }
}

const getCookiesOptions = (tokenType:TokenType) =>{
    return {
        httpOnly:true,
        maxAge: tokenType === "at" ? accessTokenExpiresInTenMinutes : refreshTokenExpiresInSevenDays,
        secure:false,
        domain:'localhost'

    }
    
}

export const Signup = async(req:Request , res:Response)=>{
    try {
        await AuthModel.create(req.body)
        // console.log(req.body)
        res.json({
            message:'Signup Successfully'
        })
    } 
    catch (err : unknown) {
        CatchError(err,res,"Signup Failed ! Please try again later")
    }
}

export const Login = async(req:SessionInterface , res:Response) =>{
    try {
        const{email,password} = req.body
        // console.log(email,password)
        const user = await AuthModel.findOne({email:email})
        // console.log(user)
        if(!user){
            throw TryError('User not found, Please try first signup',404)
        }
        const isLogin = await bcrypt.compare(password,user.password)

        if(!isLogin){
            throw TryError('Invailid Credential Email and Password', 401)
        }

        const payload = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            mobile: user.mobile,
            image : user.image
        }
        const {refreshToken,accessToken} = await generateToken(payload)
        // console.log(accessToken,refreshToken)
        await AuthModel.updateOne({_id:user._id},
            {
                $set:{
                    refreshToken,
                    expiry : moment().add(7,'days').toDate()
                }
            }
        )
        res.cookie('accessToken',accessToken,getCookiesOptions('at'))
        res.cookie('refreshToken', refreshToken,getCookiesOptions('rt'))
        res.json({
            message:'Login Success',
        })
    } 
    catch (err : unknown) {
       CatchError(err,res,"Login Failed ! Please Try After sometimes")

    }
}

export const refreshToken = async(req: SessionInterface , res:Response) =>{
    try {
         
        if(!req.session){
            throw TryError('Failed to refresh token',401)
        }
    
        const {accessToken, refreshToken} = await generateToken(req.session)
        await AuthModel.updateOne({_id: req.session.id},
            {
                $set:{
                    refreshToken,
                    expiry : moment().add(7,'days').toDate()
                }
            }
        )
        res.cookie('accessToken',accessToken, getCookiesOptions('at'))
       res.cookie('refreshToken', refreshToken,getCookiesOptions('rt'))
       res.json({
        message:'Token refresh'
       })
    } catch (err:unknown) {
        CatchError(err,res,'Failed to refresh token')
    }
}

export const forgotPassword = async(req:Request, res:Response)=>{
    res.send("hello")
}


export const getSession = async(req:Request, res:Response) => {
    try {
        const accessToken = req.cookies.accessToken
        if(!accessToken){
            throw TryError('Invalid Session',401)
        }
        
        const session = jwt.verify(accessToken,process.env.AUTH_SECRET!)
        res.json(session)
        
    } catch (err : unknown) {
        CatchError(err,res, 'Invalid session')
    }
}

export const updateProfilePicture = async(req:SessionInterface, res:Response) =>{
    try {
        const path = `${process.env.S3_URL}/${req.body.path}`
        console.log(path)
        if(!path || !req.session){
            throw TryError('Failed to update profile picture',400)
        }

        await AuthModel.updateOne({_id : req.session.id},{$set : {image:path}})

        res.json({image: path})
        
        
    } catch (err) {
        CatchError(err,res,'Failed to update profile picture')
    }
}

export const Logout = (req:Request , res:Response) =>{
    try {
        const options = {
            httpOnly : true,
            maxAge:0,
            secure:false,
            domain :'localhost'
        }

        res.clearCookie('accessToken', options)
        res.clearCookie('refreshToken', options)
        res.json({
            message:'Logout Successfully'
        })
    } catch (err: unknown) {
        CatchError(err,res,'Failed to logout')
    }
}