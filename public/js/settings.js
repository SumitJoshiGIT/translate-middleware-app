const settings = document.querySelector('.settings')
const settingsDialog = document.querySelector('.settings-dialog')
const close = settingsDialog.querySelector('.user-form .close')
const extras = new Set();
const submit = settingsDialog.querySelector("form .user-form-submit");
const logoutButton=document.querySelector('.logout');
const deleteButton=document.querySelector('.delete');
const confirmWindow=document.querySelector('.confirm-window');
const confirmWindowTask=confirmWindow.querySelector('.task-name');
const confirmButton=confirmWindow.querySelector('.confirm-button');




async function deleteUser(event){
  const response=await PostRequest('/auth/delete',{})
  if(response)setTimeout(()=>{window.href=('/');},2000)
  confirmWindow.classList.add('hidden');
}
async function logout(event){
  const response=await PostRequest('/auth/logout',{})
  if(response)setTimeout(()=>{window.href('/');},2000)
  confirmWindow.classList.add('hidden');
}
settings.addEventListener('click',(event) => settingsDialog.classList.remove('hidden'));
close.addEventListener('click', (ev) => {
  settingsDialog.classList.add('hidden');
  extras.forEach(el => el.remove())
  extras.clear();
})
const dropDowns = document.querySelectorAll('.keys')
const checkboxes = document.querySelectorAll('.key input[name="active"]')

dropDowns.forEach(el => {
  el.querySelector('.drop-down').addEventListener('click', (ev) => {
    const cl = el.querySelector('.key-list').classList;
    if (cl.contains('hidden')) cl.remove('hidden');
    else cl.add('hidden')
  })

})

const addButton = document.querySelector('#add-key')
const keyList = document.querySelector('.api-keys')

addButton.addEventListener('click', addNode)

function removeNode(el) {
  return (ev) => el.parentNode.remove();
}

document.querySelectorAll('.retract-key').forEach((el) => el.addEventListener('click', removeNode(el)))

async function addNode() {
  const key = `
<div class="key-input">
<input class="user-key-input" name="key[]" value="" type="text">
<button type="button" class="add-key retract-key">
   <svg height="15px" witth="15px"viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cross-square</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-206.000000, -1037.000000)" fill="#ff0000"> <path d="M226.95,1056.54 C227.34,1056.93 227.34,1057.56 226.95,1057.95 C226.559,1058.34 225.926,1058.34 225.536,1057.95 L222,1054.41 L218.464,1057.95 C218.074,1058.34 217.441,1058.34 217.05,1057.95 C216.66,1057.56 216.66,1056.93 217.05,1056.54 L220.586,1053 L217.05,1049.46 C216.66,1049.07 216.66,1048.44 217.05,1048.05 C217.441,1047.66 218.074,1047.66 218.464,1048.05 L222,1051.59 L225.536,1048.05 C225.926,1047.66 226.559,1047.66 226.95,1048.05 C227.34,1048.44 227.34,1049.07 226.95,1049.46 L223.414,1053 L226.95,1056.54 L226.95,1056.54 Z M234,1037 L210,1037 C207.791,1037 206,1038.79 206,1041 L206,1065 C206,1067.21 207.791,1069 210,1069 L234,1069 C236.209,1069 238,1067.21 238,1065 L238,1041 C238,1038.79 236.209,1037 234,1037 L234,1037 Z" id="cross-square" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
</button>
<label >   
<input type="radio" name="active" value=1 class="activate-key">
</label>
</div>`
  let clone = document.createElement('div', { class: 'key' });
  clone.innerHTML = key;
  keyList.append(clone);

  let rkey = clone.querySelector('.retract-key');
  rkey.addEventListener('click', removeNode(rkey));
  extras.add(clone);
}

submit.addEventListener('click',(async (event) => {
  event.preventDefault();
  const keys = [];
  keyList.querySelectorAll('input[name="key[]"]').forEach(x => keys.push(x.value));
  const data = {
    keys: keys,
    active: keyList.querySelector('input[name="active"]:checked').value
  }
  try {
    const json = await PostRequest("/keys",data);
    if (json) extras.clear();
  }
  catch (err) {
    flashMessage(err);
  }
}));


confirmWindow.querySelector('.close').addEventListener(
  'click',(event) =>{confirmWindow.classList.add('hidden')});
logoutButton.addEventListener('click', () =>{
    confirmWindowTask.textContent="Logout?";
    confirmButton.addEventListener('click',throttle(logout,300));
    confirmWindow.classList.remove('hidden');
  })

deleteButton.addEventListener('click', () =>{
  confirmWindowTask.textContent="delete this account?";
  confirmButton.addEventListener('click',throttle(deleteUser,300));
  confirmWindow.classList.remove('hidden');

 
})