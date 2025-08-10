import { Link, Outlet, useLocation,useNavigate} from "react-router-dom"
import Avatar from "../shared/Avatar"
import Card from "../shared/Card"
import { useContext, useEffect, useState } from "react"    
import Dashboard from "./Dashboard"
import Context from "../Context"
import HttpInterceptor from "../../lib/HttpInterceptor"
import useSWR, { mutate } from 'swr'
import Fetcher from "../../lib/Fetcher"
import{v4 as uuid} from 'uuid'
import CatchError from "../../lib/CatchError"
import FriendSuggestion from "./friend/FriendSuggestion"
import FriendRequest from "./friend/FriendRequest"
import FriendList from "./friend/FriendList"
import { useMediaQuery } from 'react-responsive'
import Logo from "../shared/Logo"
import IconButton from "../shared/IconButton"
import FriendOnline from "./friend/FriendOnline"


const EightMinutesInMs = (8*60)*1000

const Layout = () => {
    const navigate = useNavigate()
    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const[leftAsideSize,setLeftAsideSize] = useState(0)
    const rightAsideSize = 450
    const [collapseSize, setCollapseSize] = useState(0)
    const sectionDimention = {
        width : isMobile ? "100%" :`calc(100% - ${leftAsideSize + rightAsideSize}px)`,
        marginLeft: isMobile ? 0: leftAsideSize
    }
    const {pathname} = useLocation()
    const{error} = useSWR('/auth/refresh-token',Fetcher ,{
        refreshInterval : EightMinutesInMs,
        shouldRetryOnError : false
    })

    const{session,setSession} = useContext(Context)

    const friendUiBlackLists = [
        "/app/friends",
        "/app/chat",
        "/app/audio-chat",
        "/app/video-chat"
    ]

    const isBlackListed = friendUiBlackLists.some((path)=> pathname === path)

    const Menu = [
        {
            icon:"ri-home-9-line", 
            href:"/app/dashboard",
            label:"dashboard"
        },
        {
            icon:"ri-chat-smile-line",
            href:"/app/my-posts",
            label:"my posts"
        },
        {
            icon:"ri-group-line",
            href:"/app/friends",
            label:"friends"
        },
        

    ]
    
    const logout = async()=>{
        try {
            console.log('ajhar')
            await HttpInterceptor.post('/auth/logout')
            navigate('/login')
            
        } catch (err:unknown) {
            CatchError(err)
        }
    }
    
    useEffect(()=>{
        setLeftAsideSize(isMobile ? 0: 350)
        setCollapseSize(isMobile ? 0 : 140 )
    },[isMobile])

    useEffect(()=>{
        if(error){
            logout()
        }
    },[error])

    const getPathname = (path:string) =>{
        const firstPath = path.split('/').pop()
        const finalPath = firstPath?.split("-").join(" ")
        return finalPath
    }

    const uploadImage = () =>{
        const input = document.createElement('input')
        input.type = "file"
        input.accept = "image/*"
        input.click()
        input.onchange = async() =>{
            if(!input.files){
                return
            }
            const file = input.files[0]
            const path = `profile-picture/${uuid()}.png`
            try {
                const payload = {
                    path : path,
                    type : file.type,
                    status: "public-read"
                }

                const options = {
                    headers :{
                        'Content-Type' : file.type
                    }
                }
                const {data} = await HttpInterceptor.post('/storage/upload', payload)
                await HttpInterceptor.put(data.url , file , options)
                const {data:user} = await HttpInterceptor.put('/auth/profile-picture',{path})
                // console.log(user)
                setSession({...session, image: user.image})
                mutate('/auth/refresh-token')
            } catch (err) {
                console.log(err)
            }
        }
    
    }

    // const download = async() =>{
    //     try {
    //         const payload = {
    //             path:'temp/hello.png'
    //         }
    //         const {data} = await HttpInterceptor.post('/storage/download',payload)
    //         const a = document.createElement('a')
    //         a.href = data.url
    //         a.download
    //         a.click()
    //         console.log(data)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
  return (
    <div className="min-h-screen">

        <nav className="lg:hidden flex z-[2000] items-center justify-between bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 sticky top-0 left-0 w-full py-4 px-6 ">
            <Logo/>
            <div className="flex items-center gap-4">
                <IconButton onClick={logout} icon="logout-circle-line" type="success"/>
                <Link to="/app/friends">
                    <IconButton icon="chat-ai-line" type="danger"/>
                </Link>
                <IconButton onClick={()=>setLeftAsideSize(leftAsideSize === 300 ? collapseSize : 300)} icon="menu-3-line" type="warning"/>
            </div>
        </nav>

        <aside className="bg-white h-full fixed top-0 left-0 lg:p-8 overflow-auto z-[230000]" style={{width:leftAsideSize,transition:"0.3s"}}>
            <div className="space-y-8 bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 lg:rounded-2xl h-full p-8">
                {
                    leftAsideSize === collapseSize ?
                    <i className="ri-user-fill text-white text-xl animate__animated animate__fadeIn"></i>
                    :
                    <div className="animate__animated animate__fadeIn">
                        {
                            session &&
                            <Avatar
                                titleColor="#ffd"
                                title={session.fullname}
                                subtitle={session.email}
                                size="lg"
                                image= {session.image || "https://th.bing.com/th/id/OIP.aw2_9W3UMRsvRuSqSJlE1QHaHa?pid=ImgDet&w=195&h=195&c=7&dpr=1.4"}
                                onClick = {uploadImage}
                            />
                        }
                    </div>
                        
                }
                <div>
                    {
                        Menu.map((item,index)=>{
                            return <Link key={index} to={item.href} className="flex items-center gap-2 text-gray-300 py-3 hover:text-white">
                                        <i className={`${item.icon} text-lg`} title={item.label}></i>
                                        <label className={`capitalize ${leftAsideSize === collapseSize ? 'hidden' : ''}`}>{item.label}</label>
                                    </Link>
                        })
                    }
                    <button onClick={()=> logout()} className="flex items-center gap-2 text-gray-300 py-3 hover:text-white">
                        <i className="ri-logout-circle-r-line text-xl" title="Logout"></i>
                        <label className={`${leftAsideSize === collapseSize ? 'hidden' : ''}`}>Logout</label>
                    </button>
                </div>
            </div>
        </aside>
        <section className="lg:py-8 lg:px-1 p-5 space-y-12 rounded-2xl" style={{width:sectionDimention.width, marginLeft:sectionDimention.marginLeft}}>
            
            {
                !isBlackListed &&
                <FriendRequest/>
            }
            <Card title={
                <div className="flex items-center gap-5">
                        <button className=" lg:block hidden w-8 h-8 rounded-full bg-gray-100 hover:bg-slate-200" onClick={()=>setLeftAsideSize(leftAsideSize === 350 ? collapseSize : 350)}>
                            <i className="ri-arrow-left-line"></i>
                        </button>
                        <h1>{getPathname(pathname)}</h1>
                    </div>
                } 
                divider
            >  
                {
                    pathname === "/app" ?
                    <Dashboard/>
                    :
                    <Outlet/>
                }
               
            </Card>
            {
                !isBlackListed &&
                <FriendSuggestion/>
            }
        </section>
        <aside 
            className="lg:block hidden bg-white h-full fixed top-0 right-0 py-8 px-8 overflow-auto space-y-8" 
            style={{
                width:rightAsideSize,
                transition:'0.2s'
            }}>
            {/* <div className="overflow-auto">
                {
                    !isBlackListed &&
                    <Card
                        title="Friends" 
                        divider
                    >
                        <FriendList columns={2} gap={6}/>
                    </Card> 
                }

            </div> */}
            <FriendOnline/>
        </aside>

    </div>


  )
}

export default Layout
