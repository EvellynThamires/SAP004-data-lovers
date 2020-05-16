import { filterType, filterOrder, searchPokemon } from "../src/data.js";

const pokemonInput = [
  {
    id: 1,
    num: "001",
    name: "Bulbasaur",
    img: "http://www.serebii.net/pokemongo/pokemon/001.png",
    type: ["Grass", "Poison"],
    height: "0.71 m",
    weight: "6.9 kg",
    candy: "Bulbasaur Candy",
    candy_count: 25,
    egg: "2 km",
    spawn_chance: 0.69,
    avg_spawns: 69,
    spawn_time: "20:00",
    multipliers: [1.58],
    weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
    next_evolution: [
      {
        num: "002",
        name: "Ivysaur",
      },
      {
        num: "003",
        name: "Venusaur",
      },
    ],
  },
];

const data = [
  {
    id: 4,
    num: "004",
    name: "Charmander",
    img: "http://www.serebii.net/pokemongo/pokemon/004.png",
    type: ["Fire"],
    height: "0.61 m",
    weight: "8.5 kg",
    candy: "Charmander Candy",
    candy_count: 25,
    egg: "2 km",
    spawn_chance: 0.253,
    avg_spawns: 25.3,
    spawn_time: "08:45",
    multipliers: [1.65],
    weaknesses: ["Water", "Ground", "Rock"],
    next_evolution: [
      {
        num: "005",
        name: "Charmeleon",
      },
      {
        num: "006",
        name: "Charizard",
      },
    ],
  },
  {
    id: 1,
    num: "001",
    name: "Bulbasaur",
    img: "http://www.serebii.net/pokemongo/pokemon/001.png",
    type: ["Grass", "Poison"],
    height: "0.71 m",
    weight: "6.9 kg",
    candy: "Bulbasaur Candy",
    candy_count: 25,
    egg: "2 km",
    spawn_chance: 0.69,
    avg_spawns: 69,
    spawn_time: "20:00",
    multipliers: [1.58],
    weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
    next_evolution: [
      {
        num: "002",
        name: "Ivysaur",
      },
      {
        num: "003",
        name: "Venusaur",
      },
    ],
  },
];
describe("filterType", () => {
  it("is a function", () => {
    expect(typeof filterType).toBe("function");
  });

  it("returns `retorna o tipo do pokemon`", () => {
    let pokemons = filterType("Grass", data);
    expect(pokemons).toEqual(pokemonInput);
  });

  it("returns `retorno não deve ser igual`", () => {
    let pokemons = filterType("Fire", data);
    expect(pokemons).not.toEqual(pokemonInput);
  });
});

it("should throw TypeError when invoked with wrong argument types", () => {
  expect(() => data.filterType()).toThrow(TypeError);
  expect(() => data.filterType(0)).toThrow(TypeError);
  expect(() => data.filterType(null, [])).toThrow(TypeError);
  expect(() => data.filterType(0, 0)).toThrow(TypeError);
});

const name = [{ name: "Bulbasaur" }, { name: "Pikachu" }, { name: "Squirtle" }];

describe("filterOrder", () => {
  it("is a function", () => {
    expect(typeof filterOrder).toEqual("function");
  });
});

describe("returns `retornar pokémon na ordem`", () => {
  it("ordem", () => {
    let pokemons = filterOrder("a-z", name);
    expect(pokemons).toEqual(name);
  });
});

describe("returns `retornar pokémon na ordem`", () => {
  it("ordem", () => {
    let pokemons = filterOrder("z-a", name);
    expect(pokemons).toEqual(name);
  });
});

it("should throw TypeError when invoked with wrong argument types", () => {
  expect(() => data.filterOrder()).toThrow(TypeError);
  expect(() => data.filterOrder(0)).toThrow(TypeError);
  expect(() => data.filterOrder(null, [])).toThrow(TypeError);
  expect(() => data.filterOrder(0, 0)).toThrow(TypeError);
});

describe("searchPokemon", () => {
  it("is a function", () => {
    expect(typeof searchPokemon).toBe("function");
  });

  it("returns `retorna a pesquisa`", () => {
    let pokemons = searchPokemon([{"Bulbasaur"}], name);
    expect(pokemons).toBe([{"Bulbasaur"}]);
  });

  it("returns `retorno não deve ser igual`", () => {
    let pokemons = searchPokemon("Rattata", name);
    expect(pokemons).not.toEqual("Rattata");
  });
});

it("should throw TypeError when invoked with wrong argument types", () => {
  expect(() => data.searchPokemon()).toThrow(TypeError);
  expect(() => data.searchPokemon(0)).toThrow(TypeError);
  expect(() => data.searchPokemon(null, [])).toThrow(TypeError);
  expect(() => data.searchPokemon(0, 0)).toThrow(TypeError);
});
