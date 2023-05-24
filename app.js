const input = document.querySelector('#text')
const add = document.querySelector('#add')
const listInput = document.querySelector('#list_input')
const item = []
const myItem = document.querySelector('.item')
const error = document.getElementById('error')

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
    <button id="del">X</button>
    </ul>` 
    myItem.innerHTML = itemEl
 });

}
//add item
function addItem (){
    const list = {
    item: input.value,
    checked: false
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
        return
    }
    else error.style.display = 'none'
}
//delete button
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
})

add.addEventListener('click', addItem)
input.addEventListener('keyup',activeBtn)



