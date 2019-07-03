class Trainer{
    constructor(trainer){
        console.log(`Creating New Trainer object ${trainer.name}`)
        this.id = trainer.id;
        this.name = trainer.name;
        this.pokemonsArray = trainer.pokemons;
    }

    static fetchTrainers() {
        console.log("Fetching Trainer Data from DB")
        fetch(TRAINERS_URL)
            .then(resp => resp.json())
            .then(trainerArray => { 
                trainerArray.forEach(trainer => {
                    let t = new Trainer(trainer)
                    t.renderDOM()
                
                } 
                    
                    )})
    };

    addPokemon(){
        console.log(`Adding pokemon to Trainer with ID #${this.id}`)
        fetch(POKEMONS_URL, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "trainer_id" : this.id, // body data type must match "Content-Type" header
            })
        })
        .then(response => response.json())
        .then(newPokemon => {
            if(newPokemon.error){
                alert(newPokemon.error)
            }
            else{
                let p = new Pokemon(newPokemon)
                p.renderDom(pokemonUl(newPokemon.trainer_id));     
            }
        })
    }

    renderDOM(){
        console.log(`Attempting to render Trainer #${this.id} Data to DOM`)

        let main = mainElement()
        
        let div = document.createElement('div')
        div.classList.add('card')
        div.setAttribute("data-id", this.id)
        let button = document.createElement('button');
        button.innerText = "Add Pokemon"
        button.setAttribute("data-trainer-id", this.id)
        button.addEventListener('click', this.addPokemon.bind(this))
        let p = document.createElement('p')
        p.innerText = this.name
        
        let trainerUl = document.createElement('ul')
        main.appendChild(div)
        div.append( p, button, trainerUl )
        this.pokemonsArray.forEach(pokemon => { 
            let p = new Pokemon(pokemon);
            p.renderDom(trainerUl);
        })
        
    }


}