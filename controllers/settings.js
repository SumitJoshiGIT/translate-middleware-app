const path=require('path')
const Users=require(path.join("../",'database','Users'))
async function updateKeys(req,res,next){
    const keys=req.body.key
    const active=req.body.active
    if(keys instanceof Array && active instanceof Array){
    const obj={};
    console.log(req.body)
    for(let i=0;i<keys.length;i++){
       if(active[i]==1|| active[i]==0) 
       obj[keys[i]]=Number(active[i]);
       else return res.send("failure");     
    
    }
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