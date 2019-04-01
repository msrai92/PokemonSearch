import React, { Component } from "react";
import Search from "./Search.jsx";
import Pokemon from "./Pokemon.jsx";
import AppStyles from "./App.css";
import "@babel/polyfill";
import "babel-plugin-transform-runtime";

class App extends Component {
  state = {
    img: undefined,
    pokemonInfo: undefined,
    currSpecies: undefined,
    evolutions: undefined,
    isEvolved: false,
    baseSpecies: undefined,
    evoFound: undefined,
    errMsg: undefined,
    evoInfo: undefined
  };
  getPokemon = async e => {
    e.preventDefault();
    const targetPoke = e.target.elements.pokemonName.value;
    console.log(targetPoke);
    try {
      const pokeCall = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${targetPoke}/`
      );
      const pokeData = await pokeCall.json();
      console.log("found pokemon");
      console.log(pokeData);
      const p = pokeData.sprites.front_default;
      this.setState({
        img: p,
        evoFound: undefined
      });
      if (pokeData !== undefined) {
        this.getSpecies(pokeData.species.name);
      }
    } catch (err) {
      console.log("error occurred");
      this.setState({
        evoFound: undefined,
        errMsg: "No Pokemon Found"
      })
    }
  };

  getSpecies = async id => {
    const pokeCall = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    const pokeData = await pokeCall.json();
    console.log("species data");
    console.log(pokeData);
    const name = id;
    this.setState({
      currSpecies: name
    });
    if (pokeData.evolves_from_species === null) {
      console.log("this is base species");
      this.setState({
        baseSpecies: true
      });
      const evolutionURL = pokeData.evolution_chain.url;
      //console.log(pokeData.evolution_chain.url);
      if (pokeData !== undefined) {
        this.getEvolutions(evolutionURL);
      }
    } else {
      this.setState({
        baseSpecies: false
      });
      const evolutionURL = pokeData.evolution_chain.url;
      //console.log(pokeData.evolution_chain.url);
      if (pokeData !== undefined) {
        this.getEvolutions(evolutionURL);
      }
    }
  };

  getEvolutions = async id => {
    const pokeCall = await fetch(`${id}`);

    const pokeData = await pokeCall.json();
    console.log("evolution data");
    console.log(pokeData);
    let allEVO = [];
    allEVO.push(pokeData.chain.species);
    //console.log(allEVO);
    let chain = pokeData.chain.evolves_to;

    //if pokemon can have multiple different evos
    //loop thru the chains
    if (chain.length !== 0) {
      if (chain.length !== 1) {
        console.log("for loop");
        for (let i = 0; i < chain.length; i++) {
          allEVO.push(chain[i].species);
        }
      } else {
        allEVO.push(chain[0].species);
      }

      //if pokemon doesn't have multiple evolutions from base
      while (chain[0].evolves_to.length !== 0) {
        console.log("while loop");
        chain = chain[0].evolves_to;

        allEVO.push(chain[0].species);
      }
      console.log("found evolutions");
      console.log(allEVO);
      this.setState({
        evolutions: allEVO,
        isEvolved: true,
        evoFound: true
      });
      this.pokemonEVOS();

    } else {
      console.log("no evolutions");
      this.setState({
        evolutions: allEVO,
        evoFound: true
      });
      this.pokemonEVOS();
      console.log(allEVO);
    }

    /*const baseEvo = pokeData.species
    const chain = pokeData.chain.evolves_to;
    while(chain.evolves_to.length!==0){
      console.log("getting next evo");
      chain = chain.evolves_to[0].evolves_to;

    } */

    //console.log(pokeData.chain.species);
    //console.log(pokeData.chain.evolves_to[0].species);
    //if(pokeData.chain.evolves_to[0].evolves_to.length===0){
    //  console.log("no evo");
    //}
    
  };

  /*
  pokemon.push(
        <Pokemon pokeName={data[i].name} pokeSpeciesURL={data[i].url} />
      );
  */
  pokemonEVOS = async () =>  {
    const data = this.state.evolutions;
    console.log("iterating pokemon component");
    console.log(data);
    const pokemon = [];
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].name);
      const targetPoke = data[i].name;
      const pokeCall = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${targetPoke}/`
      );
      const pokeData = await pokeCall.json();
      console.log("found pokemon");
      console.log(pokeData);
      const p = pokeData.sprites.front_default;
      const entry = {
        name: data[i].name,
        url: data[i].url,
        sprite: p
      }
      pokemon.push(entry);
    }
    console.log(pokemon);
    this.setState({
      evoInfo: pokemon
    });
    
  }
  componentDidMount() {
    //this.getPokemon();
    //this.getSpecies();
    //this.getEvolutions();
  }
  //<Pokemon pokeImg={this.state.img} />
  //<Pokemon pokeImg={this.state.img} evolutions={this.state.evolutions} />
  render() {
    
    if (this.state.evoInfo!==undefined) {
      const pokemon = this.state.evoInfo.map(evolution =>{
        <Pokemon pokeName={evolution.name} pokeUrl={evolution.url} pokeImg={evolution.sprite} />
      })
    }else{
      
    }
    return (
      <div className={AppStyles.Main}>
        <Search getPokemon={this.getPokemon} />
        
      </div>
    );
  }
}

export default App;

/*
{this.state.evoInfo!==undefined ? (
          <div>
            {this.state.evoInfo.map(evolution => {
              return (
                <Pokemon pokeName={evolution.name} pokeUrl={evolution.url} pokeImg={evolution.sprite} />
              )
            })}
            </div>
        ): <p>{this.state.errMsg}</p>}
*/