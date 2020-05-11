import { filterType, orderAz, searchPokemon } from './data.js';
import data from './data/pokemon/pokemon.js';

//Pegando a id "Root" do HTML
const content = document.querySelector("#root");
//Pegando id dos botões
const bttnFilter = document.querySelector("#filter-by-type");
const bttnOrder = document.querySelector("#order-button");
//area de pesquisar pokemon
const bttnSearch = document.querySelector("#search");


function showElements(data) {
    data.forEach(element => {

        let createDiv =
            `
            <div class="box-pokemon ${element.type[0]}-light"> 
                <div class="info-pokemon">
                    <p>#${element.num} ${element.name}</p>
                </div>
                <div class="box-image ${element.type[0]}">
                    <img src="${element.img}">  
                </div>
            </div>
        `

        //Adicionando as divs dentro da div "Root".
        content.innerHTML += createDiv
    });
}

function clearHtml() {
    content.innerHTML = ''
}

showElements(data.pokemon)

//evento que mostra os cards filtrados em uma função
bttnFilter.addEventListener("change", function () {
    let filterTypePokemon = filterType(bttnFilter, data.pokemon)
    clearHtml()
    showElements(filterTypePokemon)
});

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
