const path=require('path')
const Users=require(path.join("../",'database','Users'))
const bcrypt=require('bcrypt')

async function checkCSRF(req,res,next){
    console.log(req.body)
    if(req.body.csrfToken==req.session.csrfToken){
       delete req.body.csrfToken
       next();
       console.log("pass")
    }
    else{ res.status(401).send("Unauthorized Access Detected");
         console.log(req.session.csrfToken)    
}
}

async function signupPage(req,res,next){
    return res.render('signup',{layout:"main"});
}

async function loginPage(req,res,next){
    return res.render('signin',{layout:"main"});

}
async function signup(req,res,next){
              
  try{   req.body.password=bcrypt.hash(req.body.password,12); 
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
        req.body.password=bcrypt.hash(req.body.password,12); 
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
         signup,login,signupPage,loginPage,userExists,checkCSRF
}   