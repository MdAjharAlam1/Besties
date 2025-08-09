import { NextFunction, Request, Response } from "express"
import { CatchError, TryError } from "../utils/error"
import jwt, { JwtPayload } from 'jsonwebtoken'
import mongoose from "mongoose"

export interface PayloadInterface {
    id: mongoose.Types.ObjectId
    email? : string
    fullname? : string
    mobile?: string
    image? : string | null
}

export interface SessionInterface extends Request {
    session?:PayloadInterface
}

const AuthMiddleware = async(req:SessionInterface,res:Response, next:NextFunction) =>{
    try {
        const accessToken = req.cookies.accessToken
        if(!accessToken){
            throw TryError('Failed to unautorized user', 401)
        }
        const payload = await jwt.verify(accessToken,process.env.AUTH_SECRET!) as JwtPayload

        req.session ={
            id: payload.id,
            fullname : payload.fullname,
            mobile: payload.mobile,
            email : payload.email,
            image: payload.image
        }
        
        next()
    } catch (err) {
        CatchError(err,res,"Unauthorized")
    }
}

export default AuthMiddleware