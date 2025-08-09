import mongoose, { model } from 'mongoose'

const friendSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref:'Auth'
    },
    friend:{
        type:mongoose.Types.ObjectId,
        ref:'Auth'
    },
    status:{
        type:String,
        enum:['requested','accepted'],
        default:'requested'
    }
    
},{timestamps:true})


friendSchema.pre('save',async function(next){
    try {
        const count = await model('Friend').countDocuments({user:this.user,friend:this.friend})
        if(count > 0 ){
            throw next(new Error('Friend Request Already Sent'))
        }
        next()
    } catch (error) {
        throw next(new Error('Failed to send friend request'))
    }
})

const FriendModel = mongoose.model('Friend',friendSchema)
export default FriendModel