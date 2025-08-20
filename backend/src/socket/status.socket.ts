import { Server } from "socket.io"
import * as cookie from 'cookie'
import jwt, { JwtPayload } from 'jsonwebtoken'

const onlineUsers = new Map()

const StatusSocket = (io : Server)  =>{
    io.on('connection',(socket)=>{
       try {
            const rawCookies = socket.handshake.headers.cookie || "";
            const cookies = cookie.parse(rawCookies);
            const accessToken = cookies.accessToken;

            if (!accessToken) {
                throw new Error("Access token not found");
            }

            const user: any = jwt.verify(accessToken, process.env.AUTH_SECRET!) as JwtPayload
            onlineUsers.set(user.id, { ...user, socketId: socket.id });
            socket.join(user.id)

            // console.log(onlineUsers);
            io.emit("online", Array.from(onlineUsers.values()));

        // Scoped event for the specific socket
            socket.on("get-online", () => {
                socket.emit("online", Array.from(onlineUsers.values()));
            });

            socket.on("disconnect", () => {
                onlineUsers.forEach((value, key) => {
                    if (value.socketId === socket.id) {
                        onlineUsers.delete(key);
                    }
                });
                io.emit("online", Array.from(onlineUsers.values()));
            });
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
                socket.disconnect();
            }
        }
    //         const  rawCookies = socket.handshake.headers.cookie || ""
    //         const cookies = cookie.parse(rawCookies)
    //         const accessToken = cookies.accessToken

    //         if(!accessToken) {
    //             throw new Error('access token not found')
    //         }
            
    //         const user = jwt.verify(accessToken, process.env.AUTH_SECRET!)
    //         onlineUsers.set(socket.id, user)

    //         console.log(onlineUsers)
    //         io.emit('online', Array.from(onlineUsers.values()))

    //         io.on("get-online",()=>{
    //             io.emit('online', Array.from(onlineUsers.values()))
    //         })

    //         socket.on('disconnect', ()=>{
    //             onlineUsers.delete(socket.id)
    //             io.emit('online', Array.from(onlineUsers.values()))
    //         })
    //    } catch (err) {
    //         if(err instanceof Error){
    //             console.log(err.message)
    //             socket.disconnect()
    //         }
    //    }
    })
}
export default StatusSocket