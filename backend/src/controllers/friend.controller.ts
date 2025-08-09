import { Request, Response } from "express";
import { CatchError, TryError } from "../utils/error";
import { SessionInterface } from "../middlewares/auth.middleware";
import FriendModel from "../models/friend.model";
import AuthModel from "../models/auth.models";
import mongoose from "mongoose";

export const addFriend = async(req:SessionInterface, res:Response)=>{
    try {
        // console.log(req.body ,'top')
        req.body.user = req.session?.id
        // console.log(req.body , 'middle')
        const friend = await FriendModel.create(req.body)
        // console.log(req.body, 'ajhar')
        // console.log(friend)
        res.json({friend})

    } catch (err:unknown) {
        CatchError(err,res,'Failed to send friend request')
    }
}

export const fetchFriend = async(req:SessionInterface,res:Response) =>{
    try {
        const user = req.session?.id
        const friends = await FriendModel.find({user}).populate('friend')
        res.json(friends)
    } catch (err:unknown) {
        CatchError(err,res,'Failed to fetch friends')
    }
}

export const FriendRequest = async(req:SessionInterface, res:Response) =>{
    try {
        if(!req.session){
           throw TryError('failed to fetch friend Request') 
        }
        const friends = await FriendModel.find({friend: req.session.id, status:"requested"}).populate('user','fullname image')
        res.json(friends)
        
    } catch (err : unknown) {
        CatchError(err,res,'failed to fetch friend request')
    }
}

export const deleteFriend = async(req:Request,res:Response) =>{
    try {
        const friendId = req.params.id
        await FriendModel.deleteOne({_id: friendId})
        res.json({
            message:'Friend delete Successfully'
        })
        
    } catch (err:unknown) {
        CatchError(err,res,'Failed to delete friends')
    }
}
export const suggestedFriend = async(req:SessionInterface,res:Response) =>{
    try {
        if(!req.session){
            throw TryError("Failed to suggest friend",401)
        }
        const friends = await AuthModel.aggregate([
            {
                $match:{
                    _id:{
                        $ne:new mongoose.Types.ObjectId(req.session.id)
                    }
                }
            },
            {
                $sample:{size:5}
            },
            {
                $project:{fullname:1,image:1,createdAt:1}
            }
        ])

        const x = await  Promise.all(
           friends.map(async(item)=>{
                const count = await FriendModel.countDocuments({friend: item._id})
                return count === 0 ? item : null
            })
        )
        const filters = x.filter((item)=> item !== null)
        res.json(filters)
        
    } catch (err:unknown) {
        CatchError(err,res,'Failed to fetch suggested friends')
    }
}

export const updateFriendRequest = async(req:Request,res:Response)=>{
    try {
        await FriendModel.updateOne(
            {_id: req.params.id},
            {
                $set:{
                    status : req.body.status
                }
            }
        )
        res.json({
            message: 'Friend Request Accepted'
        })
        
    } catch (err) {
        CatchError(err,res,'Failed to accept friend Request')
    }
}