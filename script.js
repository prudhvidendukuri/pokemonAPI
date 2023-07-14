let allPokemondata = [];
let singlePokemonData = [];
let offset = 0;
let limit = 50;

//load 10 pokemon details
async function loadPokemonData(start,finish){
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${start}&limit=${finish}`);
        const data = await response.json();
        loadPokemonCards(data.results);
    } catch (error) {
        console.log(error);
    }
}
//push data to variables
async function loadPokemonCards(results){
    results.forEach(async element => {
        try {
            loadSinglePokemon(element.url,element.name);
        } catch (error) {
            console.log(error);
        } 
    });
    
}
//each pokemon images
async function loadSinglePokemon(pokUrl,pokName){
    try {
        const res = await fetch(pokUrl);
        const pokemon = await res.json();
        let imageSrc = pokemon.sprites.other.home.front_default;
        let value = pokemon.base_experience;
        pokemons(imageSrc,value,pokName); 
    } catch (error) {
        console.log(error);
    }
}

//load the cards in the browser
function pokemons(element,val,name){
    let divcard = document.createElement('div');
    let divcardName = document.createElement('div');
    divcardName.setAttribute('class',"name");
    divcardName.appendChild(document.createTextNode(name));
    let imgElement = document.createElement("img");
    imgElement.setAttribute("src",element);
    let divcardvalue = document.createElement('div');
    divcard.setAttribute('class',"pokemonCard")
    divcardvalue.appendChild(document.createTextNode(val));
    divcard.appendChild(divcardName);
    divcard.appendChild(imgElement);
    divcard.appendChild(divcardvalue);
    let cards = document.getElementById("cards");
    cards.appendChild(divcard);   
}

let load = document.getElementById('load');
load.addEventListener('click',()=>{
    limit = limit + 50;
    offset = offset + 50;
    loadPokemonData(offset,limit);
})

// loadPokemonData(offset,limit);

