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
       /* validate:{
            validator:pass=>{return (pass)?true:this.gid?true:false; }//{return /[A-Za-z\d@$!%*?&]{8,}/.test(pass);}
            ,message:props=>{console.log(props)}
        }    ,*/ 
        default:""
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
        type:Array,
        default:{},
        validate:{
            validator:v=>{
                console.log(v);
                //for(key in v){
                  //  if(!(v[key]=="0"||v[key]=="1"))return false;
                    //}
                return true;
            }
        }
     },
     active:{type:Number,
             default:0,
             validate:{
                 validator:v=>{
                     return (v>=0)?true:false;
                 },
                 message:props=>{return props}
             }
    },
  
     gid:{
        type:String,
        default:""
     }
    }
)

let Users=mongoose.model('Users',User);

module.exports=Users;