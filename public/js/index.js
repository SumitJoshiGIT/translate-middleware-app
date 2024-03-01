const csrfToken =undefined;
const blurwindow=document.querySelector("blur-window");

const csrf=document.querySelector('[name="csrfToken"]').value

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
   response= await response.json()   
   console.log(response)
 }



const langDialog={
   langDialog:document.querySelector('.lang-search'),
   langOverlay:document.querySelector('.lang-overlay'),
   inputs:document.querySelector('.lang-items'),
   close:document.querySelector('.lang-search .close'),
   searchBar:document.querySelector('.search-box'),
   languages:{},
   state:null,
   query(){},
   show(vis=true){
    this.langOverlay.style.display=(vis)?"flex":"none"; 
   },

   SelectLanguage(event){
    if (event.target.classList.contains('lang-option')){      
      console.log(this.state)
      parent=(this.state)?outputBox:inputBox;
      parent.lang=event.target.textContent;
      parent.code=event.target.getAttribute("value");
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
      this.langBox.addEventListener('click',()=>{
        langDialog.state=1;
        langDialog.show(true);
      }
      );

      
      }
}

const inputBox={
   area:document.querySelector('.input-area'),
   langBox:document.querySelector('.language'),
   language:document.querySelector('.language span'),
   lang:"Detect Language",
   code:"dl",
   async Translate(params){
      console.log(params)
      const data=await bodyReq(params);
      outputBox.area.textContent=data;
      return data['data']['translations'][0] 
   }
  ,
   async fetchOutput(){
    const code=inputBox.code
    if(outputBox.code==null)return;
    const params={q:this.area.textContent} 
    params['s']=this.code
    if(code)params['e']=outputBox.code;
    console.log(params);
    const data=await this.Translate(params); 
    output.area.textContent=data['translatedText'];
    if(!code)inputBox.code=data["detectedSourceLanguage"]    
}
   , 
   init(){
    this.area.addEventListener('input',this.fetchOutput.bind(this))
    this.langBox.addEventListener('click',()=>{
     langDialog.state=0;
     langDialog.show();
   })
   }  
  }

langDialog.init();
outputBox.init();
inputBox.init();