const path=require('path');
require('dotenv').config();
const {translate,getlang}=require(path.join('../','utils','api'));
const url='https://google-translate1.p.rapidapi.com/language/translate/v2/'
const Users=require(path.join("../",'database','Users'))
let obj=undefined

async function validate(req,res){

      
      let User=await Users.findOne(req.user||req.session.user_local);
      //console.log(User);
      if(User){
         const keys=User.keys[User.active];
         console.log(keys);
         if(keys){
          return keys;
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
     
      res.json(response)
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