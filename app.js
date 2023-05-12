const input = document.querySelector('#text')
const add = document.querySelector('#add')
const del = document.querySelector('#del')

input.addEventListener('keydown',fdsfs)

function fdsfs(){
    if(input.value !== ''){
        add.className = 'activeBtn'
    }
    if(input.value === ''){
        remove.className = 'activeBtn'
    }
}






