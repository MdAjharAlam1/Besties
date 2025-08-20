import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    from:{
        type:mongoose.Types.ObjectId,
        ref:"Auth",
        required:true
    },
    to:{
        type:mongoose.Types.ObjectId,
        ref:"Auth",
        required:true
    },
    message:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    files:{
        path:{
            type:String
        },
        type:{
            type:String
        }
    }
},{timestamps:true})

const ChatModel = mongoose.model("Chat", chatSchema)

export default ChatModel