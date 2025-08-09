import Fetcher from "../../lib/Fetcher"
import Card from "../shared/Card"
import useSWR, { mutate } from "swr"
import {Empty, Skeleton} from 'antd'
import Error from "../shared/Error"
import { useState } from "react"
import CatchError from "../../lib/CatchError"
import HttpInterceptor from "../../lib/HttpInterceptor"
import SmallButton from "../shared/SmallButton"
import moment from "moment"
import { toast } from "react-toastify"



const SuggestedFriend = () => {
    const [loading,setLoading] = useState({state:false,index:0})
    const{data,error,isLoading} = useSWR('/friend/suggestion',Fetcher)

    const sendFriendRequest = async(id:string,index:number)=>{
        try {
            // console.log(id)
            setLoading({state:true, index})
            await HttpInterceptor.post('/friend',{friend:id})
            toast.success('Friend Request Sent !')
            mutate('/friend/suggestion')
            mutate('/friend/all')
         
        } catch (err) {
            CatchError(err)
        }
        finally{
            setLoading({state:false,index:0})
        }
    }

  return (
    <div className="h-[40%] overflow-auto">
        <Card title="new friend" divider>
            {isLoading && <Skeleton active/>}
            {error && <Error message={error.message}/>}

            {
                data && 
                
                <div className="space-y-6">
                    {
                        data.map((item:any,index:number)=>{
                            // console.log(item)
                            return <div key={index} className="space-y-4">
                                    <div className="flex gap-4 items-start">
                                        
                                        <img
                                            src={item.image || "https://th.bing.com/th/id/OIP.aw2_9W3UMRsvRuSqSJlE1QHaHa?pid=ImgDet&w=195&h=195&c=7&dpr=1.4" } 
                                            alt="avf"
                                            className="w-13 h-13 rounded-full object-center"
                                        />
                                        <div>
                                            <h1 className="capitalize text-black font-medium">{item.fullname}</h1>
                                            <small className="text-gray-400">{moment(item.createdAt).format('DD MMM, YYYY')}</small>
                                        </div>
                                    </div>
                                    <SmallButton loading={loading.state && loading.index == index} onClick={()=>sendFriendRequest(item._id,index)} type="primary" icon="user-add-line">Add Friend</SmallButton>
                                </div>
                            
                        })
                    }
                </div>
                
            }

            {
                (data && data.length === 0 )
                &&
                <Empty/>
            }

        </Card>
    </div>
  )
}

export default SuggestedFriend
