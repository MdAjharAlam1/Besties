import { Server } from "socket.io"


const onlineUsers = new Set()

const StatusSocket = (io : Server)  =>{
    io.on('connection',(socket)=>{
        onlineUsers.add(socket.id)

        io.emit('online',Array.from(onlineUsers))
        console.log(onlineUsers)

        socket.on('disconnect',()=>{
            onlineUsers.delete(socket.id)
            io.emit('online', Array.from(onlineUsers))
            console.log(onlineUsers)
        })
    })
}
export default StatusSocket