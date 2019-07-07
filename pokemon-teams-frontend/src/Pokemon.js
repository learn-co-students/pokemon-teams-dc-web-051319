console.log("sup")
class Pokemon {
    constructor(pokemon) {
        this.id = pokemon.id
        this.nickname = pokemon.nickname
        this.species = pokemon.species
        this.trainerId = pokemon.trainer_id
    }

    renderToDOM(trainerUl) {
        
        let pokemonLi = document.createElement("li")
        pokemonLi.innerText = `${this.species} (${this.nickname})`

        let button = document.createElement("button")
        button.classList.add("release")
        button.innerText = "Release"
        button.dataset.pokemonId = this.id
        button.addEventListener("click", this.release)

        trainerUl.append(pokemonLi)
        pokemonLi.appendChild(button)
    }

    release() {
        fetch(`${POKEMONS_URL}/${this.dataset.pokemonId}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(() => {
        this.parentElement.remove()
        })
        .catch(error => {
            alert("Server is down, try again later")
            console.log(error)
        })
    }
}