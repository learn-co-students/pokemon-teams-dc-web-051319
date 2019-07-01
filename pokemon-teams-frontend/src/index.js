const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
  fetchTrainers()
})

const container = document.querySelector('main')

const fetchTrainers = () => {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => {
      trainers.forEach(trainer => renderTrainer(trainer))
    })
  },

  renderTrainer = (trainer) => {
    const card = document.createElement('div')
      card.classList.add('card')
      card.dataset.id = trainer.id

    const p = document.createElement('p')
      p.innerText = trainer.name

    const button = document.createElement('button')
      button.dataset.trainerId = trainer.id
      button.addEventListener('click', addPokemon)
      button.innerText = 'Add Pokemon'

    const pokemonList = document.createElement('ul')

    card.append(p, button, pokemonList)

    trainer.pokemons.forEach(pokemon => renderPokemon(pokemon, pokemonList))

    container.append(card)
  },

  renderPokemon = (pokemon, ul) => {
    li = document.createElement('li')
      li.innerHTML = `${pokemon.nickname} (${pokemon.species})`

    button = document.createElement('button')
      button.dataset.pokemonId = pokemon.id
      button.classList.add('release')
      button.innerText = 'Release'
      button.addEventListener('click', releasePokemon)

    li.append(button)
    ul.appendChild(li)
  },

  addPokemon = (e) => {
    const owner = e.target.parentElement.querySelector('p').innerText
    const pokemonList = e.target.parentElement.querySelector('ul')
    let pokemonOwned = pokemonList.childElementCount

    if (pokemonOwned < 6) {
      const configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          'trainer_id': e.target.dataset.trainerId
        })
      }

      fetch(POKEMONS_URL, configObj)
      .then(resp => resp.json())
      .then(pokemon => {
        renderPokemon(pokemon, pokemonList)
        console.log(`${owner} has added ${pokemon.nickname} (${pokemon.species}).`)
      })
    } 
    else {
      alert(`${owner.toUpperCase()} HAS ALL THE POKEMON THEY CAN CARRY, or whatever.`)
    }
  },

  releasePokemon = (e) => {
    const target = e.target
    const owner = target.closest('.card').querySelector('p').innerText
    const id = target.dataset.pokemonId
    const pokemon = target.parentElement
    debugger

    // Remove from page
    pokemon.remove()

    // Remove from database
    fetch(`${POKEMONS_URL}/${id}`, {method: 'DELETE'})
    .then(resp => resp.json())
    .then(pokemon => {
      console.log(`${owner} has released ${pokemon.nickname} (${pokemon.species})`)
    })
  }



  
