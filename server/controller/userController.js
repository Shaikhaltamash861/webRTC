const User =require('../model/userSchema')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const signup= async(req,res)=>{
    const {name,email,password}=req.body;
    const isAlready=await User.findOne({
        $or: [{ email },{name}]})
    if(isAlready)
    {
    
      return res.status(200).json({message:"User is already registered",status:false})
    }
       const hashPass=bcrypt.hashSync(password,10)
        const upload=await User({name,email,password:hashPass});
    try {
        const save=await upload.save();

        if(!save){
       return res.status(200).json({message:"user unable to save",status:false})
        }
        const token = jwt.sign(
            { user_id: upload._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          
          upload.token = token;
       return res.status(200).json({message:"user registerd successfully",status:true,user:upload})

    } catch (error) {
        
       return res.status(210).json({message:error._message,status:false})
    }
  
}

const signin=async(req,res)=>{
    const {email,password}=req.body;
    const user = await User.findOne({ email:email 
    });
    
    try {
    
    if(user){
        
        const match =  bcrypt.compareSync(password,user?.password)
        
        if(match){
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
              );
              
              user.token = token;
           return res.status(200).json({user:user,status:true,message:"successfuly logIn"});
        }
        else{
           return res.status(200).json({message:"wrong password",status:false})
        }
        
    }
    return res.status(200).json({message:"username/email not found",status:false})
} catch (error) {
        console.log(error)

       return res.status(210).json({error:"something went wrong",status:false})
        
    }    

}
const test=(req,res)=>{
    console.log(req.body)
}
exports.signup=signup;
exports.signin=signin;
exports.test=test