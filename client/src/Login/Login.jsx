import { useState } from "react"
import Axios from "axios"
import  {useCookies} from 'react-cookie'
import AuthForm from "../Auth"


const Login = () =>{

    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")
  
    const [_, setCookies] = useCookies(["accsee_token"])
  
    const onSubmit = async(e) => {
      //In order not to reload the page
      e.preventDefault()
       const respawn = await Axios.post("http://localhost:3001/login",{username, password})
       setCookies("access_token" , respawn.data.token)
       window.localStorage.setItem("userID", respawn.data.adminID)
       window.location.reload(false)
  
  
      console.log(respawn)
    }
  
    return (
      <AuthForm
      label="login"
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit={onSubmit}
      />
    )
  }

  export default Login