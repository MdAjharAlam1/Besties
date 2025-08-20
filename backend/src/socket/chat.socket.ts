import { Server } from "socket.io"
import { createChats } from "../controllers/chat.controllers"
import { downloadObject } from "../utils/S3"

const ChatSocket = (io:Server) =>{
    io.on('connection', (socket)=>{
        console.log("user connected")
        
        socket.on('message', (payload)=>{
            createChats({
                ...payload,
                from: payload.from.id
            })
            io.to(payload.to).emit('message',{
                from: payload.from,
                message: payload.message
            })
        })

        socket.on("attachment",async(payload)=>{
            createChats({
                ...payload,
                from: payload.from.id
            })
            io.to(payload.to).emit("attachment",{
                from :payload.from,
                message: payload.message,
                files: {
                    path: await downloadObject(payload.files.path),
                    type:payload.files.type
                }
            })
        })
    })
}

export default ChatSocket