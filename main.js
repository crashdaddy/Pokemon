'use strict';

///////////////////////////////
//
//  Declare global variables
//

// the id numbers of the enemy pokemons
let arrayOfPokemon = [32,15,99,73,45,247,700,450,699,722,55,66,77,311,405,420,69,12,203,196];
// the array where the enemies will be stored
let enemies = [];
// landscaped dimensions
let boardHeight = 20;
let boardWidth = 30;

/////////////////////////////
//
// Helper functions
//

// return a random number in a range (min, max)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/////////////////////////////
//
// Build the class we will use to define a pokemon
// this will be used for the enemies AND the player
// (can be extended to add more Player specs if needed)


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

///////////////////////////////////
//
// API functions to get the data
// for the enemies
//

// loads the data for an individual pokemon
// creates the object
// then adds it to the array of all enemies
const getPokemonById = (id) => {
    fetch('https://pokeapi.co/api/v2/pokemon/' + id)
      .then(res => res.json())
      .then(data => {
                let newPokemon = new Pokemon(data.name,data.stats[5].base_stat,data.sprites.front_default);
                
                enemies.push(newPokemon);
                placeEnemies(enemies.indexOf(newPokemon));
      })
      .catch((error) => {
        console.error('Error:', error + " id: " + id);
      });
  }

  // loops through the enemies list
  // end gets the data for each one 
  const getAllEnemies = () => {
      for (let i = 0; i< arrayOfPokemon.length;i++){
        getPokemonById(arrayOfPokemon[i]);
      }
  };

  ////////////////////////////////
  //
  //  Output functions
  //  display game elements
  //

  // build the table we'll use for our landscape
  // the ID of each cell will match the x and y properties
  // of each enemy and map as coordinates in the table
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

// defines a random position within the landscape dimensions
// for where each enemy will be placed
  const placeEnemies = (idx) => {
      enemies[idx].x = getRandomInt(1,boardHeight);
      enemies[idx].y = getRandomInt(1,boardWidth);
      updateLocations(idx);
  }

  // draws each enemy to its coordinate cell in the table
  const updateLocations = (pokemonID) => {
    let locID = enemies[pokemonID].x.toString() + "-" + enemies[pokemonID].y;
    let htmlStr = `<img src="${enemies[pokemonID].imgURL}" style="width:50px;height:50px;" title="${enemies[pokemonID].name}">`;
    document.getElementById(locID).innerHTML=htmlStr;
  }
  
  // Let's get it started in here!
  window.onload = function(){
    buildLandscape();
    getAllEnemies();

  }

