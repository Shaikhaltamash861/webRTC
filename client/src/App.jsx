import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, useLocation ,useParams, json } from 'react-router-dom';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Home from './components/Home';
import Nav from './components/Nav';

function App() {
 
  const [user,setUser]=useState('')
  useEffect(()=>{
    const data=localStorage?.getItem('login')
    if(data){

      const item=JSON.parse(data)
      setUser(item?.user)
    }

  },[])
  
 const getUser=(item)=>{
  setUser(item.user)
 }
  return (<>
  <Nav user={user}/>
   <Routes>
       <Route path="/" element={ 
         user? (<Home user={user}/>):<Login getUser={getUser}/>} 
         />
       <Route path="/login" element={<Login getUser={getUser}/>} />
       <Route path="/register" element={<Register getUser={getUser} />} />
   </Routes>
         </>
  )
}

export default App
