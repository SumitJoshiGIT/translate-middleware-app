const path=require('path');
const {translate,detect,getlang}=require(path.join('../','utils','api'));
const url='https://google-translate1.p.rapidapi.com/language/translate/v2/'
const Users=require(path.join("../",'database','Users'))



async function validate(req,res){
   if(req.headers['X-CSRF-Token']==req.session.csrfToken){
   if(req.session.user_id){
      let User=await Users.findById(req.session.user_id);
      if(User){
         User=User.keys
         if(User){
          for (key in User)if(User[key]==0)delete User.key;
          req.body.key=User.keys[Math.floor(Math.random()*User.keys.length)];
          next();   
         }
      }
     }            
   }
   else res.status(401).send("Unauthorized Access");  
 
   }

async function Translate(req,res,next){
   try{ 
    const response =await res.send(translate(req.body))
    res.send(response)
   }
   catch(err){
    res.send(err);
 }}

async function Detect(req,res,next)  {
   try{ 
    const response =await detect(req.body)
    res.send(response)
   }
   catch(err){
     res.send(err);   
}
};

async function GetLang(key,res){
   try{     
    const response =await getlang(req.body) 
    res.send(response)
    }
    catch(err){ 
      res.send(err)
    }
};


module.exports={Detect,GetLang,Translate,validate}