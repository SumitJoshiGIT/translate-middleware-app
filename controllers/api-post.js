const path=require('path');
const {translate,detect,getlang}=require(path.join('../','utils','api'));
const url='https://google-translate1.p.rapidapi.com/language/translate/v2/'


async function  Translate(key,res){
   try{ 
    const response =await res.send(translate(key,req.body))
    res.send(response)
   }
   catch(err){
    res.send(err);
 }}

async function Detect(key,res)  {
   try{ 
    const response =await detect(key,req.body)
    res.send(response)
   }
   catch(err){
     res.send(err);   
}
};

async function GetLang(key,res)  {
   try{     
    const response =await getlang(key) 
    res.send(response)
    }
    catch(err){ 
        
     
      res.send(err)
    }
};


module.exports={Detect,GetLang,Translate}