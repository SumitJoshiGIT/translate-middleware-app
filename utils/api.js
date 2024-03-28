require('dotenv').config();

async function request(endpoint,method,key,params='',bodyParams=false){
  const url=new URL(`https://google-translate1.p.rapidapi.com/language/translate/v2${endpoint}`)  
  const searchParams=new URLSearchParams()
  Object.keys(params).map(k=>searchParams.set(k,params[k]))
  
  let options={method: method, // or 'GET' depending on your API    
     headers:{
      'content-type': 'application/x-www-form-urlencoded',
       'Accept-Encoding': 'application/gzip',
       'X-RapidAPI-Key': key,
       'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
     },
     };
    if(bodyParams)options.body=searchParams; 
    else url.searchParams=searchParams;
    try{
        let response=await fetch(url,options)
        if(response.status!=201)return {error:(await response.json()).message};
        response=await response.json(); 
        return response;

      }
    catch(err){
        console.log(err);
        return {error:"Internal Error"};}
    };

 
async function translate(params,key){
   console.log(params,key);                 
   let response=await request('','POST',key,params,bodyParams=true)
   return response;
 }
 
async function getlang({key}){
   let response=await request('/languages','GET',key,params={target:'en'})
   return response
  }

module.exports={translate,getlang}