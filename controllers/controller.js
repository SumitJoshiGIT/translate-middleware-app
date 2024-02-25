const path=require('path')
const Users=require(path.join("../",'database','Users'))

async function signupPage(req,res,next){
    return res.render('signup');
}

async function loginPage(req,res,next){
    return res.render('login');

}
async function signup(req,res,next){
        try{
         const user=new Users(req.body); 
         req.session.user_id=await user.save();
         res.setHeader({"Location":'/home'});
         res.send();   
        }
       catch(err){
           console.log(err);    
       }
      }

async function userExists(req,res,next){
  if(req.session.user_id){
    result=await Users.findByID(req.session.user_id);
    if(result){res.redirect("/home");return;} 
    else next();  
  }
}
async function login(req,res,next){ 

        
        result=await Users.findOne(req.body);
        if (result){
            req.session.user=result._id
            res.setHeader({"Location":'/home'});
            res.send();
         }
         else if(result===false){
          res.send("Wrong password/username."); 
         }
    }      

module.exports={
         signup,login,signupPage,loginPage,userExists

}   