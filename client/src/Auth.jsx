import { useState } from "react"
import Axios from "axios"
import  {useCookies} from 'react-cookie'

import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Form, Button} from 'react-bootstrap'
import { Login, Register } from "./runapp"


const Auth = () => {
  const [cookies, setCookies] = useCookies("access_token")

  const removeItem = () =>{
    //meaning make it empty
    setCookies("access_token", "")
    window.localStorage.removeItem("userID")
    // window.localStorage.clear()
    window.location.reload(false)
  }



  return (
    <>
      {
        cookies.access_token? 
        <Button variant = "danger" onClick={removeItem}>LogOut</Button> :
        (
          <>
            <Login/>
            <Register/>
          </>
        )
      }
    </>
  )
}


















// const Register = () =>{

//   const [username , setUsername] = useState("")
//   const [password , setPassword] = useState("")
//   const onSubmit = async(e) => {
//     //In order not to reload the page
//     e.preventDefault()
//     await Axios.post("http://localhost:3001/register",{username, password})
//     alert("Admin Created")
//   }

//   return (
//     <AuthForm
//     label="Register"
//     username={username}
//     setUsername={setUsername}
//     password={password}
//     setPassword={setPassword}
//     onSubmit={onSubmit}
//     />
//   )
// }



// const Login = () =>{

//   const [username , setUsername] = useState("")
//   const [password , setPassword] = useState("")

//   const [_, setCookies] = useCookies(["accsee_token"])

//   const onSubmit = async(e) => {
//     //In order not to reload the page
//     e.preventDefault()
//      const respawn = await Axios.post("http://localhost:3001/login",{username, password})
//      setCookies("access_token" , respawn.data.token)
//      window.localStorage.setItem("userID", respawn.data.adminID)
//      window.location.reload(false)


//     console.log(respawn)
//   }

//   return (
//     <AuthForm
//     label="login"
//     username={username}
//     setUsername={setUsername}
//     password={password}
//     setPassword={setPassword}
//     onSubmit={onSubmit}
//     />
//   )
// }


const AuthForm = ({label, username, setUsername, password, setPassword, onSubmit}) =>{

    return (

      <Container>
        <Form className="form" onSubmit={onSubmit}>
            <h2 className="text-white">{label}</h2>

              <Form.Control type="text" placeholder="Name"
                            id = "username" value={username}
                            onChange={e => setUsername(e.target.value)}
              />

              <Form.Control type="text" placeholder="Password" 
                            id="password" value={password}
                            onChange={e => setPassword(e.target.value)}
              />

              <Button style={{width:"100%"}} variant="success" type="submit">{label}</Button>
        </Form>
      </Container>
    )
}



export default (AuthForm, Auth)
