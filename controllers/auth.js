const path=require('path')
const Users=require(path.join("../",'database','Users'))
const bcrypt=require('bcrypt')
const {sendOTP}=require('../utils/mail')

function generateOTP(){
      return ((Math.random()*1000000).toFixed().toString().padEnd(6,'0'));
}
async function VerifyOTP(req, res, next){
    
    if(req.session.verified==true)return res.json({success:false,message:"User has been verified"})  
    const ver=req.session.verification
     
    if(!ver)return res.json({success:false,message:"Unauthorized Attempt"});
    if(ver.attempts>3||Date.now()-ver.time>10*60*1000){
      delete req.session.verification
      return res.json({success:false,message:"Please retry later.Too many attempts"})
      
  }
    if(!ver.otp)return res.json({success:false,message:"OTP has been expired."});
 
    if(ver.otp==req.body.OTP){
        const user=new Users({email:ver.email,password:ver.password});
        await user.save();  
        req.session.user_local={_id:user._id};
        delete req.session.verification
        res.json({success:true,verified:true,message:"user verified successfully"});
      }
    else {res.json({success:false,message:"Incorrect OTP"})  
          req.session.verification.attempt++;
    }
}

async function signupPage(req,res,next){
    return res.render('signup',{layout:"main"});
}

async function signinPage(req,res,next){
    return res.render('signin',{layout:"main"});

}
async function signup(req,res,next){
              
  try{  
         req.body.password=await bcrypt.hash(req.body.password,12); 
         const OTP=generateOTP();
         const resp=await sendOTP(OTP,req.body.email);
         if(resp.success){
          req.session.verification={...req.body,otp:OTP,attempts:0,time:Date.now()};     
          console.log(req.session.verification);
          setTimeout(()=>{delete req.session.verification.otp},10*1000*60);
          res.json({success:true,message:"OTP sent successfully."});
         }
        }
       catch(err){
        console.log(err);
         res.json({success:false,message:"Internal Server Error."});    
       }
      }

async function userExists(req,res,next){
   
  if(req.session.user_local||req.isAuthenticated()){
    
    return res.redirect("/home");
  }
  const user=await Users.findOne({email:req.body.email});
  if(user)res.json({success:false,message:"User already exists"})
  else{next(); } 
}

async function signin(req,res,next){ 
        if( req.isAuthenticated()){return res.json({success:true,message:"You are already logged in."})}
        const b=req.body.password;
        result=await Users.findOne({email:req.body.email});
        if (result){
          console.log((req.body.password,result.password));
       
          if(bcrypt.compare(req.body.password,result.password))
            req.session.user_local={_id:result._id},
            res.json({success:true,message:"Signed In successfully."});
         }
         else {
          res.json({success:false,message:"User doesn't exist."});
         }    
      }
module.exports={
         signup,signin,signupPage,signinPage,userExists,VerifyOTP
}   