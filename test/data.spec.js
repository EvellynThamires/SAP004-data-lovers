import { filterType } from '../src/data.js';

const output = [   {
       "number": "001",     "name": "Bulbasaur",     "image": "http://www.serebii.net/pokemongo/pokemon/001.png",     "types": "Grass, Poison",     "weaknesses": "Fire, Ice, Flying, Psychic",     "probability": 0.69,   } ]

const pokemonInput =  
  {
  "id": 1,
  "num": "001",
  "name": "Bulbasaur",
  "img": "http://www.serebii.net/pokemongo/pokemon/001.png",
  "type": [
    "Grass",
    "Poison"
  ],
  "height": "0.71 m",
  "weight": "6.9 kg",
  "candy": "Bulbasaur Candy",
  "candy_count": 25,
  "egg": "2 km",
  "spawn_chance": 0.69,
  "avg_spawns": 69,
  "spawn_time": "20:00",
  "multipliers": [1.58],
  "weaknesses": [
    "Fire",
    "Ice",
    "Flying",
    "Psychic"
  ],
  "next_evolution": [{
    "num": "002",
    "name": "Ivysaur"
  }, {
    "num": "003",
    "name": "Venusaur"
  }]
  }

//const bttnValue = "Click"

it('returns `tem que retornar o tipo do pokémon`', () => {
       expect(filterType("type", pokemonInput)).toBe(output)
          });

describe('filterType', () => {  
   it('is a function', () => { 
         expect(typeof filterType).toBe('function'); 
   })
        });



