const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    getPokemon()
})

function getPokemon() {
    fetch('http://localhost:3000/trainers')
    .then(response => response.json())
    .then(trainer => {
        trainer.forEach(renderPokemon)
    })
}

function renderPokemon(trainer){
    let trainerCard = document.createElement("div")
    trainerCard.classList.add("card")
    trainerCard.dataset.id = trainer.id
    // debugger
    getMain().appendChild(trainerCard)

    let trainerr= document.createElement("p")
    trainerr.innerText = trainer.name

    let addButton = document.createElement("button")
    addButton.dataset.trainerId = trainer.id
    addButton.innerText = "Add Pokemon"
    addButton.addEventListener("click", addPokemon)

    let pokeList = document.createElement("ul")
    pokeList.dataset.listId = trainer.id

    trainerCard.append(trainerr, addButton, pokeList)

    
    trainer.pokemons.forEach(pokemon => {
        let li = document.createElement('li')
        li.innerText = `${pokemon.nickname}(${pokemon.species})`
        li.dataset.pokemonId = pokemon.id
        let releaseButton = document.createElement("button")
        releaseButton.dataset.trainerID = pokemon.trainer_id
        releaseButton.classList.add("release")
        releaseButton.innerText = "release"
        releaseButton.addEventListener("click", deletePokemon)
        releaseButton.dataset.pokeId = pokemon.id
        pokeList.append(li)
        li.append(releaseButton)
    });      
}

function addPokemon(event){
    let currentId = event.currentTarget.dataset.id
    let currentSelf = event.currentTarget
    // debugger
    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"  
        },
            
        body: JSON.stringify({
            "trainer_id": currentSelf.dataset.trainerId
        })
    }).then(response => response.json())
    .then(data => displayAdd(data))
}

function displayAdd(pokemon){
    console.log(pokemon)
    
    let pokeList = document.querySelector(`[data-list-id= '${pokemon.trainer_id}']`)
    let li = document.createElement('li')
        li.innerText = `${pokemon.nickname}(${pokemon.species})`
        li.dataset.pokemonId = pokemon.id
        let releaseButton = document.createElement("button")
        releaseButton.dataset.trainerID = pokemon.trainer_id
        releaseButton.classList.add("release")
        releaseButton.innerText = "release"
        releaseButton.addEventListener("click", deletePokemon)
        releaseButton.dataset.pokeId = pokemon.id
        debugger
        pokeList.append(li)
        li.append(releaseButton)

}

function deletePokemon(event){
    let currentId =  event.currentTarget.dataset.pokeId
    // deleteData(currentId)
    let currentChild = event.currentTarget
    fetch(`http://localhost:3000/pokemons/${currentId}`, {
        method: 'DELETE'
    })
    .then(response =>response.json()
    .then(json => {
          console.log(json);
        })
      );
      
    currentChild.parentElement.remove()

}





/////node handlers 

function getMain(){
    return document.querySelector("main")
}