import { SessionInterface } from "../middlewares/auth.middleware";
import ChatModel from "../models/chat.models";
import {Response} from 'express'
import { CatchError } from "../utils/error";
import { downloadObject } from "../utils/S3";

interface PayloadInterface{
    from:string
    to:string
    message:string
    files?:{
        path:string
        type:string
    }
}

export const createChats = (payload:PayloadInterface) =>{
    ChatModel.create(payload)
    .catch((err)=> console.log(err.message))
}

export const fetchChats = async(req:SessionInterface, res:Response)=>{
    try{
        if(!req.session){
            throw new Error("Failed to fetch Chats")
        }
        const chats = await ChatModel.find({
            $or:[
                {from:req.session.id, to:req.params.to},
                {from:req.params.to, to:req.session.id}
            ]
        })
        .populate("from", "fullname image email mobile")
        .lean()
        const modifiedChats = await Promise.all(
            chats.map(async(item)=>{
                // console.log(item)
                if(item.files){
                    return{
                        ...item,
                        files:{
                            path: item.files.path && await downloadObject(item.files.path),
                            type: item.files.type
                        }
                    }
                }
                else{
                    return item
                }
            })
        )
        
        res.json(modifiedChats)
    }
    catch(err){
        CatchError(err,res,"Failed to fetch Chats")
    }
}