import { filterType } from './data.js';
import data from './data/pokemon/pokemon.js';

//Pegando a id "Root" do HTML
const content = document.querySelector("#root") 
const bttnFilter = document.querySelector("#filter-by-type")

function showElements(data){
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

function clearHtml(){
    content.innerHTML = ''
}

showElements(data.pokemon)

bttnFilter.addEventListener("change", function() {
    let filterTypePokemon = filterType(bttnFilter, data.pokemon)
    clearHtml()
    showElements(filterTypePokemon)
})





