const csrfToken =undefined;
const blurwindow=document.querySelector("blur-window");
const User={
      signedin:false,
      loggedin:false,
      signupWindow:document.querySelector(".signup-window"),
      LoginWindow:document.querySelector("login-window"),
      signup:document.querySelector(".signup"),
      login:document.querySelector(".login"),
    
      show(q){
        this.blurwindow.classList.remove("hidden");
        const k=(q)?this.signupWindow:this.LoginWindow
        k.remove("hidden")     
      },
      init(){
      this.signup.addEventListener('click',(event)=>{
      }); 
      this.login.addEventListener('click',(event)=>{
          
      });  
    }
}
const langDialog={
   langDialog:document.querySelector('.lang-search'),
   inputs:document.querySelector('.inputs-container'),
   close:document.querySelector('.close'),
   searchBar:document.querySelector('.search-box'),
   languages:{},
   state:null,
   
   show(vis=true){
    this.langDialog.style.display=(vis)?"block":"none";
    this.inputs.style.display=(vis)?"none":"block";
    
   },

   SelectLanguage(event){
    if (event.target.classList.contains('lang-option')){
      
      parent=(state)?outputBox:inputBox;
      parent.lang=event.target.textContent;
      parent.code=event.target.getAttribute("value");
      langDialog.textContent=parent.lang;
    }
   },

   langinput(obj){
    let el=`<div class="search-option" value="${obj['name']}">${obj['language']}}</div>`;
    return document.createElement(el)
   },

   parseLang(response){
       response=JSON.parse(response)['data']['languages']
       if(response){
        for (x in response){
          this.languages[x['language']]=x['name'];
          this.inputs.appendChild(langinput(x)); 

        }
       }
   },
   query(){

   },
   init(){
    this.inputs.addEventListener('click',this.SelectLanguage.bind(this));        
    
    params={target: 'en'};
    const fullUrl = new URL(`${'https://localhost/getlang'}?${new URLSearchParams(params)}`);
    fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      'X-CSRF-Token': csrfToken
    })
    .then((response)=>{return response.json()})
    .then()  
    .catch(()=>{})  

    this.close.addEventListener('click',()=>this.show(false));
    this.searchBar.addEventListener('change',this.query.bind(this))
  }
}

const outputBox={
    area:document.querySelector('.output > .input-area'),
    langBox:document.querySelector('.output > .language'),

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
   lang:"Detect Language",
   code:"dl",
   
   translate(params,csrfToken){
    const fullUrl = new URL(`${'https://localhost/translate'}?${new URLSearchParams(params)}`);
    
    return fetch(fullUrl, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
        'X-CSRF-Token': csrfToken
      })
      .then((response)=>{return response.json()})
      .then((data)=>{return JSON.parse(data)})
      .catch((error)=>{return false});
   },
   fetchOutput(){
    if(outputBox.code==null)return;
    params={q:this.area.textContent} 
    if (this.code=='dl'){
        const lang=(translate(params));
        if (lang){
            this.code=lang[''],
            this.lang=lang['']
        }
        this.fetchOutput();
    }
    else{
    params['s']=this.code,     
    params['e']=outputBox.code
    output.area.textContent=this.translate(params,csrfToken)[''];     
}
   }, 
   init(){
    this.area.addEventListener('input',this.fetchOutput)
    this.langBox.addEventListener('click',()=>{
     langDialog.state=0;
     langDialog.show();
   })
   }  
}

langDialog.init();
outputBox.init();
inputBox.init();