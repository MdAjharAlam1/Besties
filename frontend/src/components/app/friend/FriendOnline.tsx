import { useContext, useEffect, useState } from "react"
import Card from "../../shared/Card"
import socket from "../../../lib/socket"
import { Link } from "react-router-dom"
import IconButton from "../../shared/IconButton"
import Context from "../../Context"



const FriendOnline = () => {
  const[onlineFriends, setOnlineFriends] = useState([])
  const {session} = useContext(Context)


  useEffect(()=>{
    const onlineHandler = (users: any) => {
      const filteredUsers = users.filter((user: any) => user.id !== session.id);
      setOnlineFriends(filteredUsers);
    };
      socket.on('online',onlineHandler)

      socket.emit('get-online');
      socket.on("connect", () => {
        socket.emit("get-online");
    });

    return ()=>{
      socket.off('online',onlineHandler)
    }
  },[session])
  return (
    <Card title="Online Friends" divider>

        {
          session && onlineFriends.map((item:any,index:number)=>{
            return <div key={index}>
                    <div className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center lg:gap-3 my-4">
                      <div className="flex gap-4">
                          <img 
                            src={ item.image || "https://th.bing.com/th/id/OIP.aw2_9W3UMRsvRuSqSJlE1QHaHa?pid=ImgDet&w=195&h=195&c=7&dpr=1.4"}
                            alt="" 
                            className="w-12 h-12 rounded-full object-center"
                          />
                          <div>
                            <h1 className="capitalize">{item.fullname}</h1>
                            <label className="text-green-400 text-[14px] font-medium"> Online</label>
                          </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Link to={`/app/chat/${item.id}`} target="_blank">
                          <IconButton icon="chat-ai-line" type="warning"></IconButton>
                        </Link>
                        <Link to={`/app/audio-chat/${item.id}`}>
                          <IconButton icon="phone-line" type="success"></IconButton>
                        </Link>
                        <Link to={`/app/video-chat/${item.id}`}>
                          <IconButton icon="video-on-ai-line" type="danger"></IconButton>
                        </Link>
                      </div>
                    </div>
                  </div>
          })
        }
    </Card>
  )
}

export default FriendOnline
