const csrfToken =undefined;
const blurwindow=document.querySelector("blur-window");

const csrf=document.querySelector('[name="csrfToken"]').value


function throttle(func,timeout){
  let lt=0;
  return function(args){
    const ct=new Date();
    if(lt-ct>timout){
      lt=ct;
      return func(args)
  }}  
};

function debounce(func,timeout=300){
     let timer;
     return function(args){
       clearTimeout(timer);
       const context=this;
       timer=setTimeout(()=>{func(args);
      },timeout);
     }


}



async function bodyReq(obj){
  const url = new URL(window.location.origin+"/translate");
  Object.keys(obj).forEach(key => url.searchParams.append(key,obj[key]));
  let response= await fetch(url,
       {method:'GET',
       headers:{
        'X-CSRF-Token':csrf
       }   
      }  
   );
   response= await response.json();   
   return response;
  }


async function search(li,q,e,s=0,i=0){
      if(i>q.length||!s)return ; 
      let n=undefined,m=undefined;
      for(k=s;k<e;k++){
       if(li[k][i]==q[i]&&!n)n=k;
       else if(li[k][i]>q[i]&&!m)m=k;  
      }
      search(li,q,e=m||e,s=n,i++);  
} 

const langDialog={
   langDialog:document.querySelector('.lang-search'),
   langOverlay:document.querySelector('.lang-overlay'),
   inputs:document.querySelector('.lang-items'),   
   close:document.querySelector('.lang-search .close'),
   searchBar:document.querySelector('.search-box'),
   languages:document.querySelectorAll('.lang-items .lang-option'),
   state:null,
   query(){

   },
   show(vis=true){
    this.langOverlay.style.display=(vis)?"flex":"none"; 
   },

   SelectLanguage(event){
    if (event.target.classList.contains('lang-option')){      
      console.log(this.state)
      parent=(this.state)?outputBox:inputBox;
      parent.lang=event.target.textContent;
      parent.code=event.target.getAttribute("id");
      parent.language.textContent=parent.lang;
      this.show(false);
    }
   },

   langinput(obj){
    let el=`<div class="search-option" value="${obj['name']}">${obj['language']}}</div>`;
    return document.createElement(el)
   },

   parseLang(response){
       if(response){
        for (x in response){
          this.languages[x['language']]=x['name'];
          this.inputs.appendChild(langinput(x)); 

        }
       }
   },
   async init(){
    const obj={}
    let k=null;
    this.langDict={}
    this.langNames=[];
    this.languages.forEach(el=>{
      k=el.textContent.toLowerCase()
      this.langDict[el.getAttribute("id")]=k;
      this.langNames.push(k);     
    });
    this.languages=obj;

    this.inputs.addEventListener('click',this.SelectLanguage.bind(this));        
    this.close.addEventListener('click',()=>this.show(false));
    this.searchBar.addEventListener('change',this.query.bind(this))
    console.log(this.close)  
   
   // data=await data.json()
    
  }
}

const outputBox={
    area:document.querySelector('.output  .input-area'),
    langBox:document.querySelector('.output > .language'),
    language:  document.querySelector('.output > .language span'),
    lang:"Select Language",
    code:null,
    
    init(){
      this.area.textContent="";
      this.langBox.addEventListener('click',()=>{
        langDialog.state=1;
        langDialog.show(true);
      }
      );
    }
}

const inputBox={
   area:document.querySelector('.input .input-area'),
   langBox:document.querySelector('.input .language'),
   language:document.querySelector('.input .language span'),
   lang:"Detect Language",
   code:null,
   async Translate(params){
      const data=await bodyReq(params);
      console.log(data)
      return data['response']['data']['translations'][0] 
   }
  ,
   async fetchOutput(){
    let code=inputBox.code
    const params={
      q:inputBox.area.value.trim()
    } 
    if(outputBox.code&&params.q){
    
    if(code)params['source']=this.code;
    params['target']=outputBox.code;
    code=(code==outputBox.code)
    
    const data=code?params.q:await this.Translate(params); 
    outputBox.area.value=code?data:(data['translatedText'])
    console.log(data)
    if(!code){
      inputBox.code=data["detectedSourceLanguage"]
      inputBox.language.textContent=langDialog.langDict[inputBox.code] 
    }    
  }
  else outputBox.area.value=''
}
   , 
   init(){
    this.area.textContent="";
    this.area.addEventListener('input',debounce(this.fetchOutput.bind(this)))
    this.langBox.addEventListener('click',()=>{
     langDialog.state=0;
     langDialog.show();
   })
   }  
  }

langDialog.init();
outputBox.init();
inputBox.init();