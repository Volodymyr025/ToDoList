const input = document.querySelector('#text')
const input_edit = document.querySelector('#input-edit')
const add = document.querySelector('#add')
const add_edit = document.querySelector('#add-edit')
const listInput = document.querySelector('#list_input')
const item = []
const complite_list = []
const myItem = document.querySelector('.item')
const error = document.getElementById('error')
const beckground = document.getElementById('background')
const close_complite = document.getElementById('close')
const done_list = document.getElementById('done-list')
const complite = document.getElementById('complite')
const item_complite = document.querySelector('.item-complite')

let index_complite
let index_edit
let checkPerent
let checkFunction = false

// visible add button
function activeBtn(){
    if(input.value){
        add.classList.add('active')
        add.classList.remove('none__activeBtn')
        add.disabled = false
        return
    }
    else{
        add.classList.remove('active')
        add.classList.add('none__activeBtn')
        add.disabled = true
        return
    }
}
function activeBtnEdit(){
    if(input_edit.value){
        add_edit.classList.add('active')
        add_edit.classList.remove('none__activeBtn')
        add_edit.disabled = false
        return
    }
    else{
        add_edit.classList.remove('active')
        add_edit.classList.add('none__activeBtn')
        add_edit.disabled = true
        return
    }
}

//create item
function createItemList () {
    if(!input.value){
    return
}
else{
    myItem.style.visibility = 'visible'
 }
 myItem.innerHTML = ''
 let itemEl = ''
 item.forEach(element => {
    itemEl += `<ul class="items">
    <li class="item-list">${element.item}</li>
    <div class="icon done"><i id="icon-done" class="fa-regular fa-circle-check"></i></div>
    <button id="del">X</button>
    <div class="icon"><i id="icon-list" class="fa-solid fa-pen-to-square"></i></div>
    </ul>` 
    myItem.innerHTML = itemEl
 });

}
//add item
function addItem (){
    const list = {
    item: input.value,
 }
 item.push(list)
 removeDuplicates()
 createItemList()
  input.value = ''
  activeBtn()
}
//check on dublicates list
function removeDuplicates (){
    const dupliicate = item.filter((el, index) => {
        return index === item.findIndex((obj) => {
            return JSON.stringify(el) === JSON.stringify(obj)
        })
    })
    
    if(JSON.stringify(item) !== JSON.stringify(dupliicate)){
        item.pop()
        error.style.display = 'block'
        checkFunction = true
        return
    }
    else error.style.display = 'none'
}
//button
listInput.addEventListener('click',(e) =>{
   if(e.target.id === 'del'){
     const perent = e.target.closest('ul')
     let searchName = perent.firstElementChild.textContent
     let index = item.map(e => e.item).indexOf(searchName);
     item.splice(index, 1)
     perent.remove()
     if(item.length === 0){
        myItem.style.visibility = 'hidden'
        return
     }
   }
   if(e.target.id === 'icon-list'){
    background.style.display = 'block'
    const perent = e.target.closest('ul')
    let searchName = perent.firstElementChild.textContent
    let index = item.map(e => e.item).indexOf(searchName);
    index_edit = index   
    checkPerent = perent
}
if(e.target.id === 'icon-done'){
    const perent = e.target.closest('ul')
    let searchName = perent.firstElementChild.textContent
    let index = item.map(e => e.item).indexOf(searchName);
    item.splice(index, 1)
    perent.remove()
    index_complite = index
    complite_list.push(searchName)
    item_complite.innerHTML = ''
    let itemEl = ''
    complite_list.forEach(element => {
    itemEl += `<ul class="items">
    <li class="item-list">${complite_list[index_complite]}</li>
    <button id="del">X</button>
    </ul>` 
    item_complite.innerHTML = itemEl
 });
}
})

//edit
add_edit.addEventListener('click', ()=>{ 
    item.splice(index_edit,1,{item: input_edit.value})
    removeDuplicates()
 if(checkFunction){
    item.splice(index_edit,0,{item: checkPerent.children[0].textContent})
    checkFunction = false
    background.style.display = 'none'
    return
 }
    myItem.innerHTML = ''
 let itemEl = ''
 item.forEach(element => {
    itemEl += `<ul class="items">
    <li class="item-list">${element.item}</li>
    <div class="icon done"><i id="icon-done" class="fa-regular fa-circle-check"></i></div>
    <button id="del">X</button>
    <div class="icon"><i id="icon-list" class="fa-solid fa-pen-to-square"></i></div>
    </ul>` 
    myItem.innerHTML = itemEl
 });
 
    input_edit.value = ''
    background.style.display = 'none'
    return
})

//item_complite_list del button
item_complite.addEventListener('click',(e) =>{
    if(e.target.id === 'del'){
      const perent = e.target.closest('ul')
      let searchName = perent.firstElementChild.textContent
      let index = item.map(e => e.item).indexOf(searchName);
      complite_list.splice(index, 1)
      perent.remove()
    }})

add.addEventListener('click', addItem)
input.addEventListener('keyup',activeBtn)
input_edit.addEventListener('keyup',activeBtnEdit)
background.addEventListener('click',(e)=> {
    if(e.target.id === 'background'){
    background.style.display = 'none'}})
close_complite.addEventListener('click',()=>{
    complite.style.display = 'none'
})
done_list.addEventListener('click',()=>{
    complite.style.display = 'block'
})
//add complite



