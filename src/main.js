import { filterType, filterOrder, searchPokemon} from './data.js';
import data from './data/pokemon/pokemon.js';

//Pegando a id "Root" do HTML
const content = document.querySelector("#root"); 
//Pegando id dos botões
const bttnFilter = document.querySelector("#filter-by-type");
const bttnOrder = document.querySelector("#order-button");
const bttnFavorite = document.querySelector("#favorite");
//area de pesquisar pokemon
const bttnSearch = document.querySelector("#search");

const modal = document.querySelector("#modals");
const modalGame = document.querySelector("#modal-game");
const bttnGame = document.querySelector("#bttn-game")
const span = document.getElementsByClassName("close");

const modalFavorites = document.querySelector("#modal-favorites");

const namePokemon = document.querySelector(".modal-name h1");
const heightPokemon = document.querySelector("#height");
const weigthPokemon = document.querySelector("#weight");
const candyPokemon = document.querySelector("#candy");
const candyQuantityPokemon = document.querySelector("#candy-quantity");
const eggPokemon = document.querySelector("#egg");
const timePokemon = document.querySelector("#spawn-time");
const typePokemon = document.querySelector("#types");
const weaknessPokemon = document.querySelector("#weakness");
const evolutionPokemon = document.querySelector(".content-evolution");


function showElements(data){
    if(data.length != 0){
        data.forEach(element => {   
        
            let createDiv = 
            `
                <div class="box-pokemon ${element.type[0]}-light" data-num="${element.num}"> 
                    <div class="info-pokemon" data-num="${element.num}">
                        <p data-num="${element.num}"> #${element.num} ${element.name}</p>
                    </div>
                    <div class="box-image ${element.type[0]}" data-num="${element.num}">
                        <img src="${element.img}" data-num="${element.num}">  
                    </div>
                </div>
            `
        
            //Adicionando as divs dentro da div "Root".
            content.innerHTML += createDiv
        });

        let cards = document.querySelectorAll(".box-pokemon")
        addEventCards(cards)

    } else {
        let createDiv =
        `
            <p class="alert">Pokemons não encontrados</p>
        `

        //Adicionando as divs dentro da div "Root".
        content.innerHTML += createDiv
    }
}

function addEventCards(pokemon) {
    pokemon.forEach(card => {
        card.addEventListener("click", function(event) {
            //O elemento que foi clicado.
            let targetElement = event.target || event.srcElement;
            //Guarda o num do elemento.
            let num = targetElement.dataset.num
            //Caso o número seja igual ao num, guarda na variável.
            let pokemonClicked = data.pokemon.find(element =>  element.num == num)
            
            graphic(pokemonClicked)

            namePokemon.innerHTML = `#${pokemonClicked.num} ${pokemonClicked.name}`
            heightPokemon.innerHTML = `${pokemonClicked.height}`
            weigthPokemon.innerHTML = `${pokemonClicked.weight}`
            candyPokemon.innerHTML = `${pokemonClicked.candy}`
            timePokemon.innerHTML = `${pokemonClicked.spawn_time}`
            
            if(pokemonClicked.candy_count == undefined){
                candyQuantityPokemon.innerHTML = "N/A"
            }
            else{
                candyQuantityPokemon.innerHTML = `${pokemonClicked.candy_count}`
            }
            
            if(pokemonClicked.egg == "Not in Eggs"){
                egg.innerHTML = "N/A"
            }
            else{
                eggPokemon.innerHTML = `${pokemonClicked.egg}`
            }

            typePokemon.innerHTML = ""
            pokemonClicked.type.forEach(element => {
                let iconsPokemon = icons(element)
                typePokemon.innerHTML += `<div class="chip ${element}"> ${iconsPokemon} ${element}</div>`
            })

            weaknessPokemon.innerHTML = ""
            pokemonClicked.weaknesses.forEach(element => {
                let iconsPokemon = icons(element)
                weaknessPokemon.innerHTML += `<div class="chip ${element}"> ${iconsPokemon} ${element}</div>`
            })

            evolutionPokemon.innerHTML = "" 
            if(pokemonClicked.next_evolution && pokemonClicked.next_evolution.length >= 2){
                evolutionPokemon.innerHTML += `
                    <div class="evolution-info"> 
                        <img src="${pokemonClicked.img}">
                        <p>#${pokemonClicked.num}</p>
                        <p>${pokemonClicked.name}</p>
                    </div>
                `
                showEvolution(pokemonClicked.next_evolution)
            }
            else if(pokemonClicked.next_evolution && pokemonClicked.next_evolution.length > 0 
                && pokemonClicked.prev_evolution && pokemonClicked.prev_evolution.length > 0){
                showEvolution(pokemonClicked.prev_evolution)
                    evolutionPokemon.innerHTML += `
                        <div class="evolution-info"> 
                            <img src="${pokemonClicked.img}">
                            <p>#${pokemonClicked.num}</p>
                            <p>${pokemonClicked.name}</p>
                        </div>
                    `
                showEvolution(pokemonClicked.next_evolution)
            }
            else if(pokemonClicked.next_evolution && pokemonClicked.next_evolution.length >= 1){
                evolutionPokemon.innerHTML += `
                    <div class="evolution-info"> 
                        <img src="${pokemonClicked.img}">
                        <p>#${pokemonClicked.num}</p>
                        <p>${pokemonClicked.name}</p>
                    </div>
                `
                showEvolution(pokemonClicked.next_evolution)
            }
            else if(pokemonClicked.prev_evolution && pokemonClicked.prev_evolution.length >= 1){
                showEvolution(pokemonClicked.prev_evolution)
                    evolutionPokemon.innerHTML += `
                        <div class="evolution-info"> 
                            <img src="${pokemonClicked.img}">
                            <p>#${pokemonClicked.num}</p>
                            <p>${pokemonClicked.name}</p>
                        </div>
                    `
            }
            else if(pokemonClicked.prev_evolution && pokemonClicked.prev_evolution.length >= 2){
                showEvolution(pokemonClicked.prev_evolution)
                    evolutionPokemon.innerHTML += `
                        <div class="evolution-info"> 
                            <img src="${pokemonClicked.img}">
                            <p>#${pokemonClicked.num}</p>
                            <p>${pokemonClicked.name}</p>
                        </div>
                    `
            }
            else{
                evolutionPokemon.innerHTML += `
                    <div class="evolution-info"> 
                        <img src="${pokemonClicked.img}">
                        <p>#${pokemonClicked.num}</p>
                        <p>${pokemonClicked.name}</p>
                    </div>
                `
            }
            
            //Quando clicar nas caixinhas, aparece o modal.
            modal.style.display = "block"
            //Esconder o modal quando for clicado no "x"
            span[0].onclick = function() {
                modal.style.display = "none";
            }
            //Caso o clique seja fora do modal, ele desaparece.
            window.onclick = function(event) {
                if(event.target == modal) {
                    modal.style.display = "none"
                }
            }
        })
    })
}



function clearHtml() {
    content.innerHTML = ''
}

function showEvolution(infoPokemon) {
    infoPokemon.forEach(element => {
        let pokemonData = data.pokemon.find(pokemon => pokemon.num == element.num)
        evolutionPokemon.innerHTML += `
        <div class="evolution-info"> 
            <img src="${pokemonData.img}">
            <p>#${pokemonData.num}</p>
            <p>${pokemonData.name}</p>
        </div>
        `
    })
}

function icons(element){
    switch (element) {
        case "Grass":
            return '<i class="fas fa-seedling"></i>'
            break;
        case "Fire":
            return '<i class="fas fa-fire"></i>'
            break;
        case "Water":
            return '<i class="fas fa-water"></i>'
            break;
        case "Bug":
            return '<i class="fas fa-bug"></i>'
            break;
        case "Normal":
            return '<i class="fas fa-leaf"></i>'
            break;
        case "Poison":
            return '<i class="fas fa-skull"></i>'
            break;
        case "Electric":
            return '<i class="fas fa-bolt"></i>'
            break;
        case "Ground":
            return '<i class="fas fa-spa"></i>'
            break;
        case "Fighting":
            return '<i class="fas fa-hand-rock"></i>'
            break;
        case "Psychic":
            return '<i class="fas fa-hat-wizard"></i>'
            break;
        case "Rock":
            return '<i class="fas fa-tablets"></i>'
            break;
        case "Flying":
            return '<i class="fas fa-dove"></i>'
            break;
        case "Ghost":
            return '<i class="fas fa-ghost"></i>'
            break;
        case "Ice":
            return '<i class="fas fa-snowflake"></i>'
            break;
        case "Dragon":
            return '<i class="fas fa-dragon"></i>'
            break;
        case "Steel":
            return '<i class="fas fa-cog"></i>'
            break;
        case "Dark":
            return '<i class="fas fa-adjust"></i>'
            break;
        case "Fairy":
            return '<i class="fas fa-magic"></i>'
            break;
        default: 
            return ""
            break;
    }
}


showElements(data.pokemon)

let ctx = document.getElementById('graphic').getContext('2d');
const graphic = (pokemon) => {
  new Chart(ctx, {
      // Tipo do gráfico
      type: 'doughnut',
  
      // Dados para o conjunto de dados
      data: {
          labels: ['Chance de aparecer', 'Média'],
          datasets: [{
              backgroundColor:[
                '#4B0082',
                '#FFA500', 
              ],
              borderColor: [
                  '#FFFF00',
              ],
              data: [pokemon.spawn_chance, pokemon.avg_spawns]
          }]
      },
  
      // Configuration options go here
      options: {}
  });
  
}



//evento que mostra os cards filtrados em uma função
bttnFilter.addEventListener("change", function () {
    let type = bttnFilter[bttnFilter.selectedIndex].value
    let filterTypePokemon = filterType(type, data.pokemon)
    clearHtml()
    showElements(filterTypePokemon)
})

bttnOrder.addEventListener("change", function() {
    let order = bttnOrder[bttnOrder.selectedIndex].value
    let itens = filterOrder(order, data.pokemon)
    clearHtml()
    showElements(itens)
})

//evento que mostra os cards pesquisados no input de texto
bttnSearch.addEventListener("keydown", function () {
    let searchString = bttnSearch.value.toLowerCase();
    let searchStringByString = searchPokemon(searchString, data.pokemon)
    clearHtml()
    showElements(searchStringByString)
});

bttnGame.addEventListener("click", function(){
    //Quando clicar nas caixinhas, aparece o modal.
    modalGame.style.display = "block"
    //Esconder o modal quando for clicado no "x"
    span[1].onclick = function() {
        modalGame.style.display = "none";
    }
    //Caso o clique seja fora do modal, ele desaparece.
    window.onclick = function(event) {
        if(event.target == modalGame) {
            modalGame.style.display = "none"
        }
    }
});

bttnFavorite.addEventListener("click", function(){
    modalFavorites.style.display = "block"

    span[1].onclick = function() {
        modalFavorites.style.display = "none"
    }
    window.onclick = function(event) {
        if(event.target == modalFavorites) {
            modalFavorites.style.display = "none"
        }
    }
})





