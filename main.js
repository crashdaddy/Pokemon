'use strict';

////////////////////////////////////////////////////////////////////////////////////
//////////                                                                //////////
//////////                     Pokemon: Lost                              ////////// 
//////////            Austin Coding Academy - Cohort 10 2019              //////////
//////////                                                                //////////
//////////             crashdaddy, hbrashid, dmcavoy631                   //////////
//////////                                                                //////////
////////////////////////////////////////////////////////////////////////////////////

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

  attackDamage() {
    return getRandomInt(1,10);
  }

}

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
// set player 
let pikachu = new Pokemon("Pikachu",35, "../img/PikachuFront.png", 1, 1)
let playerLoc = "1-1";
// set goal in lower right corner no matter how big the board is
let ashLoc = boardHeight.toString() + "-" + boardWidth.toString();
let ashPic = "../img/ashSprite.gif";

// set our gameOver variable so we know if we're playing or not
let gameOver = false;

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
  // and gets the data for each one 
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
    let titleStr = "Pokemon: " + enemies[pokemonID].name + " -- Hit Points: " + enemies[pokemonID].hp
    let htmlStr = `<img src="${enemies[pokemonID].imgURL}" style="width:30px;height:30px;display:none;" title="${titleStr}">`;
    document.getElementById(locID).innerHTML=htmlStr;
  }

  const placePikachu = () => {
    let pikachuDiv = document.getElementById(playerLoc);
    pikachuDiv.className = "spriteDown";
    document.getElementById("pikaPic").innerHTML = `<img src="../img/PikachuFront.png" style="width:150px;height:150px;">`;
    document.getElementById("playerStats").innerHTML = `${pikachu.name}: ${pikachu.hp} hp`;
    // place Ash as well
    document.getElementById(ashLoc).style.backgroundImage = `url("${ashPic}")`;
    document.getElementById(ashLoc).style.backgroundSize = "cover";
  }
  
  // Let's get it started in here!
  window.onload = function(){
    buildLandscape();
    getAllEnemies();
    placePikachu();
  }


  ////////////////////////////
  // 
  // Functions to move the player
  // 



  // check to see if the space the player wants to move to
  // has an enemy in it
  const isValidMove = (row, col) => {
    let ash = ashLoc.split("-");
    if (row===parseInt(ash[0]) && col ===parseInt(ash[1])){
      document.getElementById("attackerStats").innerHTML = `You found Ash! You win!`;
      gameOver = true;
      return false;
    }

    for (let i=0;i<enemies.length;i++) {
      if (enemies[i].x === row && enemies[i].y===col) {
        // there IS an enemy here!
        // announce its presence
        document.getElementById("attackerStats").innerHTML = `A wild ${enemies[i].name} attacks! It has ${enemies[i].hp} hp`;
        document.getElementById("enemyPic").innerHTML = `<img src="${enemies[i].imgURL}" style="width:150px;height:150px;">`;
        // calculate attack damage 
        let attackDamage = enemies[i].attackDamage();
        pikachu.hp-= attackDamage;
          if (pikachu.hp < 0) {
            pikachu.hp = 0;
            document.getElementById("playerStats").innerHTML = `${pikachu.name}: ${pikachu.hp} hp`;
            gameOver = true;
            document.getElementById("attackerStats").innerHTML += `Your pikachu has died. RIP in Peace.`;
            return false;
          }
        document.getElementById("playerStats").innerHTML = `${pikachu.name}: ${pikachu.hp} hp`;
        document.getElementById("attackerStats").innerHTML += `<br/>It hits you for ${attackDamage} hp!`;
        // return that this square is occupied
        return false
      }
    }
    return true;
  }

  const move = (direction) => {
    document.getElementById("attackerStats").innerHTML = `No enemies around`;
    document.getElementById("enemyPic").innerHTML = "";
    // break up the coordinate string into (row,col)
    let pikachuCoords = playerLoc.split("-");
    // get our location
    let currentRow = parseInt(pikachuCoords[0]);
    let currentCol = parseInt(pikachuCoords[1]);
    // and set variables for where we want to move to
    let newRow=currentRow;
    let newCol=currentCol;
    // the cell where Pikachu is
    let pikachuDiv = document.getElementById(playerLoc);
    let newClass;
    // we set this so after the switch we only change
    // the CSS class if he's actually moving
    let moving = false;

    switch (direction) {
      case "left":
        // set the coords for the cell the player wants to move to
        // in this case it's left, so we just subtract one column
        newCol = currentCol-1;
        // as long as it's not off the board
        if (newCol >= 1){
          // adjust the coordinate
          pikachuCoords[1]--;
          // pick which player animation to play
          newClass = "spriteLeft"
          // if there's no enemies, authorize the move
          if (isValidMove(newRow,newCol)) moving=true;
        }
      break;
      case "right":
        newCol=currentCol+1;
        if (newCol <= boardWidth){
          pikachuCoords[1]++;
          newClass = "spriteRight"
          if (isValidMove(newRow,newCol)) moving=true;
        }
      break;
      case "down":
        newRow=currentRow+1;
        if (newRow <= boardHeight){
          pikachuCoords[0]++;
          newClass = "spriteDown"
          if (isValidMove(newRow,newCol)) moving=true;
        }
      break;
      case "up":
        newRow=currentRow-1
        if (newRow >= 1){
          pikachuCoords[0]--;
          newClass = "spriteUp";
          if (isValidMove(newRow,newCol)) moving=true;
        }
      break;
    }
    // we only want to change the CSS style if the player
    // actually is moving to the new square
    if (moving) {
    // set the player's new coordinate
    playerLoc = pikachuCoords[0] + "-" + pikachuCoords[1];
    // get the class for the current cell where the player is
    let locationClass = pikachuDiv.className;
    // get rid of it so the player disappears from that cell
    pikachuDiv.classList.remove(locationClass);
    // and add the class to the new cell they're moving to
    pikachuDiv = document.getElementById(playerLoc);
    pikachuDiv.className=newClass;
    }
    
  }

  document.onkeydown = function(event) {
    if (!gameOver) {
    // get the cell for the player's current location
    let pikachuDiv = document.getElementById(playerLoc);
    switch (event.keyCode) {
      // check if the player's pressed an arrow key
       case 37:
        // change the animation to reflect the direction he's facing
        pikachuDiv.className = "spriteLeft";
        // call the function to move the player
        move("left");
          break;
       case 38:
        pikachuDiv.className = "spriteUp";
        move("up");
          break;
       case 39:
        pikachuDiv.className = "spriteRight";
        move("right");
          break;
       case 40:
        pikachuDiv.className = "spriteDown";
        move("down");
          break;
    }
  }
};

