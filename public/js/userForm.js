const signinButton=document.getElementById('signin');
const signupButton=document.getElementById('signup');

const signup=document.querySelector('.signup-form');

const overlay=document.querySelector('.auth-overlay');
const signin=document.querySelector('.signin-form'); 
const signinForm=signin.querySelector('form');
const signupForm=signup.querySelector('form');

const signinSubmit=signinForm.querySelector('.user-form-submit');
const signupSubmit=signupForm.querySelector('.user-form-submit');

const signinFormParent=signinForm.parentElement;
const signupFormParent=signupForm.parentElement;
const googleSignin=document.querySelectorAll('.google-sign-in'); 

googleSignin.forEach(el=>{el.addEventListener('click',(event)=>{
   window.open('/auth/oauth','oauth','width=500 height=700')
   window.addEventListener('message',handleMessage);

   
})})

async function SignIn(event){
  FormData(signinForm)

}
async function SignUp(event){
  data=FormData(signupForm)
}

async function sendOTP(event){
  event.preventDefault()
  const otp=signupFormParent.querySelector('.otp').value
  const _csrf=signupForm.querySelector('input[name="csrfToken"]').value

  if(/^\d{6}$/.test(otp)){
   try{ 
    response=await fetch('/auth/signup/verify',{
      method:'POST',
      credentials:'same-origin',
      headers:{
        'Content-Type':'application/json'
        ,'CSRF-Token':_csrf
      },
      body:JSON.stringify({OTP:otp})
    })
    response=await response.json();
    console.log(response)
    flashMessage(response.message);
    if(response.success){
        setTimeout(()=>window.location.href='/',2000);
    }
   
  }
  catch(error){
    flashMessage(error)
  }
  }   
  else{flashMessage('OTP must be a 6 digit number')}
}
signupForm.addEventListener('submit',async function(event){
  event.preventDefault();
  const data={password:signupForm.querySelector('input[name="password"]').value,
              email:signupForm.querySelector('input[name="email"]').value}
  _csrf=signupForm.querySelector('input[name="csrfToken"]').value
 console.log(_csrf);
  const response=await fetch("/auth/signup",{
    method:'POST',
    credentials:'same-origin',
    headers:{
      'Content-Type':'application/json'
       ,'CSRF-Token':_csrf
    },
    body:JSON.stringify(data)
    });

    const json=await response.json();;
    if(json.success){
         const otpForm=`<form action="/auth/signup/verify" method="POST">
         <input class="user-form-input otp" type="text" placeholder="Enter OTP">
         <input  class="user-form-submit"  type="submit" value="Verify OTP"></input></form>`
         signupFormParent.innerHTML=(otpForm);
         signupFormParent.querySelector('.user-form-submit').addEventListener('click',sendOTP);
        /*setTimeout(()=>window.location.href='/',2000);*/
      }
    flashMessage(json.message);
    });
  

signinForm.addEventListener('submit',async function(event){
    event.preventDefault();
    const data={password:signinForm.querySelector('input[name="password"]').value,
    email:signinForm.querySelector('input[name="email"]').value,}
    _csrf=signinForm.querySelector('input[name="csrfToken"]').value
    try{
     const response=await fetch("/auth/signin",{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'CSRF-Token':_csrf
      },
      body:JSON.stringify(data)
    })

    const json=await response.json();
    flashMessage(json.message)
    if(json.success){
      setTimeout(()=>window.location.href='/',2000);
    }
    }
    catch(err){
      flashMessage(err)
    }

}

);

let state=-1
signupButton.addEventListener('click',(event)=>{
  overlay.classList.remove('hidden');
  if(state==-1);signin.classList.add('hidden');  
  signup.classList.remove('hidden');
  state=1;
});

function handleMessage(event){

  console.log(event);
  if(event.data.verified==true)
   if(window.oauth)window.oauth.close();
   window.removeEventListener('message',handleMessage);
  
}


signinButton.addEventListener('click',(event)=>{
    overlay.classList.remove('hidden');
    if(state==1);signup.classList.add('hidden');
    signin.classList.remove('hidden');
    state=-1;
  });
  
signup.querySelector('.close').addEventListener('click',(event)=>{
  overlay.classList.add('hidden');
  signupFormParent.innerHTML="";
  signupFormParent.appendChild(signupForm);
  signupForm.reset();  
});

signin.querySelector('.close').addEventListener('click',(event)=>{
    overlay.classList.add('hidden');
    signinForm.reset();

  });