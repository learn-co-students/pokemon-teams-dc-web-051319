class Trainer {

    // only works in chrome
    static all = [];

    constructor(id, name) {
        this.id = id;
        this.name = name;
        Trainer.all.push(this);
    }

    get pokemons() {
        return Pokemon.all.filter( pokemon => {
            return pokemon.trainerId === this.id;
        });
    }

    hasFullTeam() {
        return this.pokemons.length === 6
    }

    addPokemon(pokemon) {
        pokemon.trainerId = this.id;
        return pokemon.trainerId;
    }

    updateCard() {
        let pokemonList = document.querySelector(`[data-id="${this.id}"] ul`);
        let newPokemon = this.pokemons.splice(-1)[0];
        pokemonList.appendChild(newPokemon.renderListItem());
    }

    renderCard() {
        // create card
        let card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = this.id;

        // create name and append
        let name = document.createElement("p");
        name.innerText = this.name;
        card.appendChild(name);
        
        // create add-button and append
        let button = document.createElement("button");
        button.dataset.trainerId = this.id;
        button.innerText = "Add Pokemon";
        card.appendChild(button);

        // create an event
        button.addEventListener("click", () => {
            if (!this.hasFullTeam()) {
                this.getNewPokemon();
                this.updateCard();
            } else {
                window.alert("Your Team is Full!");
            };
        });

        // create pokemon list and append
        let pokeList = document.createElement("ul")
        this.pokemons.forEach(pokemon => {
            pokeList.appendChild(pokemon.renderListItem());
        });
        card.appendChild(pokeList);

        // return completed card
        return card;
    }

    getNewPokemon() {
        let trainerData = {
            trainer_id: this.id
        };
    
        let configObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(trainerData)
        };
    
        fetch(POKEMONS_URL, configObject)
            .then(response => response.json())
            .then(pokemon => {
                let pokemonObj = new Pokemon(
                    pokemon.id,
                    pokemon.nickname,
                    pokemon.species
                );
                this.addPokemon(pokemonObj)
            })
            .catch(error => {
                window.alert(error.message);
            });
    };

    static getData(url) {
        fetch(url)
            .then(response => response.json())
            .then(trainers => {
                trainers.forEach(trainer => {
                    //create Trainer Object
                    let trainerObj = new Trainer(
                        trainer.id,
                        trainer.name
                    );
                    //create Pokemon Objects and add to Trainer
                    trainer.pokemons.forEach(pokemon => {
                        let pokemonObj = new Pokemon(
                            pokemon.id,
                            pokemon.nickname,
                            pokemon.species
                        );
                        trainerObj.addPokemon(pokemonObj);
                    });
                });
            })
            .then(() => Trainer.renderData());
    }

    static renderData() {
        let cardContainer = document.querySelector("main")
        this.all.forEach(trainer => {
            cardContainer.appendChild(trainer.renderCard());
        });
    }
}