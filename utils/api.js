require('dontenv').config();
const key=process.env.key

async function request(url,method,key,params=''){
    
  let headers={method: method, // or 'GET' depending on your API    
     headers:{
       'Content-Type':'application/json',
       'Accept-Encoding': 'application/gzip',
       'X-RapidAPI-Key': key,
       'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
     },
     };
   if(params)headers.body= JSON.stringify(params);   
   try{
        url=`https://google-translate1.p.rapidapi.com/language/translate/v2/${url}?${params.toString()}`
        console.log(url)
        let response=await fetch(url,headers)
        response=await response.json(); 
        return response;
      }
      catch(err){
        console.log(err);
        return {};}
    };

async function detect(q,key){
   let params=new URLSearchParams({
         q:q
         })
   let response=await request('detect','GET',key,params)
   return response;
 }
 
async function translate(q,s,t,key){
   let params=new URLSearchParams({
         q: q,
         target: t,
         source: s})
 
   let response=await request('translate','GET',key,params)
   
   return await response.json();
 }
 
async function getlang(key){
   let response=await request('languages','GET',key)
   console.log(response);
  }
 
module.exports={detect,translate,getlang}