async function request(endpoint,method,key,params=''){
  
  let options={method: method, // or 'GET' depending on your API    
     headers:{
       'Content-Type':'application/json',
       'Accept-Encoding': 'application/gzip',
       'X-RapidAPI-Key': key,
       'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
     },
     };
   try{
        const url=new URL(`https://google-translate1.p.rapidapi.com/language/translate/v2${endpoint}`)
        Object.keys(params).map(k=>url.searchParams.append(k,params[k]))
        console.log(url)
        let response=await fetch(url,options)
        response=await response.json(); 
        console.log(response);
        return response;
      }
      catch(err){
        console.log(err);
        return {};}
    };

 
async function translate({q,s,t,key}){
   let params=new URLSearchParams({
         q: q,
         target: t,
         source: s})
 
   let response=await request('','GET',key,params)
   
   return await response.json();
 }
 
async function getlang({key}){
   let response=await request('/languages','GET',key,params={target:'en'})
   return response
  }
 
module.exports={translate,getlang}