import Avatar from "../shared/Avatar"
import Button from "../shared/Button"
import Input from "../shared/Input"


const Chat = () => {
  return (
    <div>
        <div className="h-[500px] overflow-auto space-y-12">
            {
                Array(20).fill(0).map((index)=>{
                    return <div className="space-y-12" key={index}>
                            <div className="flex items-start gap-6">
                                <Avatar image="https://th.bing.com/th/id/OIP.aw2_9W3UMRsvRuSqSJlE1QHaHa?pid=ImgDet&w=195&h=195&c=7&dpr=1.4" size="md"/>
                                <div className="bg-rose-50 relative px-4 py-2 rounded-lg flex-1 text-pink-500 border border-rose-100">
                                    <h1 className="font-medium text-black">Md Ajhar Alam</h1>
                                    <label>
                                        Lorem ipsum dolor sit amet  fugit sunt ipsum dolorum alias delectus officiis optio nemo, odit tempora unde quas, atque laudantium, velit magni blanditiis accusamus impedit.
                                    </label>
                                    <i className="ri-arrow-left-s-fill text-4xl absolute top-0 -left-5 text-rose-50"></i>
                                </div>
                            </div>
                            <div className="flex items-start gap-6">
                                <div className="bg-violet-50 relative px-4 py-2 rounded-lg flex-1 text-blue-500 border border-violet-100">
                                    <h1 className="font-medium text-black">Rahul Kumar</h1>
                                    <label>
                                        Lorem ipsum dolor sit amet  fugit sunt ipsum dolorum alias delectus officiis optio nemo, odit tempora unde quas, atque laudantium, velit magni blanditiis accusamus impedit.
                                    </label>
                                    <i className="ri-arrow-right-s-fill text-4xl absolute top-0 -right-5 text-violet-50"></i>
                                </div>
                                <Avatar image="https://th.bing.com/th/id/OIP.aw2_9W3UMRsvRuSqSJlE1QHaHa?pid=ImgDet&w=195&h=195&c=7&dpr=1.4" size="md"/>
                            </div>
                        </div>
                })
            }
        </div>
        <div className="p-3 mt-2">
            <div className="flex items-center gap-4">
                <form className="flex items-center gap-4 flex-1">
                    <Input name="message" placeholder="Type your message here"/>
                    <Button type="secondary" icon="send-plane-fill">Send</Button>
                </form>
                <button className="w-12 h-12 rounded-full bg-rose-50 text-rose-400 hover:bg-rose-400 hover:text-white  ">
                    <i className="ri-attachment-2"></i>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Chat
