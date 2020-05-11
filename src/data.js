// Funções de exemplo
// import pokemon from "./data/pokemon/pokemon";

export const filterType = (bttnFilter, pokemons) => {
  let type = bttnFilter[bttnFilter.selectedIndex].value

  let emptyArray = []

  pokemons.forEach(positionPokemon => {

    let findTypePokemon = positionPokemon.type.find(element => element == type)
    
    if(findTypePokemon != undefined){
      emptyArray.push(positionPokemon)
    }
  });
return emptyArray
};

export const filterOrder = (bttnOrder, pokemons) => {
  let order = bttnOrder[bttnOrder.selectedIndex].value
  
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
