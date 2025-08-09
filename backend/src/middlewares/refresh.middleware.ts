import { NextFunction, Response } from "express";
import { SessionInterface } from "./auth.middleware";
import { CatchError, TryError } from "../utils/error";
import AuthModel from "../models/auth.models";
import moment from "moment";

const refreshTokenMiddleware = async(req:SessionInterface, res:Response,next:NextFunction) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        // console.log(refreshToken)

        if(!refreshToken){
            throw TryError('Failed to refresh token',401) 
        }
        const user = await AuthModel.findOne({refreshToken})
        // console.log(user)
        if(!user){
            throw TryError('Failed to refresh token', 401)
        }
        const expiry = moment(user.expiry)
        const todayDate =  moment()

        const isExpired = todayDate.isAfter(expiry)

        if(isExpired){
            throw TryError('Failed to refresh token', 401)
        }

        req.session ={
            id : user._id,
            fullname : user.fullname,
            email : user.email,
            mobile : user.mobile,
            image : user.image
        }
        next()

        
    } catch (err:unknown) {
        CatchError(err,res,'failed to refresh token')
    }
}

export default refreshTokenMiddleware