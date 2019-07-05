class Pokemon{
    constructor(pokemon){
        console.log( "Creating new pokemon objects");
        this.id = pokemon.id;
        this.nickname = pokemon.nickname;
        this.species = pokemon.species;
        this.trainer_id = pokemon.trainer_id;
    }

    removePokemon(){
        fetch(`${POKEMONS_URL}/${this.dataset.pokemonId}`, {
            method: 'DELETE'
        }).then(response => response.json())
        .then( () => {this.parentElement.remove()})
    }

    renderDom(trainerUl){
        
        console.log("Render Pokemon to DOM");

        let li = document.createElement('li');
        let button_release = document.createElement('button');
        button_release.innerText = 'Release';
        button_release.dataset.pokemonId = this.id;
        button_release.addEventListener('click', this.removePokemon)
        li.innerText = `${this.nickname} (${this.species})`;
        li.append(button_release);
        trainerUl.append(li)

        
    }



}