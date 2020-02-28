'use strict';

let arrayOfPokemon = [32,15,99,73,45,247,700,450,699,821];
let pokemon = [];
let boardHeight = 20;
let boardWidth = 30;


class Pokemon{
   constructor (name,hp, imgURL,x, y) {
     this.name = name,
     this.hp = hp,
     this.imgURL = imgURL
     this. x = x,
     this.y = y,
     this.dead = false,
     this.visible = false
   }

}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getPokemonById = (id) => {
    fetch('https://pokeapi.co/api/v2/pokemon/' + id)
      .then(res => res.json())
      .then(data => {
                let newPokemon = new Pokemon(data.name,data.stats[5].base_stat,data.sprites.front_default);
                
                pokemon.push(newPokemon);
                    
    placePokemon();
      });
  }

  const getAllPokemon = () => {
      for (let i = 0; i< arrayOfPokemon.length;i++){
        getPokemonById(arrayOfPokemon[i]);
      }
  };

  const buildLandscape = () => {
    let htmlStr = `<table style="width:100%;border:1px solid black;">`;
    for (let rows = 1;rows<boardHeight+1;rows++){
      htmlStr += `<tr>`;
      for (let cols = 1;cols<boardWidth+1;cols++) {
        htmlStr += `<td id="${rows}-${cols}">&nbsp;</td>`;
      }
      htmlStr += `</tr>`;
    }
    htmlStr += `</table>`;
    document.getElementById('landscape').innerHTML = htmlStr;
  }

  const placePokemon = () => {
    for (let i = 0; i< pokemon.length;i++){
      pokemon[i].x = getRandomInt(1,boardWidth);
      pokemon[i].y = getRandomInt(1,boardHeight);
      updateLocations(i);
    }
  }

  const updateLocations = (pokemonID) => {
    let locID = pokemon[pokemonID].x.toString() + "-" + pokemon[pokemonID].y;
    let htmlStr = `<img src="${pokemon[pokemonID].imgURL}" style="width:50px;height:50px;">`;
    document.getElementById(locID).innerHTML=htmlStr;
    console.log(locID);
  }
  
  window.onload = function(){
    buildLandscape();
    getAllPokemon();

  }

