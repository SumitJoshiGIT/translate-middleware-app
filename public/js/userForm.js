const signinButton = document.getElementById('signin');
const signupButton = document.getElementById('signup');

const signup = document.querySelector('.signup-form');

const overlay = document.querySelector('.auth-overlay');
const signin = document.querySelector('.signin-form');
const signinForm = signin.querySelector('form');
const signupForm = signup.querySelector('form');

const signinSubmit = signinForm.querySelector('.user-form-submit');
const signupSubmit = signupForm.querySelector('.user-form-submit');

const signinFormParent = signinForm.parentElement;
const signupFormParent = signupForm.parentElement;
const googleSignin = document.querySelectorAll('.google-sign-in');
const forgotPassword = document.querySelector('.forgot-password');
//const resetPassword=document.querySelector('reset-password');

forgotPassword.addEventListener('click', async function (event) {
  event.preventDefault();
  event.stopPropagation();
  const email = signinForm.querySelector('input[name="email"]').value;
  if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))) return flashMessage("Invalid Email address.");
  await changeToPass(signinFormParent);

})

googleSignin.forEach(el => {
  el.addEventListener('click', (event) => {
    window.open('/auth/oauth', 'oauth', 'width=500 height=700')
    window.addEventListener('message', handleMessage);
  })
})





async function sendOTP(event) {
  event.preventDefault()
  const otp = event.target.parentElement.querySelector('.otp').value;
  const body = { OTP: otp }

  if (/^\d{6}$/.test(otp)) {
    try {
      const response = await PostRequest('/auth/verify', body)
      if (response) setTimeout(() => window.location.href = '/', 2000);

    }
    catch (error) {
      flashMessage(error)
    }
  }
  elseflashMessage('OTP must be a 6 digit number');
}


async function changeToVerify(parent) {
  const otpForm = `<form action="/auth/verify" method="POST">
  <input class="user-form-input otp" type="text" placeholder="Enter OTP">
  <button  class="user-form-submit">Verify OTP</button></form>`
  await changeChildren(otpForm, parent);

  parent.querySelector('.user-form-submit').addEventListener('click', throttle(async (event) => {
    event.preventDefault();
    const body = { OTP: parent.querySelector('.otp').value };
    const json = await PostRequest('/auth/verify', body);
    if (json) setTimeout(() => {window.href=('/')}, 1000);
  }
  ),300);
}
async function changeToPass(parent) {
  const email = signinForm.querySelector('input[name="email"]').value;
  const passForm = `<form action="/" method="POST">
  <input class="user-form-input" type="text" placeholder="Enter new password">
  <button  class="user-form-submit"  type="button">Confirm</button></form>`
  await changeChildren(passForm, parent);
  async function Submit(event) {
    event.preventDefault();
    const password = event.target.parentElement.querySelector('.user-form-input').value;
    const body = { password: password, email: email }
    const resp = await PostRequest('/auth/reset', body)
    if (resp) changeToVerify(parent);
    event.target.removeEventListener('click', Submit);
  }
  parent.querySelector('.user-form-submit').addEventListener('click', throttle(Submit,300));
}

async function changeChildren(children, parentElement) {
  parentElement.innerHTML = (children);
}
signupForm.addEventListener('submit', throttle(async function (event) {
  event.preventDefault();
  const email = signinForm.querySelector('input[name="email"]').value.trim();

  if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))) return flashMessage("Invalid Email address.");
  const data = {
    password: signupForm.querySelector('input[name="password"]').value,
    email: signupForm.querySelector('input[name="email"]').value
  }

  const json = PostRequest("/auth/signup", data);
  if (json) changeToVerify(signupFormParent);
},300));


signinForm.addEventListener('submit',throttle(async function (event) {
  event.preventDefault();
  email = signinForm.querySelector('input[name="email"]').value.trim();
  console.log(email);
  if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))) return flashMessage("Invalid Email address.");
  const data = {
    password: signinForm.querySelector('input[name="password"]').value,
    email: signinForm.querySelector('input[name="email"]').value,
  }
  try {
    const json = await PostRequest("/auth/signin", data)
    if (json) setTimeout(() => window.location.href = '/', 2000);
  }
  catch (err) { flashMessage(err); }
},300
)
);

let state = -1;
signupButton.addEventListener('click', (event) => {
  overlay.classList.remove('hidden');
  if (state == -1); signin.classList.add('hidden');
  signup.classList.remove('hidden');
  state = 1;
});

function handleMessage(event) {

  console.log(event);
  if (event.data.verified == true)
    window.removeEventListener('message', handleMessage);
  flashMessage("Signed in successfully.");
  setTimeout(() => window.location.href = "/");
}


signinButton.addEventListener('click', (event) => {
  overlay.classList.remove('hidden');
  if (state == 1); signup.classList.add('hidden');
  signin.classList.remove('hidden');
  state = -1;
});

signup.querySelector('.close').addEventListener('click', (event) => {
  overlay.classList.add('hidden');
  signupFormParent.innerHTML = "";
  signupFormParent.appendChild(signupForm);
  signupForm.reset();
});

signin.querySelector('.close').addEventListener('click', (event) => {
  overlay.classList.add('hidden');
  signinFormParent.innerHTML = "";
  signinFormParent.appendChild(signinForm);
  signinForm.reset();

});