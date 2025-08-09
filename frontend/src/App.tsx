import { BrowserRouter,Route,Routes } from "react-router-dom"
import 'remixicon/fonts/remixicon.css'
import 'font-awesome/css/font-awesome.min.css'
import 'animate.css';
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Layout from "./components/app/Layout"
import Dashboard from "./components/app/Dashboard"
import Friends from "./components/app/Friends"
import Video from "./components/app/Video"
import Audio from "./components/app/Audio";
import Chat from "./components/app/Chat";
import Post from "./components/app/Post";
import NotFoundPage from "./components/NotFoundPage";
import Context from "./components/Context";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import AuthGaurd from "./gaurds/AuthGaurd";
import RedirectGaurd from "./gaurds/RedirectGaurd";

const App = () => {
  const[session,setSession] = useState(null)
  return (
    <Context.Provider value={{session,setSession}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route element = {<RedirectGaurd/>}>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </Route>
          <Route element = {<AuthGaurd/>}>
            <Route path="/app" element={<Layout/>}>
              <Route path="dashboard" element={<Dashboard/>}/>
              <Route path="friends" element={<Friends/>}/>
              <Route path="my-posts" element={<Post/>}/>
              <Route path="video-chat" element={<Video/>}/>
              <Route path="audio-chat" element={<Audio/>}/>
              <Route path="chat" element={<Chat/>}/>
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App
