class Pokemon {
    constructor(pokemon) {
        this.id = pokemon.id
        this.nickname = pokemon.nickname
        this.species = pokemon.species
        this.trainer_id = pokemon.trainer_id
    }

    renderToDom(trainerUl) {
        let pokemonLi = document.createElement('li')
        pokemonLi.innerText = `${this.nickname} (${this.species})`

        let btn = document.createElement('button')
        btn.classList.add('release')
        btn.innerText = "Release"
        btn.dataset.pokemonId = this.id
        btn.addEventListener('click', this.release)
        
        trainerUl.append(pokemonLi)
        pokemonLi.appendChild(btn)
    }

    release() {
        fetch(`${POKEMONS_URL}/${this.dataset.pokemonId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(() => this.parentElement.remove())
        .catch(() => alert('Server is down. Try again later.'))
    }
}
 