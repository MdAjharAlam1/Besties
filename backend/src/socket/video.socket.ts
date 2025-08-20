import { Server } from "socket.io";


const VideoScoket = (io:Server) =>{
    io.on('connection',(socket)=>{
        console.log("User Connected")

        socket.on("offer",({offer, to})=>{
            io.to(to).emit("offer",{offer, from: socket.id})
        })
        
        socket.on("candidate",({candidate,to})=>{
            io.to(to).emit("candidate",{
                candidate,
                from: socket.id
            })
        })
        
        socket.on("answer",({answer,to})=>{
            console.log(answer,to)
            io.to(to).emit("answer",{answer,from:socket.id})
        })

        socket.on("end",({to})=>{
            io.to(to).emit("end",{from:socket.id})
        })
        
    })
}

export default VideoScoket