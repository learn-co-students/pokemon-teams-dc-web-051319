document.addEventListener('DOMContentLoaded', init )

const main = document.querySelector("main")

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


function init() {

  getTrainers()

}

function getTrainers () {
  return fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(trainer => trainerCard(trainer))
}


function trainerCard (trainers) {
  trainers.forEach ( trainer => {
    const trainerDiv = document.createElement(`div`)
    trainerDiv.className = "card"
    trainerDiv.setAttribute('data-id', trainer.id)
    // trainerDiv.id = `data-${trainer.id}`
    const p = document.createElement(`p`)
    p.innerText = trainer.name
    let addButton = document.createElement(`button`)
    addButton.innerText = "Add Pokemon"
    addButton.setAttribute(`data-trainer-id`, trainer.id)
    addButton.addEventListener('click', addHandler)
    trainerDiv.appendChild(p)
    main.appendChild(trainerDiv)
    trainerDiv.appendChild(addButton)
    const ul = document.createElement(`ul`)
    trainerDiv.appendChild(ul)
    trainer.pokemons.forEach (pokemon => {
        const li = document.createElement(`li`)
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        ul.appendChild(li)
        let releaseButton = document.createElement(`button`)
        releaseButton.innerText = "Release"
        releaseButton.setAttribute(`data-pokemon-id`, pokemon.id)
        releaseButton.className = "release"
        releaseButton.addEventListener('click', releaseHandler)
        li.appendChild(releaseButton)
    })
  })
}

function addHandler (e) {

  let trainerId = e.target.dataset.trainerId

  fetch(POKEMONS_URL , {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      trainer_id: trainerId
    })
  })
  .then( response => response.json() )
  .then( update => {
    if (update.id) {
      let ul = document.querySelector(`[data-id="${update.trainer_id}"]`).lastElementChild
      let li = document.createElement(`li`)
      li.innerText = `${update.nickname} (${update.species})`
      ul.appendChild(li)
      let releaseButton = document.createElement(`button`)
      releaseButton.innerText = "Release"
      releaseButton.setAttribute(`data-pokemon-id`, update.id)
      releaseButton.className = "release"
      releaseButton.addEventListener('click', releaseHandler)
      li.appendChild(releaseButton)
    } else {
        alert("There is no more room in your card")
    }
  })
}




function releaseHandler (e) {

  let p = e.target.dataset.pokemonId
  let t = e.target.parentNode.parentNode.parentNode.dataset.id

  fetch(POKEMONS_URL + "/" + p , {
    method: "DELETE"
  })
  .then( response => response.json() )
  .then( update => {
    document.querySelector(`[data-pokemon-id='${update.id}']`).parentElement.remove()
  })

}

// e.target.parentNode.parentNode.parentNode.id.split("-")[1]

// addButton.dataset.trainer = trainer.id

// trainer.pokemons.forEach( pokemon => console.log(pokemon.nickname) )
