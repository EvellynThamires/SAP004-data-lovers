import { filterType, filterOrder, searchPokemon } from './data.js';
import data from './data/pokemon/pokemon.js';

//Pegando a id "Root" do HTML
const content = document.querySelector("#root"); 
//Pegando id dos botões
const bttnFilter = document.querySelector("#filter-by-type");
const bttnOrder = document.querySelector("#order-button");
//area de pesquisar pokemon
const bttnSearch = document.querySelector("#search");

const modal = document.querySelector("#modals");
const span = document.getElementsByClassName("close")[0];

const namePokemon = document.querySelector(".modal-name h1");
const heightPokemon = document.querySelector("#height");
const weigthPokemon = document.querySelector("#weight");
const candyPokemon = document.querySelector("#candy");
const candyQuantityPokemon = document.querySelector("#candy-quantity");
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
                        <p data-num="${element.num}">#${element.num} ${element.name}</p>
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

            namePokemon.innerHTML = `#${pokemonClicked.num} ${pokemonClicked.name}`
            heightPokemon.innerHTML = `${pokemonClicked.height}`
            weigthPokemon.innerHTML = `${pokemonClicked.weight}`
            candyPokemon.innerHTML = `${pokemonClicked.candy}`
            
            if(pokemonClicked.candy_count == undefined){
                candyQuantityPokemon.innerHTML = "N/A"
            }
            else{
                candyQuantityPokemon.innerHTML = `${pokemonClicked.candy_count}`
            }
            
            typePokemon.innerHTML = ""
            pokemonClicked.type.forEach(element => {
                typePokemon.innerHTML += `<div class="chip ${element}">${element}</div>`
            })

            weaknessPokemon.innerHTML = ""
            pokemonClicked.weaknesses.forEach(element => {
                weaknessPokemon.innerHTML += `<div class="chip ${element}">${element}</div>`
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
            span.onclick = function() {
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

showElements(data.pokemon)


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
//evento que mostra os cards filtrados em uma função
bttnFilter.addEventListener("change", function () {
    let filterTypePokemon = filterType(bttnFilter, data.pokemon)
    clearHtml()
    showElements(filterTypePokemon)
})

bttnOrder.addEventListener("change", function() {
    let order = filterOrder(bttnOrder, data.pokemon)
    clearHtml()
    showElements(order)
})

//evento que mostra os cards em ordem alfabetica
bttnOrder.addEventListener("change", function () {
    let orderAlpha = orderAz(bttnOrder, data.pokemon)
    clearHtml()
    showElements(orderAlpha)
});

//evento que mostra os cards pesquisados no input de texto
bttnSearch.addEventListener("keydown", function () {
    let searchStringByString = searchPokemon(bttnSearch, data.pokemon)
    clearHtml()
    showElements(searchStringByString)
});
