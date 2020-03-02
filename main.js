'use strict';

////////////////////////////////////////////////////////////////////////////////////
//////////                                                                //////////
//////////                        Pokemon: Lost                           ////////// 
//////////            Austin Coding Academy - Cohort 10 2019              ////////// 
//////////                                                                //////////
//////////                      FIND US ON GITHUB!                        //////////
//////////          concept, gameplay, API data mgmnt -- dmcavoy631       //////////
//////////                                                                //////////
//////////             enemy pokemon, stats mgmt -- hbrashid              //////////
//////////                                                                //////////
//////////                OOP, event mgmt -- crashdaddy                   //////////
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

// build a class for random berries
// they will increase Pikachu's health
// when he eats them

class Berry{
  constructor (hp,x,y,imgURL) {
    this.hp = hp,
    this.x = x,
    this.y = y,
    this.imgURL = imgURL
  }

  eat() {
    pikachu.hp += this.hp;
  }
}

///////////////////////////////
//
//  Declare global variables
//

// setup the array of messages we display while wandering
let msgText = ["Looks pretty good",
               "No enemies so far",
               "I think we're safe",
               "Watch for wandering Pokemon",
               "I wonder where that Ash kid is?",
               "This is crazy",
               "Sure is hungries",
               "I think we're lost",
               "I'm not lost. Ash is lost.",
               "Gettin' pretty lonely for some berries",
               "It's a nice day today",
               "This wouldn't happen if Misty was around",
               "Pika pika." ]

// the id numbers of the enemy pokemons
let arrayOfPokemon = [32,15,99,73,45,247,700,450,699,722,55,66,77,311,405,420,69,12,203,196];
// the array where the enemies will be stored
let enemies = [];
// store all the tasty berries
let numOfBerries = 20;
let berries = [];

// landscape dimensions
let boardHeight = 20;
let boardWidth = 30;
// set player 
let pikachu = new Pokemon("Pikachu",35, "img/PikachuFront.png", 1, 1)
let playerLoc = "1-1";
// set goal in random spot no matter how big the board is
let ashLoc = getRandomInt(1,boardHeight).toString() + "-" + getRandomInt(1,boardWidth.toString());
let ashPic = "img/ashSprite.gif";

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

// generate a random message to show while wandering about
const randomMsg = () => {
  return msgText[getRandomInt(0,msgText.length-1)];
}

// display messages in the message viewport div
const displayMsg = (msg) => {
  document.getElementById("msgDiv").innerHTML = msg;
}

//////////////////////////////////////
//
// Manage the scrolling background 
// in the message viewport div
//

// speed in milliseconds
var scrollSpeed = 70;

// set the default position
var current = 0;

// set the direction
var direction = 'h';

function bgScroll(){
    // 1 pixel row at a time (left)
    current -= 1;
    // move the background with backgrond-position css properties
    document.getElementById("msgDiv").style.backgroundPosition = current+"px 0";
}

//Calls the scrolling function repeatedly
  setInterval("bgScroll()", scrollSpeed);	

// Now do it again for the mountains!

var mountainSpeed = 150;
var currentMountain = 0;

var mountainDirection = 'h';

function mountainScroll() {
    currentMountain-=1;
    document.getElementById("mountains").style.backgroundPosition = currentMountain+"px 0";
}

  setInterval("mountainScroll()",mountainSpeed);


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
  }

  const placePikachu = () => {
    let pikachuDiv = document.getElementById(playerLoc);
    pikachuDiv.className = "spriteDown";
    document.getElementById("pikaPic").innerHTML = `<img src="${pikachu.imgURL}" style="width:150px;height:150px;">`;
    document.getElementById("playerStats").innerHTML = `${pikachu.name}: ${pikachu.hp} hp`;
  }

  const placeBerries = (numOfBerries) => {
    for (let i = 0;i <numOfBerries;i++) {
      let berryX = getRandomInt(1,boardHeight);
      let berryY = getRandomInt(1,boardWidth);
      let newBerry = new Berry(getRandomInt(1,50),berryX,berryY,"img/berries.png")
      berries.push(newBerry);
    }
  }
  
  // Let's get it started in here!
  window.onload = function(){
    buildLandscape();
    placeBerries(numOfBerries);
    getAllEnemies();
    placePikachu();
  }


  ////////////////////////////
  // 
  // Functions to move the player
  // 

  const checkPlayerDead = () => {
        if (pikachu.hp < 0) {
          pikachu.hp = 0;
          document.getElementById("playerStats").innerHTML = `${pikachu.name}: ${pikachu.hp} hp`;
          gameOver = true;
          return;
        }
  }

  const fight = (enemy) => {
        let msgText = `A wild ${enemy.name} attacks! `;
        document.getElementById("attackerStats").innerHTML = `${enemy.name}: ${enemy.hp} hp`;
        document.getElementById("enemyPic").innerHTML = `<img src="${enemy.imgURL}" style="width:150px;height:150px;">`;
        // calculate attack damage 
        let attackDamage = enemy.attackDamage();
        pikachu.hp-= attackDamage;
       
        // show effects of battle
        document.getElementById("playerStats").innerHTML = `${pikachu.name}: ${pikachu.hp} hp`;
        msgText += `<br/>It hits you for ${attackDamage} hp!`;
        displayMsg(msgText);
        checkPlayerDead();
  }
  

  // check for enemies
  const noEnemies = (row,col) => {
    for (let i=0;i<enemies.length;i++) {
      if (enemies[i].x === row && enemies[i].y===col) {
        // there IS an enemy here!
        // announce its presence
          fight(enemies[i]);
        return false;
      } 
    }
    return true;
  }

  const foundAsh = (row,col) => {
    let ash = ashLoc.split("-");
    if (row===parseInt(ash[0]) && col ===parseInt(ash[1])){
      displayMsg(`You found Ash! You win!`);
      document.getElementById("enemyPic").innerHTML = `<img src="img/ashSprite.gif" style="width:150px;height:150px;">`;
      gameOver = true;
      return true;
    }
  }

  // checking the place we want to move to for berries
  const checkBerries= (row,col) => {
    for (let i=0;i<berries.length;i++) {
      if (berries[i].x===row & berries[i].y===col) {
        // there IS some
        displayMsg("You found some berries! om nom nom");
        // show a pic
        document.getElementById("enemyPic").innerHTML = `<img src="${berries[i].imgURL}" style="width:150px;height:150px;">`;
        // eat dat berry!
        berries[i].eat();
        document.getElementById("playerStats").innerHTML = `${pikachu.name}: ${pikachu.hp} hp`;
       
        // remove it, cuz you ate it
        let removedBerry = berries.splice(i,i+1);
      }
    }
  }

  // check to see if the space the player wants to move to
  // has an enemy in it
  const isValidMove = (row, col) => {
    // check the new space for yummy berries
    checkBerries(row,col);
    // see if the space the player's trying to move to is where Ash is
    if (foundAsh(row,col)) {return false;}
    // check if there's an enemy there
    if (noEnemies(row,col)) return true;
  }

  const move = (direction) => {
    // break up the coordinate string into (row,col)
    let pikachuCoords = playerLoc.split("-");
    // get our location
    let currentRow = parseInt(pikachu.x);
    let currentCol = parseInt(pikachu.y);
    
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
    pikachu.x = pikachuCoords[0];
    pikachu.y = pikachuCoords[1];
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
    
    if (pikachu.hp<=0) {displayMsg("Your pikachu is dead. RIP in Peace");}
    if (!gameOver) {  
     displayMsg(randomMsg());  
    document.getElementById("attackerStats").innerHTML ="&nbsp;";
    document.getElementById("enemyPic").innerHTML = "&nbsp;";
    // get the cell for the player's current location
    let loc = pikachu.x + "-" + pikachu.y;
    let pikachuDiv = document.getElementById(loc);
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



