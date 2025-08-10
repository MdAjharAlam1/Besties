import { Link} from "react-router-dom"
import Card from "../../shared/Card"
import IconButton from "../../shared/IconButton"
import SmallButton from "../../shared/SmallButton"
import type { FC } from "react"
import { useMediaQuery } from "react-responsive"

interface FriendInterface{
    columns?:number,
    gap?:number
}


const FriendList : FC<FriendInterface> = ({columns= 3 , gap=8}) => {
    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    if (isMobile) {
        columns = 2;
    }
  return (
    <div className={ `grid grid-cols-${columns} gap-${gap}`}>
      {
        Array(12).fill(0).map((index)=>{
            return <Card key={index}>
                    <div className="flex flex-col items-center gap-3">
                        <img 
                            src="https://th.bing.com/th/id/OIP.aw2_9W3UMRsvRuSqSJlE1QHaHa?pid=ImgDet&w=195&h=195&c=7&dpr=1.4" 
                            alt="profile image"
                            className='w-[60px] h-[60px] rounded-full object-center' 
                        />
                        <h1>Md Ajhat Alam</h1>
                        <div className="relative">
                            <SmallButton type="danger" icon="user-minus-line"> Unfollow</SmallButton>
                            <div className="w-2 h-2 bg-green-400 rounded-full absolute -top-1 -right-1 animate-animated animate-pulse animate-infinite"></div>

                        </div>
                        <div className="flex gap-3 mt-3">
                            <Link to="/app/chat">
                                <IconButton icon="chat-ai-line" type="warning"/>
                            </Link>
                            <Link to="/app/audio-chat">
                                <IconButton icon="phone-line" type="success"/>
                            </Link>
                            <Link to="/app/video-chat">
                                <IconButton icon="video-on-ai-line" type="danger"/>
                            </Link>
                        </div>
                    </div>
                </Card>
        })
      }
    </div>
  )
}

export default FriendList
