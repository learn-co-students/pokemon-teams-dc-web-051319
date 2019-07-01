const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

class Pokemon{
    constructor(pokemon){
        let {id,nickname,species,trainer_id} = pokemon;
        this.id = id;
        this.nickname = nickname;
        this.species = species;
        this.trainer_id = trainer_id;
    }
    render(){
        
        let parentWindow = document.querySelector(`[data-id='${this.trainer_id}']`).querySelector("ul");
        let pokemonLi = document.createElement("li");
        pokemonLi.innerText=`${this.nickname} (${this.species})`;
        let removeButton = document.createElement("button");
        removeButton.innerText = "Remove Pokemon";
        removeButton.classList.add("release");
        removeButton.dataset.pokemonId = this.id;
        removeButton.addEventListener("click",removePokemonHandler);
        pokemonLi.append(removeButton);
        parentWindow.append(pokemonLi);
    }
    release(){
        document.querySelector(`[data-pokemon-id='${this.id}']`).parentElement.remove();
    }
}

class Trainer{
    constructor(trainer){
        let {id,name,pokemons} = trainer;
        this.id = id;
        this.name = name;
        this.pokemons = pokemons;
    }

    render(){
        let parentWindow = document.querySelector("main");
        let trainerDiv = document.createElement("div");
        trainerDiv.classList.add("card");
        trainerDiv.dataset.id = this.id;
        let pTrainer = document.createElement("p");
        pTrainer.innerText = this.name;
        let addButton = document.createElement("button");
        addButton.dataset.trainerId = this.id;
        addButton.innerText="Add Pokemon"
        addButton.addEventListener("click",addPokemonHandler);
        let pokemonUl = document.createElement("ul");
        trainerDiv.append(pTrainer,addButton,pokemonUl);
        parentWindow.append(trainerDiv);
        this.pokemons.forEach(pokemon => {
            let newPokemon = new Pokemon(pokemon);
            newPokemon.render(pokemonUl);
        })
    }
}




document.addEventListener("DOMContentLoaded",init);

function init(e){
    populatePage();
}

function populatePage(){
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => trainers.forEach(trainer =>{
        let newTrainer = new Trainer(trainer);
        newTrainer.render();
    }));
}

function addPokemonHandler(e){
    fetch(POKEMONS_URL,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'trainer_id': Number(e.currentTarget.dataset.trainerId)})
    })
    .then(res => res.json())
    .then(pokemon => {
        if (pokemon.error){
            alert(`${pokemon.error}`)
        }else{
        let newPokemon = new Pokemon(pokemon);
        newPokemon.render();
        }
    });
}

function removePokemonHandler(e){
    fetch(POKEMONS_URL+"/"+e.currentTarget.dataset.pokemonId,{
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(pokemon => {
        let releasedPokemon = new Pokemon(pokemon);
        releasedPokemon.release();
    });

}
