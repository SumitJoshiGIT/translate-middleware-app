const settings=document.querySelector('.settings')
const settingsDialog=document.querySelector('.settings-dialog')
const close=settingsDialog.querySelector('.close')
const addButton=document.querySelector('#add-key')
const keyList=document.querySelector('.key-list')
const key=document.querySelector('.key').cloneNode(true);
key.querySelector('input').value="";

//settings.addEventListener('click',(event)=>settingsDialog.classList.remove('hidden'));
const dropDowns=document.querySelectorAll('.keys')
dropDowns.forEach(el=>{
    el.querySelector('.drop-down').addEventListener('click',(ev)=>{
        const cl=el.querySelector('.key-list').classList;
        if(cl.contains('hidden'))cl.remove('hidden');
        else cl.add('hidden')
    })

})



async function addNode(){
  let clone=key.cloneNode(true)
  keyList.append(clone);
  clone=clone.querySelector('.retract-key')
  clone.addEventListener('click',removeNode(clone))            
  
}
async function handleClick(event){
    const classes=event.target.classList
    if (classes.contains('close'))settingsDialog.classList.add('hidden')
    else if(classes.contains('drop-down')){
            classes=event.target.parentNode.nextSibling.classList
            (classes.contains('hidden'))?classes.remove('hidden'):classes.add('hidden')
    }        
}

function removeNode(el){
    
     return (ev)=>el.parentNode.remove();
    
}

addButton.addEventListener('click',addNode)

document.querySelectorAll('.retract-key').forEach((el)=>el.addEventListener('click',removeNode(el))
)


settingsDialog.addEventListener('click',handleClick)

