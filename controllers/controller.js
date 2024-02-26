const path=require('path')
const Users=require(path.join("../",'database','Users'))

async function signupPage(req,res,next){
    return res.render('signup',{layout:"main"});
}

async function loginPage(req,res,next){
    return res.render('signin',{layout:"main"});

}
async function signup(req,res,next){
              
  try{
         const user=new Users(req.body); 
         req.session.user_id=await user.save();
         res.redirect("/home");   
        }
       catch(err){
           console.log(err);    
       }
      }

async function userExists(req,res,next){
  if(req.user)res.redirect("/home");
  else next();  
}

async function login(req,res,next){ 
        console.log("login")
        console.log(req.session);       
        result=await Users.findOne(req.body);
        console.log(result);
        if (result){
            req.session.user_id=result._id
            console.log("In session")
            res.redirect("/home")
         }
         else if(result===false){
          res.send("Wrong password/username.");

         }
    }      

module.exports={
         signup,login,signupPage,loginPage,userExists
}   