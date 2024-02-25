const signin=document.getElementById('signin')
const signup=document.getElementById('signup')
const signupForm=document.querySelector('.signup-form')
const signinForm=document.querySelector('.signin-form')
state=0

signup.addEventListener('click',(event)=>{
  if(state==-1)signinForm.classList.add('hidden');  
  signupForm.classList.remove('hidden');
  state=1;
})

signin.addEventListener('click',(event)=>{
    if(state==1)signupForm.classList.add('hidden');
    signinForm.classList.remove('hidden');
    state=-1;
  })
  
signupForm.querySelector('.close').addEventListener('click',(event)=>{
    signupForm.classList.add('hidden');
    state=0;
  })

signinForm.querySelector('.close').addEventListener('click',(event)=>{
    signinForm.classList.add('hidden');
    state=0;
  })

