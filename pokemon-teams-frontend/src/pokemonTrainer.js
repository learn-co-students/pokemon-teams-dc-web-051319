function displayATrainersWithPokemon(entry){
  //add div container to main tag
  let mainTag = document.querySelector("main");

  //div container for trainer and its pokemon entries
  let divContainingATrainer = createDivContainerForTrainer(entry);

  //add trainer name in p element with divTrainerContainer
  let trainerName = createTrainerName(entry);

  //add pokemon button
  let addPokemonButton = createAddPokemonButton(entry);

  //ul for each trainers pokemon consist of li entries
  let ulOfTrainer = createTrainerPokemonList();

  //create li entry for each pokemon
  let arrayEntryPokemons = entry.pokemons
  arrayEntryPokemons.forEach((pokemonEntry) => {aPokemonEntry(pokemonEntry,ulOfTrainer)} );

  //add elements to DOM
  divContainingATrainer.append(trainerName, addPokemonButton,ulOfTrainer)
  mainTag.appendChild(divContainingATrainer)
}

function createDivContainerForTrainer(entry){
  let divTrainerContainer = document.createElement("div");
  divTrainerContainer.classList.add("card");
  //  divTrainerContainer.dataset.id = entry.id;
  divTrainerContainer.dataset.trainerId = entry.id;
  return divTrainerContainer;
}

function createTrainerName(entry){
  let trainerName = document.createElement("p");
  trainerName.innerText = entry.name;
  return trainerName;
}

function createAddPokemonButton(entry){
  let addPokemonButton = document.createElement("button");
  addPokemonButton.dataset.id = entry.id;
  addPokemonButton.innerText = "Add Pokemon";
  addPokemonButton.addEventListener("click", addPokemonButtonEvent )
  return addPokemonButton;
}

function createTrainerPokemonList(){
  let trainerPokemonParty = document.createElement("ul");
  return trainerPokemonParty;
}

function aPokemonEntry(pokemonEntry,ulOfTrainer){
  //use a for each loop to create an li for each of that trainer POKEMONS
  // bundle those li together and return it.
  let aPokemonListEntry = document.createElement("li");
  let releasePokemonButton = document.createElement("button");
  releasePokemonButton.classList.add("release");
  releasePokemonButton.innerText = "Release";
  releasePokemonButton.dataset.pokemonId = pokemonEntry.id;
  releasePokemonButton.addEventListener("click", releasePokemonButtonEvent)
  aPokemonListEntry.innerText = `${pokemonEntry.nickname} (${pokemonEntry.species})`
  aPokemonListEntry.append(releasePokemonButton);
  //append created li element to this trainer ul element
  ulOfTrainer.appendChild(aPokemonListEntry);
}

//export class User{}
