const mongoose =require('mongoose')
require('dotenv').config()

mongoose.connect('mongodb+srv://altamash2c2:altamash2c2@cluster0.koqh6pe.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log('Database is connected')
})
.catch((err)=>{
    console.log(err)
})