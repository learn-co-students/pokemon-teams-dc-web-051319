const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

let log = console.log

document.addEventListener('DOMContentLoaded', init)

function init() {
    Trainer.getTrainers()
}