const Video =require('../model/videoSchema')
const User=require('../model/userSchema')
const myVideos=async(req,res)=>{
    const _id=req.query._id
    const videos=await Video.find({postedBy:_id})
    res.send(videos)
}
const uploadVideo=async(req,res)=>{
   try {
        
    const post = await Video(req.body);
            const p=await post.save()
    
    const user = await User.findById(req.body.postedBy);
    user?.videos?.push(post._id);
    await user.save();
    res.status(201).json({
        success: true,
        post,
    });
} catch (error) {
    console.log(error)
    res.status(200).json({success:false,
    error})
    
}

}
exports.uploadVideo=uploadVideo
exports.myVideos=myVideos