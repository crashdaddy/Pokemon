'use strict';
let arrayOfPokemon = [];


const getAllPokemon = () => {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=1000')
      .then(res => res.json())
      .then(data => {
                
      });
  }

  getAllPokemon();
  

