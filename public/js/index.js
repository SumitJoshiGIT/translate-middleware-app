//const csrf=document.querySelector('iframe [name="csrfToken"]').value
const flash=document.querySelector('.flash-message');
const flashText=flash.querySelector('p');
const _csrf = document.querySelector('input[name="csrfToken"]').value

function flashMessage(content){
  flash.classList.remove('hidden');
  flashText.textContent=content;
  const Timer=setTimeout(()=>{
    flash.classList.add('hidden');
    flashText.textContent="";
  },15000);
  flash.querySelector('.close').addEventListener('click',()=>{
    flash.classList.add('hidden');
    flashText.textContent="";
    clearTimeout(Timer);  
  }
  )
}

function copyText(){
  navigator.clipboard.writeText(this.area.value)   
  .catch(err => {
    console.error('Could not copy text: ', err);
    fallbackCopyTextToClipboard(this.area.value);
  });;
}

function throttle(func,timeout){
  let lt=0;
  return function(args){
    args.preventDefault();
    const ct=new Date().getTime();
    if(ct-lt>timeout){
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

function redirectToGoogle(){
  const googleUrl=new URL('https://google.com/search');
 if(this.area.value){ 
  googleUrl.searchParams.append('q',this.area.value)
  setTimeout(window.open(googleUrl.toString(),'_blank'),200);  
 }
}

async function PostRequest(endpoint, body) {
  response = await fetch(endpoint, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
      , 'CSRF-Token': _csrf
    },
    body: JSON.stringify(body)
  })
  response = await response.json();
  flashMessage(response.message);
  return response.success;
}


async function bodyReq(obj){
  const url = new URL(window.location.origin+"/translate");
  Object.keys(obj).forEach(key => url.searchParams.append(key,obj[key]));
  let response= await fetch(url,
       {method:'GET',
       headers:{
        'CSRF-Token':_csrf
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
    
   
   // data=await data.json()
    
  }
}

const outputBox={
    area:document.querySelector('.output  .input-area'),
    langBox:document.querySelector('.output > .language'),
    language:  document.querySelector('.output > .language span'),
    lang:"Select Language",
    code:null,
    
   copyText:document.querySelector('.output .copy-text'),
    google:document.querySelector('.output .google-search'),
    
    init(){
      this.copyText.addEventListener('click',copyText.bind(this))
   
      this.area.textContent="";
      this.google.addEventListener('click',redirectToGoogle.bind(this))
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
   google:document.querySelector('.input .google-search'),
   async Translate(params){
      const data=await bodyReq(params);
      console.log(data)
      if (data.error){
        flashMessage(data.error);
        return false;
      }
      return data['data']['translations'][0];
   
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
    if(data){
      console.log("what the fuck",data);
     outputBox.area.value=code?data:(data['translatedText'])
     if(!code){
      inputBox.code=data["detectedSourceLanguage"]
      inputBox.language.textContent=langDialog.langDict[inputBox.code] 
    }}
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
   this.google.addEventListener('click',redirectToGoogle.bind(this))
   }  
  }

langDialog.init();
outputBox.init();
inputBox.init();