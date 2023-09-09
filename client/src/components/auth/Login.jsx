import React, { useState } from 'react'
import './login.css'
import axios from 'axios'
import url from '../../routes/baseUrl'
import { useNavigate } from 'react-router-dom'
function Login({getUser}) {
  const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const login=async(e)=>{
     
      e.preventDefault()
      const {data}=await axios.post(url+'/api/signin',{
        email:email,
        password:password
      })
      if(data.status){
        localStorage.setItem('login',JSON.stringify({
          login:true,
          user:data.user
        }))
        getUser(data)
        navigate('/')
      }
      else{
        alert(data.message)
        console.log(data)
      }
     
    }
  return (
    <div className='login'>
        <div className='card'>
        <h2>Login</h2>
            <input type='text' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
            <input type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={login}>Login</button>
            <p>don't have account<span onClick={()=>navigate('/register')}>   click</span></p>
        </div>
    </div>
  )
}

export default Login