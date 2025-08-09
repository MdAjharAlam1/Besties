import Button from "../shared/Button"
import Card from "../shared/Card"

const Audio = () => {
  return (
    <div className="space-y-8">
        <div className="grid grid-cols-2 gap-4">    
            <Card title="Md Ajhar Alam">
                <div className="flex flex-col items-center">
                    <img 
                        src="https://th.bing.com/th/id/OIP.aw2_9W3UMRsvRuSqSJlE1QHaHa?pid=ImgDet&w=195&h=195&c=7&dpr=1.4"  
                        alt="user-1 image" 
                        className="w-40 h-40 rounded-full object-cover"
                    />
                </div>
            </Card>
            <Card title="Rahul Kumar">
                <div className="flex flex-col items-center">
                    <img 
                        src="https://th.bing.com/th/id/OIP.aw2_9W3UMRsvRuSqSJlE1QHaHa?pid=ImgDet&w=195&h=195&c=7&dpr=1.4"  
                        alt="user-1 image" 
                         className="w-40 h-40 rounded-full object-cover"
                    />
                </div>
            </Card>
        </div> 
      <div className="flex items-center justify-between">
        <div className="space-x-6">
            <button className="bg-amber-500 text-white w-12 h-12 rounded-full hover:bg-amber-400 hover:text-white ">
                <i className="ri-mic-line" title="microphone"></i>
            </button>
        </div>
        <Button icon="close-circle-fill" type="danger">
            End
        </Button>
      </div>
    </div> 
  )
}

export default Audio
