const path=require('path');
require('dotenv').config();
const {translate,getlang}=require(path.join('../','utils','api'));
const url='https://google-translate1.p.rapidapi.com/language/translate/v2/'
const Users=require(path.join("../",'database','Users'))
let obj=undefined

async function validate(req,res){
   
   if(req.session.user_id){
      let User=await Users.findById(req.session.user_id);
      if(User){
         console.log(User);

         User=Object.keys(User.keys)
         if(User){
          for (key in User)if(User[key]==0)delete User.key;
          req.body.key=User.keys[Math.floor(Math.random()*User.keys.length)];
          return true; 
         }
      }
     }            
   
   else res.status(401).send("Unauthorized Access");  
   return false;
   }
    
async function Translate(req,res,next){
 try{
   if(validate(req,res)){
   try{  
    const response =await (translate(req.query))
    res.send(response)
   }
   catch(err){
    res.send(err);
 }}
 else res.status(401).send();
 }
 catch(err){console.log(err)}
}
 


async function GetLang(){
   const key=process.env['translate-key']   
   try{     
    const response =await getlang({key}) 
    obj=(response['data']['languages']);
    obj=obj=Object.values(obj)
   }
    catch(err){ 
    console.log(err);
    
   }
};

function getLangData(){
   return obj;
}


module.exports={GetLang,Translate,validate,getLangData}