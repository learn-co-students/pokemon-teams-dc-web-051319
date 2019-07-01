const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', init)

function init(){
    getTrainers()

}

function getTrainers(){

    fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(data => data.forEach(grabTrainers))
}

function grabTrainers(data){
    let main = document.querySelector('main')
    let newDiv = document.createElement('div')
    let card = newDiv.classList.add('card')
    let par = document.createElement('p')
    let nuBtn = document.createElement('button')
    nuBtn.innerText = 'Add Pokemon' 
    nuBtn.dataset.trainerId = data.id
    nuBtn.addEventListener('click', addPokemon)
    par.innerText = data.name
    newDiv.appendChild(par)
    newDiv.appendChild(nuBtn)
    newDiv.appendChild(getPokemon(data))
    newDiv.dataset.id = data.id
    main.appendChild(newDiv)

}

    
function addPokemon(e){
    e.preventDefault()
    
   let trainer_id = e.target.dataset.trainerId
    fetch(POKEMONS_URL, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            trainer_id: trainer_id
        })
     
    })
    .then(res => res.json())

    .then(data => {
        puttingToDom(data)
    })
    .catch(error =>  alert('Party is full!', error.message))
    
}

function puttingToDom(data){
    
let trainerCard = document.querySelector(`[data-id = '${data.trainer_id}']`).children[2] 

    data.trainer_id
    let li = document.createElement('li') 
    let btn = document.createElement('button')
    btn.classList.add('release')
    btn.innerText = "Release"
    btn.dataset.pokemonId = data.id
    btn.addEventListener('click', giveAway)
    newLi = li.innerText = `${data.nickname} (${data.species})`
    li.appendChild(btn)
    trainerCard.appendChild(li)
}


function getPokemon(data){
    let ul = document.createElement('ul')
    

    for(let i = 0; i < data.pokemons.length; i++){
        let li = document.createElement('li') 
        let btn = document.createElement('button')
        btn.classList.add('release')
        btn.innerText = "Release"
        btn.dataset.pokemonId = data.pokemons[i].id
        btn.addEventListener('click', giveAway)
        newLi = li.innerText = `${data.pokemons[i].nickname} (${data.pokemons[i].species})`
        li.appendChild(btn)
        ul.appendChild(li)
        
    }  
    return ul
}

function giveAway(e){
    e.preventDefault()
    trainer_id = parseInt(e.target.parentElement.parentElement.parentElement.dataset.trainerId)
    let id = parseInt(e.target.dataset.pokemonId)
    fetch(`${POKEMONS_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({trainer_id})
    
    })
    .then(res=>res.json())
    .then(data => takeAwayFromDom(data))
}

function takeAwayFromDom(data){
   let pokeList = document.querySelector(`[data-id = '${data.trainer_id}'] ul`)
   let newVar = pokeList.querySelector(`[data-pokemon-id = '${data.id}']`).parentElement
   pokeList.removeChild(newVar)
}


