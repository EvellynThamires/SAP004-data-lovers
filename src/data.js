// Funções de exemplo

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

export const anotherExample = () => {
  return 'OMG';
};

