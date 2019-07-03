class Pokemon{
  constructor(pokemon) {
    this.id = pokemon.id
    this.nickname = pokemon.nickname
    this.species = pokemon.species
    this.trainerId = pokemon.trainer_id
  }

  renderToDOM(trainerUl) {

    let pokemonLi = document.createElement("li")
    pokemonLi.innerText = `${this.nickname} (${this.species})`

    let button = document.createElement("button")
    button.classList.add("release")
    button.innerText = "Release"
    button.dataset.pokemonId = this.id
    button.addEventListener("click", this.release)

    trainerUl.append(pokemonLi)
    pokemonLi.appendChild(button)
    //
//debugger

  }
  release(){
    console.log("trying to release pokemon")
    fetch(`${POKEMONS_URL}/${this.dataset.pokemonId}`, {
      method: "DELETE"
    })
    this.parentElement.remove()
  }

}
