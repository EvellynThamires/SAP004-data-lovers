// Funções de exemplo
// import pokemon from "./data/pokemon/pokemon";

export const filterType = (type, pokemons) => {
  let emptyArray = [];

  pokemons.forEach((positionPokemon) => {
    let findTypePokemon = positionPokemon.type.find(
      (pokemon) => pokemon == type
    );

    if (findTypePokemon != undefined) {
      emptyArray.push(positionPokemon);
    }
  });
  return emptyArray;
};

export const filterOrder = (order, pokemons) => {
  if (order == "a-z") {
    return pokemons.sort(function (a, b) {
      
      if (a.name >= b.name) {
        return 1;
      }
      else if (a.name < b.name) {
        return -1;
      }
    });
  } else {
      return pokemons.sort(function (a, b) {
        if (a.name >= b.name) {
          return -1;
        }
    });
  }
};

export const searchPokemon = (searchString, pokemon) => {
    let filterPokemon = pokemon.filter(data => {
    let pokemonString = data.name.toLowerCase();
    let stringByString = pokemonString.substr(0, searchString.length);
    return stringByString.includes(searchString);
  });
  return filterPokemon;
};


let ctx = document.getElementById('graphic').getContext('2d');
export const graphic = (pokemon) => {
  let chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'doughnut',
  
      // The data for our dataset
      data: {
          labels: ['Chance de nascer', 'Média'],
          datasets: [{
              backgroundColor:[
                  '#FFCD56',
                  '#FF6384',
              ],
              borderColor: [
                  '#FFCD56',
                  '#FF6384',
              ],
              data: [pokemon.spawn_chance, pokemon.avg_spawns]
          }]
      }
  });
}
