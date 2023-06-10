import {useState} from "react"

import Axios from "axios"
import AuthForm from "../Auth"

  const Register = () =>{

    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")
    const onSubmit = async(e) => {
      //In order not to reload the page
      e.preventDefault()
      await Axios.post("http://localhost:3001/register",{username, password})
      alert("Admin Created")
    }
  
    return (
        <AuthForm
      label="Register"
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit={onSubmit}
      />
    )
  }

  export default Register