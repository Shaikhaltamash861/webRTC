import React, { useEffect, useRef, useState } from 'react'
import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder";
import axios from 'axios'
import url from '../routes/baseUrl';

function Home({user}) {

    const [state,setState]=useState(false)
    const [mywindow,setWindow]=useState(false)
   console.log(user)
    const upload=async(videoBlob)=> {
        const audioBlob = await fetch(videoBlob).then((r) => r.blob());
        const audioFile = new File([audioBlob], 'video.wav', { type: 'video/webm' });
        const formdata = new FormData();
        formdata.append('file',audioFile);
        formdata.append('upload_preset','insta_clone')
        formdata.append('cloud-name','dwtnjp4gb')
    
        try {
          const response = await axios.post(`https://api.cloudinary.com/v1_1/cloud2shaikh/video/upload`,formdata);
          console.log('uploaded successfully:', response.data);
          if(response.data.url){
            const {data}=await axios.post(url+'/api/post',{
              postedBy:user?._id,
              video:response.data.url
            })
          if(data.success){
            window.alert('uploaded')
          }
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    async function playVideoFromCamera() {
        try {
            const constraints = {'video': true, 'audio': true};
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            const videoElement = document.querySelector('video');
            videoElement.srcObject = stream;  

        } catch(error) {
            console.error('Error opening video camera.', error);
        }
    }
    const {status,startRecording,stopRecording,mediaBlobUrl}=useReactMediaRecorder({video:true,screen:true,audio:true})
    const stop=()=>{
           setState(true)
           stopRecording()
           setWindow(false)
    }
    const start=()=>{
       startRecording()
       playVideoFromCamera()
       setWindow(true)
    }
   
    const handler=()=>{
      setState(false) 
      location.reload()
        mediaBlobUrl.replace('')
    }
  return (
    <div style={{
        position:'relative'
    }}>
        {/* <video src='http://res.cloudinary.com/cloud2shaikh/video/upload/v1694247765/zngf5b8taxdcv7qxkrjl.mkv' playsInline controls={true}></video> */}

{
    mywindow &&
        <video style={{
            position:'fixed',
            bottom:'5px',
            right:'5px'
            
        }}  width="320" height="240"   playsInline autoPlay={true} controls={true} ></video>
    }
       
      <div>
          <p style={{
            position:'fixed',
            top:'5px',
            left:'5px',
            background:'green',
            padding:'5px',
            borderRadius:'4px'
            
        }}>status: <span style={{color:'white'}}>
          {status}
          </span>
          </p>
          <div style={{
            position:'fixed',
            bottom:'5px',
            left:'45%',
            
            
        }}>
           {
            !mywindow?(
                  <>
                <button style={{
                    background:'red',
                  outline:'none',
                  border:'none',
                  height:'30px',
                  padding:'5px',
                  borderRadius:'4px',
                  cursor:'pointer',
                  marginRight:'10px'
                }} onClick={handler}>Back</button>
                <button style={{
                    background:'green',
                  outline:'none',
                  border:'none',
                  height:'30px',
                  padding:'5px',
                  borderRadius:'4px',
                  cursor:'pointer'
                }} onClick={start}>Start Recording</button>
                {
               mediaBlobUrl&& <button style={{
                background:'green',
              outline:'none',
              border:'none',
              height:'30px',
              padding:'5px',
              borderRadius:'4px',
              cursor:'pointer',
              marginLeft:'5px'
            }} onClick={()=>upload(mediaBlobUrl)}>Upload</button>

                }
                </>
            ):(

                <button style={{
                    background:'red',
                    outline:'none',
                    border:'none',
                    height:'30px',
                    marginLeft:'5px',
                    padding:'5px',
                    borderRadius:'4px',
                    cursor:'pointer'
                    
                }} onClick={stop}>Stop Recording</button>
                )
               }
          </div>
          {
            state&&

                <video style={{width:'100%',height:'83vh'}} src={mediaBlobUrl} controls={true} autoPlay={false} loop />
            
          }
        </div>
    </div>
  )
}

export default Home