import Context from "./Context"
import { useContext } from "react"

const Home = () => {
  const{session,setSession}= useContext(Context)
  setSession("Ajhar Alam")

  console.log(session)
  return (
    <div>
      Home Page
    </div>
  )
}

export default Home
