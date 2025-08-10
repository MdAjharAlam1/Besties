import Button from "../shared/Button"
import Card from "../shared/Card"
import Divider from "../shared/Divider"
import IconButton from "../shared/IconButton"


const Post = () => {
  return (
    <div className="space-y-6">
      {
        Array(20).fill(0).map((index)=>{
          return <Card key={index}
          > 
            <div className="space-y-4">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae hic impedit, libero ullam reprehenderit maxime nisi, magni velit aliquam fugit provident illo ratione explicabo perspiciatis neque consectetur officiis, aut temporibus?
              </p>
              <div className="flex items-center justify-between">
                <label className="text-sm font-normal"> Jan 2 , 2030 07:00 Pm</label>
                <div className="flex items-center gap-3">
                  <IconButton type="primary" icon="edit-line"/>
                  <IconButton type="danger" icon="delete-bin-4-line"/>
                </div>
              </div>
              <Divider/>
              <div className="space-x-4 lg:space-y-0 space-y-3">
                <Button type="info" icon="thumb-up-line">20K</Button>
                <Button type="warning" icon="thumb-down-line">20K</Button>
                <Button type="danger" icon="chat-ai-line">20K</Button>
              </div>
            </div>
          </Card>
        })
      }
    </div>
  )
}

export default Post
