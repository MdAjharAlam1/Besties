import { useContext, useEffect, useRef, useState } from "react"
import Button from "../shared/Button"
import CatchError from "../../lib/CatchError"
import { toast } from "react-toastify"
import Context from "../Context"
import socket from "../../lib/socket"
import { useParams } from "react-router-dom"
import { notification } from "antd"
import '@ant-design/v5-patch-for-react-19';

const config = {
    iceServers: [
        {
          urls: "stun:stun.l.google.com:19302" // Free Google STUN server
        },
    ]
}

type CallType = "pending" | "calling" | "incoming" | "talking" |"end"

type AudioSrcType = "/sound/ring.mp3" | "/sound/reject.mp3" | "/sound/busy.mp3"

interface onOfferInterface{
    offer: RTCSessionDescriptionInit
    from: string
}
interface onAnswerInterface{
    answer: RTCSessionDescriptionInit
    from: string
}

interface onCandidateInterface {
    candidate: RTCIceCandidateInit
    from:string
}

function getCallTiming(seconds:number): string{
    const hrs = Math.floor(seconds/3600)
    .toString().padStart(2,'0')

    const mins = Math.floor((seconds % 3600) / 60)
    .toString().padStart(2,'0')

    const secs = Math.floor(seconds % 60)
    .toString().padStart(2,'0')

    return `${hrs}:${mins}:${secs}`
}

const Video = () => {
    const {session} =  useContext(Context)
    const {id} = useParams()
    const[notify, notifyUi] = notification.useNotification()

    const localVideoContainerRef = useRef<HTMLDivElement | null>(null)
    const localVideoRef = useRef<HTMLVideoElement | null>(null)
    const remoteVideoContainerRef = useRef<HTMLDivElement | null>(null)
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null)
    const localStreamRef =  useRef<MediaStream | null>(null)
    const webRtcRef = useRef<RTCPeerConnection | null >(null)
    const audio = useRef<HTMLAudioElement | null>(null)

    const [isVideoSharing, setIsVideoSharing] = useState(false)
    const [isScreenSharing, setIsScreenSharing] = useState(false)
    const[isMic , setIsMic] = useState(false)
    const[callStatus, setCallStatus] = useState<CallType>("pending")
    const[timer, setTimer] = useState(0)

    const stopAudio = () =>{
        if(!audio.current){
            return
        }
        const player = audio.current
        player.pause()
        player.currentTime = 0
    }

    const playAudio = (src:AudioSrcType, loop:boolean = false) =>{
        stopAudio()
        if(!audio.current){
            audio.current = new Audio()
        }

        const player = audio.current
        player.src = src
        player.loop = loop
        player.load()
        player.play()
    }

    const toggleVideo = async() =>{
        try {
            const localVideo = localVideoRef.current
            if(!localVideo){
                return
            }

            if(!isVideoSharing){
                
                const stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true})
        
                localVideo.srcObject = stream
                localStreamRef.current = stream
                setIsVideoSharing(true)
                setIsMic(true)
            }
            else{
                const localStream = localStreamRef.current
                if(!localStream){
                    return 
                }
                localStream.getTracks().forEach((track)=>{
                    track.stop()
                    localVideo.srcObject = null
                    localStreamRef.current = null
                })
                setIsVideoSharing(false)
                setIsMic(false)
            }
            
        } catch (err) {
            CatchError(err)
        }
    }
    const toggleAudio = () =>{
        try {
            const localStream = localStreamRef.current
            if(!localStream){
                return
            }
            const audioTrack =  localStream.getTracks().find((tracks)=> tracks.kind === "audio")
            if(audioTrack){
                audioTrack.enabled = !audioTrack.enabled
                setIsMic(audioTrack.enabled)
            }
            
        } catch (err) {
            CatchError(err)
        }
        
    }
    const toggleScreenSharing = async() =>{
        try {
            const localVideo = localVideoRef.current
            if(!localVideo){
                return
            }
            if(!isScreenSharing){
                const stream = await navigator.mediaDevices.getDisplayMedia({video:true , audio:true})
                
                localVideo.srcObject = stream
                localStreamRef.current = stream
                setIsScreenSharing(true)
                setIsMic(true)
                
            }
            else{
                const localStream = localStreamRef.current
                if(!localStream){
                    return
                }
                localStream.getTracks().forEach((track)=>{
                    track.stop()
                    localStreamRef.current = null
                    localVideo.srcObject = null
                })
                setIsScreenSharing(false)
                setIsMic(false)
            }
            
        } catch (err) {
            CatchError(err)
        }
    }
    const toggleFullScreen =  (type:"local" | "remote") => {
        if(!isVideoSharing && !isScreenSharing){
            return toast.warn("Please on video first !")
        }
        const videoContainer = type === "local" ? localVideoContainerRef.current : remoteVideoContainerRef.current

        if(!videoContainer){
            return
        }
        if(!document.fullscreenElement){
            videoContainer.requestFullscreen()
        }
        else{
            document.exitFullscreen()
        }
    }

    const webRtcConnection = () =>{
        webRtcRef.current = new RTCPeerConnection(config)
        const localStream = localStreamRef.current
        if(!localStream){
            return
        }
        localStream.getTracks().forEach((track)=>{
            webRtcRef.current?.addTrack(track,localStream)
        })
        
        webRtcRef.current.onicecandidate = (e) =>{    // show public  ip address of connected user 
            if(e.candidate){
                // console.log(e.candidate)
                socket.emit("candidate",{
                    candidate: e.candidate,
                    to: id
                })

            }
        }
        webRtcRef.current.onconnectionstatechange = () =>{    // show the user connected or not 
            console.log(webRtcRef.current?.connectionState)
        }
        
        // remote user send video and other message
        webRtcRef.current.ontrack = (e)=>{
            const remoteStream = e.streams[0]
            const remoteVideo = remoteVideoRef.current

            if(!remoteVideo){
                return
            }

            remoteVideo.srcObject = remoteStream

            const videoTrack = remoteStream.getVideoTracks()[0]
            if(videoTrack){
                // remote user  video off
                videoTrack.onmute = () =>{
                    console.log("remote video on")
                    remoteVideo.style.display = "none"
                }

                videoTrack.onunmute =() =>{
                    console.log("remote video off")
                    remoteVideo.style.display = "block"
                }

                videoTrack.onended = () =>{
                    console.log("remote video end")
                    remoteVideo.srcObject = null
                    remoteVideo.style.display = "none"
                }
            }
        }



    }

    const startCall = async() =>{
        try {
            if(!isVideoSharing && !isScreenSharing){
                toast.warn('Please on Video First !')
            }
             webRtcConnection()

            if(!webRtcRef.current){
                return
            }
            const offer = await webRtcRef.current.createOffer()
            await webRtcRef.current.setLocalDescription(offer)
            setCallStatus("calling")
            playAudio("/sound/ring.mp3",true)
            notify.open({
                message:session.fullname,
                description:"Calling....",
                duration:30,
                placement:"bottomRight",
                onClose :stopAudio,
                actions :[
                    <button onClick={endCall} key="end" className="bg-rose-400 rounded text-white px-3 py-1 hover:bg-rose-500">End Call</button>
                ]
                
            })
            socket.emit("offer",{offer,to:id})
        } catch (err) {
            CatchError(err)
        }
    }

    const acceptCall = async(payload:onOfferInterface) =>{
        try {
      
            webRtcConnection()
            
            if(!webRtcRef.current){
                return
            }
            const offer = new RTCSessionDescription(payload.offer)
            await webRtcRef.current.setRemoteDescription(offer)
          
            const answer = await webRtcRef.current.createAnswer()
            await webRtcRef.current.setLocalDescription(answer)

            notify.destroy()
            setCallStatus("talking")

            socket.emit("answer",{answer, to:id})
            
        } catch (err) {
            CatchError(err)
        }
    }
    // end call for local user
    const endCall = () =>{
        setCallStatus("end")
        socket.emit("end",{to:id})
    }

    // end call for remote user
    const onEnd = () =>{
        endCall()
    }

    const onOffer = (payload:onOfferInterface) =>{
        setCallStatus("incoming")
        notify.open({
        message:"Md Ajhar Alam",
        description:"Incoming Calling........",
        duration:30,
        placement:"bottomRight",
        actions:[
            <div key="calls" className="space-x-5">
                <button onClick={()=>acceptCall(payload)} className="bg-green-400 px-4 py-2 text-white hover:bg-green-500 rounded">Accept</button>
                <button onClick={endCall} className="bg-rose-400 px-4 py-2 text-white hover:bg-rose-500 rounded">Reject</button>
            </div>
        ]
       })
    }

    // connect both user by webrtc 
    const onCandidate = async(payload:onCandidateInterface)=>{
        try {
            if(!webRtcRef.current){
                return
            }

            const candidate = new RTCIceCandidate(payload.candidate)
            await webRtcRef.current.addIceCandidate(candidate)

        } catch (err) {
            CatchError(err)
        }
    }

    const onAnswer = async(payload:onAnswerInterface) =>{
        try {

            if(!webRtcRef.current){
                return
            }
            const answer = new RTCSessionDescription(payload.answer)
            await webRtcRef.current.setRemoteDescription(answer)

            setCallStatus("talking")
            notify.destroy()
        } catch (err) {
            CatchError(err)
        }
    }

    // event listener web socket 
    useEffect(()=>{
        toggleVideo()
        socket.on("offer",onOffer)
        socket.on("candidate",onCandidate)
        socket.on("answer", onAnswer)
        socket.on("end",onEnd)

        return ()=>{
            socket.off("offer", onOffer)
            socket.off("candidate",onCandidate)
            socket.off("answer", onAnswer)
            socket.on("end",onEnd)
        }
    },[])

    



  return (
    <div className="space-y-8">
      <div ref= {remoteVideoContainerRef} className=" bg-black w-full  relative lg:pb-[56.25%] pb-[100%] rounded-xl">
            <video ref={remoteVideoRef}  className="w-full h-full absolute top-0 left-0" autoPlay playsInline></video>
            <button className="absolute bottom-5 left-5 text-xs px-2.5 py-1 rounded-lg text-white" style={{
                background:"rgba(255,255,255,0.1)"
            }}>
                Md Ajhar Alam
            </button>
            <button onClick={()=>toggleFullScreen("remote")} className="absolute bottom-5 right-5 text-xs px-2.5 py-1 rounded-lg text-white hover:scale-125 " style={{
                background:"rgba(255,255,255,0.1)",
                transition:"0.1s"
            }}>
               <i className="ri-fullscreen-line"></i>
            </button>
           
        </div>
        <div className="grid lg:grid-col-3 grid-cols-2 gap-4">    
            <div ref={localVideoContainerRef} className=" bg-black w-full h-0 relative lg:pb-[56.25%] pb-[90%] rounded-xl">
                <video ref={localVideoRef}  className="w-full h-full absolute top-0 left-0" autoPlay playsInline ></video>
                <button className=" capitalize absolute bottom-1 left-1 text-xs px-2.5 py-1 rounded-lg text-white" style={{
                    background:"rgba(0,0,0,0.7)"
                }}>
                    {
                        session && 
                        session.fullname
                    }
                </button>
                <button onClick={()=>toggleFullScreen("local")} className="absolute bottom-1  lg:right-5 right-1 text-xs px-2.5 py-1 rounded-lg text-white hover:scale-125 " style={{
                background:"rgba(0,0,0,0.7)",
                transition:"0.1s"
            }}>
               <i className="ri-fullscreen-line"></i>
            </button>
            </div>
            <Button icon="user-add-line">Add</Button>
        </div> 
      <div className="flex lg:items-center justify-between flex-col gap-8 lg:flex-row">
        <div className="space-x-6">
            <button onClick={toggleVideo} 
                className={`${isVideoSharing ? "bg-green-300" : "bg-green-500"} text-white w-12 h-12 rounded-full hover:bg-green-400 hover:text-white`}>
                {
                    isVideoSharing ?
                    <i className="ri-video-off-line" title="video"></i>
                    :
                    <i className="ri-video-on-ai-line" title="video"></i>
                }
            </button>
            <button onClick={toggleAudio} 
            className={`${isMic ? "bg-amber-300" : "bg-amber-500"} text-white w-12 h-12 rounded-full hover:bg-amber-400 hover:text-white`}>
                {
                    isMic ? 
                    
                    <i className="ri-mic-line" title="microphone"></i>
                    :
                    <i className="ri-mic-off-line" title="Microphone"></i>
                }
            </button>
            <button onClick={toggleScreenSharing} 
            className={`${isScreenSharing ? "bg-blue-300" : "bg-blue-500"} text-white w-12 h-12 rounded-full hover:bg-blue-400 hover:text-white`}>
                {
                    isScreenSharing ?
                    <i className="ri-tv-2-line" title="screen share"></i>
                    :
                    <i className="ri-chat-off-line" title="ScreenShare"></i>

                }
            </button>

        </div>
        <div className="space-x-4">
            {
                callStatus === "talking" &&
                <label>{getCallTiming(timer)}</label>
            }
            {
                ( callStatus ==="pending" || callStatus ==="end" )&& 
                <Button onClick={startCall} icon="phone-line" type="success">Call</Button>
            }
            {
                callStatus === "talking" &&
                <Button onClick={endCall} icon="close-circle-line" type="danger">End</Button>

            }
        </div>
      </div>
      {notifyUi}
    </div>
  )
}

export default Video
