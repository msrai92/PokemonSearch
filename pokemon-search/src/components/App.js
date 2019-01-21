import React, { Component } from "react";
import Search from "./Search.jsx";
import Pokemon from "./Pokemon.jsx";
import AppStyles from "./App.css";
import "@babel/polyfill";
import "babel-plugin-transform-runtime";

class App extends Component {
  state = {
    img: undefined,
    pokemonInfo: undefined
  };
  getPokemon = async e => {
    e.preventDefault();
    const targetPoke = e.target.elements.pokemonName.value;
    console.log(targetPoke);
    try {
      const pokeCall = await fetch(
        `http://pokeapi.co/api/v2/pokemon/${targetPoke}/`
      );
      const pokeData = await pokeCall.json();
      console.log(pokeData);
      const p = pokeData.sprites.front_default;
      this.setState({
        img: p
      });
      if (pokeData !== undefined) {
        this.getSpecies(targetPoke);
      }
    } catch (err) {
      console.log("error occurred");
    }
  };

  getSpecies = async id => {
    const pokeCall = await fetch(`http://pokeapi.co/api/v2/pokemon-species/${id}`);
    const pokeData = await pokeCall.json();
    console.log(pokeData);
    const evolutionURL = pokeData.evolution_chain.url;
    console.log(pokeData.evolution_chain.url);
    if (pokeData !== undefined) {
      this.getEvolutions(evolutionURL);
    }
  };

  getEvolutions = async id => {
    const pokeCall = await fetch(
      `${id}`
    );
    const pokeData = await pokeCall.json();
    console.log(pokeData);
  };

  componentDidMount() {
    //this.getPokemon();
    //this.getSpecies();
    //this.getEvolutions();
  }

  render() {
    return (
      <div className={AppStyles.Main}>
        <Search getPokemon={this.getPokemon} />
        <Pokemon pokeImg={this.state.img} />
      </div>
    );
  }
}

export default App;
