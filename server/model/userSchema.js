const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    token:{
     type:String
    },
    name: {
    type: String,
    required: [true, "Please enter name"]
},
email: {
    type: String,
    required: [true, "Please enter email"],
    unique: [true, "Email already exists"],
},
password: {
    type: String,
    required: [true, "Please enter password"],
}
,videos: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "videos",
    }
],

});
const model=mongoose.model('USER',schema);
module.exports=model;