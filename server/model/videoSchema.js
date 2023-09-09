const mongoose=require('mongoose')
const schema=mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    video:{
        type:String
    }, 
    createdAt: {
        type: Date,
        default: Date.now,
    }
})
const model=mongoose.model('videos',schema)
module.exports=model;