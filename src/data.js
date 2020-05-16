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
};

export const searchPokemon = (searchString, pokemon) => {
    let filterPokemon = pokemon.filter((data) => {
    let pokemonString = data.name.toLowerCase();
    let stringByString = pokemonString.substr(0, searchString.length);
    return stringByString.includes(searchString);
  });
  return filterPokemon;
};

let ctx = document.getElementById('myChart').getContext('2d');
export const graphic = (pokemon) => {
  let chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'doughnut',
  
      // The data for our dataset
      data: {
          labels: ['Chance de aparecer', 'Média'],
          datasets: [{
              backgroundColor: ['rgb(255, 99, 132)', 'rgb(255,255,0)' ],
              borderColor: 'rgb(255, 99, 132)',
              data: [pokemon.spawn_chance, pokemon.avg_spawns]
          }]
      },
  
      // Configuration options go here
      options: {}
  });
  }