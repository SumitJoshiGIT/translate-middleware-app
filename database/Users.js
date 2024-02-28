const mongoose=require('mongoose');

let User=new mongoose.Schema(
    {
     email:{
        type:String,
        required:true,
        unique:true,   
        validate:{
            validator:(v)=>{
                return  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message:props=>0
        }  
    },  
     password:{
        type:String,
        required:true
        /*,validate:{
            validator:pass=>{return /[A-Za-z\d@$!%*?&]{8,}/.test(pass);}
            ,message:props=>0
        } */    
    },
     username:{
        type:String,
        default:""
    },
     createdAt:{
        type:Date,
        immutable:true,
        default:()=>Date.now()
    },
     updatedAt:{type:Date,
        default:()=>Date.now()
    },
     keys:{
        type:Object,
        default:{},
        validate:{
            validator:v=>{
                for(key in v){
                    if(!(v[key]=="0"||v[key]=="1"))return false;
                    if(!(/^[a-zA-Z0-9-_]{24}$/.test(key)))return false;
                }
                return true;
            }
        }
     }
    }
)

let Users=mongoose.model('Users',User);

module.exports=Users;