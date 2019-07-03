
class Trainer {
  constructor(trainer) {
    this.id = trainer.id
    this.name = trainer.name
    this.pokemons = trainer.pokemons
  }

  static getTrainers() {
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(trainersArray => { //
      trainersArray.forEach(trainer => {
        let t = new Trainer(trainer)
        t.renderToDOM()
      })
    })
   }

   addPokemon() {
     fetch(`${BASE_URL}/pokemons`, {
       method: "POST",
       headers: {
          "Content-Type":"application/json"
       },
       body: JSON.stringify({
         "trainer_id": this.id
       })
     }).then(res => res.json())
     .then(newPokemon => {
       if(newPokemon.error){
         alert("Sorry your party is full :(")
       } else {
         let p = new Pokemon(newPokemon)
         let pokemonUl = document.querySelector(`[data-ul-id='${this.id}']`)
         p.renderToDOM(pokemonUl)
       }
     })
   }

    renderToDOM(){
      //grabs main app content area for posting cards
      let main = document.querySelector('main')

      //creates a div element and adds the card class, allowing the CSS to display the card images
      let div = document.createElement('div')
      div.classList.add('card')
      div.dataset.id = this.id

      let p = document.createElement('p')
      p.innerText = this.name

      let button = document.createElement('button')
      button.innerText = "Add Pokemon"
      button.classList.add('button')
      button.addEventListener("click", this.addPokemon.bind(this))

      let pokemonUl = document.createElement('ul')
      pokemonUl.dataset.ulId = this.id
      // debugger

      this.pokemons.forEach(pokemon => {
        let p = new Pokemon(pokemon)
        p.renderToDOM(pokemonUl)
      })


      main.appendChild(div)
      div.append(p, button, pokemonUl)


      // debugger
    }
}
