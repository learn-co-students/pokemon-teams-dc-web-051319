console.log("trainer")
class Trainer {
    constructor(trainer) {
        this.id = trainer.id
        this.name = trainer.name
        this.pokemons = trainer.pokemons
    }

    static getTrainers() {
        fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(trainersArray => {
            trainersArray.forEach(trainer => {
                let trainerInstance = new Trainer(trainer)
                trainerInstance.renderToDOM()
            })
        })
    }

    addPokemon() {
        fetch('http://localhost:3000/pokemons', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                trainer_id: this.id
            })
        })
        .then(resp => resp.json())
        .then(newPokemon => {
            let p = new Pokemon (newPokemon) 
            let pokemonUl = document.querySelector(`[data-ul-id='${this.id}']`)
            p.renderToDOM(pokemonUl)
        })
        .catch(error => console.log(error))
    }

    renderToDOM() {
        let main = document.querySelector("main")
        
        let div = document.createElement("div")
        div.classList.add("card")
        div.dataset.id = this.id

        let p = document.createElement("p")
        p.innerText = this.name

        let button = document.createElement("button")
        button.innerText = "Add Pokemon"
        button.addEventListener("click", this.addPokemon.bind(this))

        let pokemonUl = document.createElement("ul")
        pokemonUl.dataset.ulId = this.id

        main.appendChild(div)
        div.append(p, button, pokemonUl)
        
        this.pokemons.forEach(pokemon => {
            let pokemonInstance = new Pokemon(pokemon)
            pokemonInstance.renderToDOM(pokemonUl)
        })

    }

}