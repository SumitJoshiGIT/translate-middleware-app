const http=require('http');
const fs=require('fs');

//const output=document.querySelector('div[class="output-area"]')
const url='https://google-translate1.p.rapidapi.com/language/translate/v2/'
const key='5ca10da774msh6a6536f4243bbd0p19a795jsn815159b41e49'


//"createUser","validateUser","loginUser",""
const server=http.createServer((req,res)=>{
  const data=[];
  if (req.url=="/about"||req.url=="/settings"){ 
    const path=req.slice(1,-1)+".html";
    fs.readFile(path,"utf8",(err,data)=>{
      if (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
       
      }
  })
  }
  else{
   if(req.url in json_urls){
   res.on('data',(chunk)=>{data.pushe(chunk)});
   res.on('end',()=>{
    const arr=validateUser(sessionkey)
    if(arr[1]){
     const data=Buffer.concat(data)
     res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    }
  });
  
   }}});

server.listen(3000);


async function request(method,key,params=''){

   let headers={method: method, // or 'GET' depending on your API    
    headers:{
      'Content-Type':'application/json',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': key,
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    },

    body: JSON.stringify(params),
    };
     try{
      let response=await fetch(url,headers);
      return await response.json();
     }
     catch{return {}}
};


const User={

 UpdateKey(key){
  this.key=key

 },

 async  detect(q){
  let params=new URLSearchParams({
		q:q
		})
  let response=await request('POST',key,params)
  return await response.json();
},

 async translate(q,s,t){
  let params=new URLSearchParams({
		q: q,
		target: t,
		source: s})

  let response=await request('POST',key,params)
  return await response.json();
},

async getlang(){
  let response=await request('GET',key)
  return await response.json();
 }
};

let UserObj=function(key,id){
        this.key=key
        this.id=id

};

UserObj.prototype=User

new UserObj(key,id)