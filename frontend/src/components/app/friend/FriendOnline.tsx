import { useEffect } from "react"
import Card from "../../shared/Card"
import socket from "../../../lib/Socket"

const FriendOnline = () => {
    useEffect(()=>{
        socket.on('connect',()=>{
            console.log('I am connected')
        })
    },[])
  return (
    <Card title="Online Friends" divider>
        <div>{socket.connected.toString()}</div>
    </Card>
  )
}

export default FriendOnline
