import useSWR, { mutate } from "swr"
import Card from "../shared/Card"
import Fetcher from "../../lib/Fetcher"
import Error from "../shared/Error"
import { Skeleton } from "antd"
import HttpInterceptor from "../../lib/HttpInterceptor"
import { toast } from "react-toastify"
import CatchError from "../../lib/CatchError"


const Friends = () => {

  const {data,error, isLoading} = useSWR('/friend/all',Fetcher)
  console.log(data)
  if(isLoading){
    return <Skeleton active/>
  }

  if(error){
    return <Error message={error.message}/>
  }


  const unfriend = async(id:string)=>{
    try {
      const{data} = await HttpInterceptor.delete(`/friend/${id}`)
      toast.success(data.message)
      mutate('/friend/all')
      
    } catch (err:any) {
      CatchError(err)
    }
  }

  return (
    <div className="grid grid-cols-3 gap-8">
      {
        data.map((item:any,index:number)=>{
          return <Card key={index}>
              <div className="flex flex-col items-center gap-3">
                <img 
                  src={item.friend.image || "https://th.bing.com/th/id/OIP.aw2_9W3UMRsvRuSqSJlE1QHaHa?pid=ImgDet&w=195&h=195&c=7&dpr=1.4"}
                  className="w-18 h-18 rounded-full object-center"
                />
                <h1 className="text-base font-medium capitalize text-black">{item.friend.fullname}</h1>
                {
                  item.status === "accepted" ?
                  <button onClick={()=> unfriend(item._id)} className="bg-rose-400 text-white px-2 py-1 text-xs hover:bg-rose-500 mt-1 ">
                    <i className="ri-user-minus-line mr-1"></i>
                    Unfriend
                  </button>
                  :
                  <button className="bg-green-400 text-white px-2 py-1 text-xs hover:bg-gray-400 mt-1 ">
                    <i className="ri-check-double-line mr-1"></i>
                    Request Sent
                  </button>
                }
              </div>

          </Card>
        })
      }
    </div>
  )
}

export default Friends
