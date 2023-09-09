const express=require('express')
const app=express()
require('./connection/connect')
const cors=require('cors')
const bodyParser=require('body-parser')
const router=require('./routes/Router')
const PORT=process.env.PORT || 8000;
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/api',router);
app.get('/test',(req,res)=>{
    res.send(`i am live at ${PORT}`)
})
app.listen(PORT,()=>console.log(`App is running on ${PORT}`))