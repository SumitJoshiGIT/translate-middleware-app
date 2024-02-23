const path=require('path');
const {translate,detect,getlang}=require('api');
const url='https://google-translate1.p.rapidapi.com/language/translate/v2/'


const Translate=(key,res)=>{new Promise(()=>{res.send(translate(key,req.body))}).then(
    (response)=>{
     res.send(response)
    }
 ).catch((err)=>res.send(err));
 }

const Detect=(key,res) => {
    new Promise(()=>{res.send(detect(key,req.body))}).then(
        (response)=>{
         res.send(response)
        }
     ).catch((err)=>res.send(err));
};

const Getlang=(key,res) => {
    new Promise(()=>{
        return getlang(key) 
       }).then(
        (response)=>{
         res.send(response)
        }
     ).catch((err)=>{
      res.send(err)})
     ;

};


