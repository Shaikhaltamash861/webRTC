import React, { useState } from 'react'
import './register.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import url from '../../routes/baseUrl'

function Register({getUser}) {
  const navigate=useNavigate()
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const create=async(e)=>{
    e.preventDefault()
    const {data}=await axios.post(url+'/api/signup',{
      name:name,
      email:email,
      password:password
    })
    if(data.status){
      getUser(data.user)
      navigate('/')
    }

  }
  return (
    <div className='login'>
    <div className='card'>
    <h2>Create Account</h2>
        
        <input type='text' placeholder='Name' onChange={(e)=>setName(e.target.value)}/>
        <input type='text' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
        <input type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={create}>Register</button>
        <p>don't have account<span onClick={()=>navigate('/login')}>   click</span></p>
    </div>
</div>
  )
}

export default Register