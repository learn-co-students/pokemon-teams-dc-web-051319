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
                    trainerInstance.renderToDom()
                })
            })
    }

    addPokemon() {
        fetch(POKEMONS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'trainer_id': this.id
            })
        })
            .then(response => response.json())
            .then(newPokemon => {
                if (newPokemon.error) {
                    alert(newPokemon.error)
                } else {
                    let pokemonInstance = new Pokemon(newPokemon)
                    let pokemonUl = document.querySelector(`[data-ul-id='${this.id}']`)
                    pokemonInstance.renderToDom(pokemonUl)
                }
            })
    }

    renderToDom() {
        let main = document.querySelector('main')
        let div = document.createElement('div')
        div.classList.add('card')
        div.dataset.id = this.id

        let p = document.createElement('p')
        p.innerText = this.name

        let btn = document.createElement('button')
        btn.innerText = 'Add Pokemon'
        btn.addEventListener('click', this.addPokemon.bind(this))

        let pokemonUl = document.createElement('ul')
        pokemonUl.dataset.ulId = this.id 

        main.appendChild(div)
        div.append(p, btn, pokemonUl)

        this.pokemons.forEach(pokemon => {
            let pokemonInstance = new Pokemon(pokemon)
            pokemonInstance.renderToDom(pokemonUl)
        })
    }
}
