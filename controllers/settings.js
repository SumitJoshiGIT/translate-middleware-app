const path=require('path')
const Users=require(path.join("../",'database','Users'))

async function updateKeys(req,res,next){
  const keys=req.body.key
  const active=req.body.active
  if(keys instanceof Array && active instanceof Array){
    const obj={0:[],1:[]};
    for(let i=0;i<keys.length;i++)obj[Number(active[i]==1)].push((keys[i]));
    const user=await Users.findById(req.session.user_id);
    user.keys=obj;
    try{
    await user.save();
    return res.send("success");
   }
    catch(err){}
 } 
     return res.send("failure")
    
}

module.exports={updateKeys}