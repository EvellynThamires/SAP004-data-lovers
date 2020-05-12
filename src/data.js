// Funções de exemplo
// import pokemon from "./data/pokemon/pokemon";

export const filterType = (type, pokemons) => {
  
  let emptyArray = []

  pokemons.forEach(positionPokemon => {

    let findTypePokemon = positionPokemon.type.find(pokemon => pokemon == type)

    if (findTypePokemon != undefined) {
      emptyArray.push(positionPokemon)
    }
  });
  return emptyArray
};

export const filterOrder = (order, pokemons) => {

  if(order == "a-z"){
    return pokemons.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;

    });
  } else {
      return pokemons.sort(function (a, b) {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;

    });
  }
}

export const searchPokemon = (bttnSearch, pokemon) => {
  let searchString = bttnSearch.value.toLowerCase();
  let filterPokemon = pokemon.filter(data => {
    let pokemonString = data.name.toLowerCase();
    let stringByString = pokemonString.substr(0, searchString.length);
    return (stringByString.includes(searchString));
  });
  return filterPokemon;
};