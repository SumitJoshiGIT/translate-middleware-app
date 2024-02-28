const path=require('path')
const Users=require(path.join("../",'database','Users'))
async function updateKeys(req,res,next){
    const keys=res.body.key
    const active=res.body.active
    const obj={};
    for(let i=0;i<keys.length;i++){
       if(active[i])obj[keys[i]]=active[i]; 
    }
    const user=Users.findById(req.session.user_id);
    user.keys=keys;
    user.save();
}

module.exports={updateKeys}