// To control the sync function
import {useState, useEffect} from 'react'
import Axios from "axios"

export default function App() {


  const api = "http://localhost:3001"

  const [users, setUser] = useState([])

  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [email, setEmail] = useState("")
 

useEffect(()=>{
  Axios.get(`${api}/users`)
  .then(res => setUser(res.data))
  // Initial value: so that I do not need to update the site
},[users])



const createUser = () =>{
  if(name && age && email){
  // send name age and email to root
  Axios.post(`${api}/createUser`,{name, age, email})
  .then(res => res.data)
  }
}


  return (
  <>

  {users.map(({_id, name, age, email})=> {
    return(
      <div className="card" key={_id}>
      <ul>
        <li>Name: {name}</li>
        <li>Age: {age}</li>
        <li>email: {email}</li>
      </ul>
      </div>
    )
  })}


<div>
  <input type='text' placeholder='Name' onChange={e=>setName(e.target.value)}/>
  <input type='number' placeholder='Age' onChange={e=>setAge(e.target.value)}/>
  <input type='text' placeholder='Email' onChange={e=>setEmail(e.target.value)}/>
  <button onClick={createUser}>Create User</button>
</div>


  </>
  );
}
