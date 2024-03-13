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
         const keys=User.keys['1'];
         if(keys){
          return keys[Math.floor(Math.random()*(keys.length-1))];
         }
      }
     }              
   return false;
    }
    
async function Translate(req,res,next){
   try{
   const val=await validate(req,res)  
   if(val){
    try{  
      const response =await (translate(req.query,val))
      console.log(response)
      res.json(({'response':response}))
    }
    catch(err){
      console.log(err);
      res.json({error:err});
 }}
 else res.status(401).json('{error:"Validation Failed"}');
 }
 catch(err){res.json({success:false,message:"Error executing operation"})}
}
 


async function GetLang(cache=false){
   
   if (cache){
      obj=cache;
      return cache;}
   const key=process.env['translate-key']   
   try{     
    const response =await getlang({key}) 
    obj=(response['data']);
    obj.time=new Date();
    return obj;
   }
    catch(err){ 
    console.log(err);
    
   }
};

function getLangData(){
   return obj['languages'];
}


module.exports={GetLang,Translate,validate,getLangData}