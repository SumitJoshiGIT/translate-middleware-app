const fs=require('fs')
const langCachePath='./langCache.json'

async function GetLangCache(){
  return JSON.parse(fs.readFileSync(langCachePath, 'utf8'));
}


async function WriteLangCache(data){
   fs.writeFileSync(langCachePath,JSON.stringify(data), 'utf8')
}

module.exports={GetLangCache,WriteLangCache}