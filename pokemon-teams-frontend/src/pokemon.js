class Pokemon {

    // only works in chrome
    static all = [];

    constructor(id, nickname, species) {
        this.id = id;
        this.nickname = nickname;
        this.species = species;
        Pokemon.all.push(this);
    }

    releaseButtonHandler() {
        fetch(`${POKEMONS_URL}/${this.dataset.pokemonId}`, {method: "DELETE"}) 
            .then(response => {
                while (this.parentElement.firstChild) {
                    this.parentElement.removeChild(this.parentElement.firstChild);
                };
            })
            .catch(error => {
                window.alert(error.message);
            });
    }

    renderListItem() {
        // create list item
        let item = document.createElement("li");
        item.innerText = `${this.nickname} (${this.species})`;

        // create release button and append 
        let button = document.createElement("button");
        button.dataset.pokemonId = this.id;
        button.innerText = "Release";
        item.appendChild(button);

        // add release event
        button.addEventListener("click", this.releaseButtonHandler);

        // return completed list item
        return item;
    }

}