const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', init)

function init() {
    console.log("DOM Has Been Loaded")
    Trainer.fetchTrainers()
}

function mainElement(){
    return document.querySelector('main')
}

function pokemonUl(id){
    return document.querySelector(`[data-id='${id}']`).querySelector('ul')
}

// const BASE_URL = "http://localhost:3000"
// const TRAINERS_URL = `${BASE_URL}/trainers`
// const POKEMONS_URL = `${BASE_URL}/pokemons`





// debugger
// addPokemonBtn().addEventListener('click', addPokemon)



// function mainContainer() {
//     return document.querySelector('body > main') //Gets main 
// }
// function addPokemonBtn() {
//     return document.getElementsByTagName('button')[0]
// }
// function releasePokemonBtn() {

// }







// function renderData(trainer) {

//     //////////////////////////Creates DIV with ID /////////////////////////////
//     let div = document.createElement('div') //Creates DIV element
//     let p = document.createElement('p')     //Creates p element
//     p.append(`${trainer.name}`)
//     div.setAttribute('class', 'card') //Sets attribute of DIV to class="card" 
//     div.setAttribute('data-id', `${trainer.id}`)  //Sets attribute of DIV to data-id = 1
//     div.append(p)

//     /////////////////////////////// Button ////////////////////////////////////
//     let btn_add = document.createElement('button')
//     btn_add.setAttribute('data-trainer-id', `${trainer.id}`)
//     btn_add.append('Add Pokemon')

//     //////////////////////////////NEW JANKY CODE /////////////////////////////
//     btn_add.addEventListener('click', addPokemon)
//     div.append(btn_add)
//     let ul = document.createElement('ul')
//     /////////////////////////////// List /////////////////////////////////////
//     for (i = 0; i < trainer.pokemons.length; i++) {

//         let li = document.createElement('li') 
//         let btn_release = document.createElement('button')
//         btn_release.setAttribute('class', 'release')
//         btn_release.setAttribute('data-pokemon-id', `${trainer.pokemons[i].id}`)
//         btn_release.append('Release')
//         li.append(`${trainer.pokemons[i].nickname} (${trainer.pokemons[i].species})`)
//         li.append(btn_release)
//         ul.append(li)

//     }

//     div.append(ul)
//     mainContainer().append(div)

// }

// function addPokemon(e) {
//     fetch(`${BASE_URL}/pokemons`, {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data), // body data type must match "Content-Type" header
//     })
//         .then(response => response.json()); // parses JSON response into native JavaScript objects 
// }

