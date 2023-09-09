import React,{useState,useEffect} from 'react'
import './nav.css'
function Nav({user}) {
   

    const logout=()=>{
        localStorage.clear()
        location.reload()
    }

  return (
    <>
      {
          user&&
          <div className='nav'>
       
       <p onClick={logout}>logout</p>
        
        </div>
       
    }
    </>
  )
}

export default Nav