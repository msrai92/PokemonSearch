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
    isEvolved: false
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
      console.log("found pokemon");
      console.log(pokeData);
      const p = pokeData.sprites.front_default;
      this.setState({
        img: p
      });
      if (pokeData !== undefined) {
        this.getSpecies(pokeData.species.name);
      }
    } catch (err) {
      console.log("error occurred");
    }
  };

  getSpecies = async id => {
    const pokeCall = await fetch(`http://pokeapi.co/api/v2/pokemon-species/${id}`);
    const pokeData = await pokeCall.json();
    console.log("species data");
    console.log(pokeData);
    const name = id;
    this.setState({
      currSpecies: name
    });
    if(pokeData.evolves_from_species===null){
      console.log("this is base species");
      
    }
    const evolutionURL = pokeData.evolution_chain.url;
    //console.log(pokeData.evolution_chain.url);
    if (pokeData !== undefined) {
      this.getEvolutions(evolutionURL);
    }
  };

  getEvolutions = async id => {
    const pokeCall = await fetch(
      `${id}`
    );

   
    const pokeData = await pokeCall.json();
    console.log("evolution data");
    console.log(pokeData);
    let allEVO = [];
    allEVO.push(pokeData.chain.species);
    let chain = pokeData.chain.evolves_to;
    if(chain.length!==1){
      console.log("for loop");
      for(let i=0; i<chain.length; i++){
        allEVO.push(chain[i].species);
      }
    }else{
      allEVO.push(chain[0].species);
    }
    

    while(chain[0].evolves_to.length!==0){
      chain = chain[0].evolves_to;
      
      allEVO.push(chain[0].species);
    }
    console.log(allEVO);
    this.setState({
      evolutions: allEVO,
      isEvolved: true
    });
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
    //this.pokemonEVOS();
  };

  pokemonEVOS(){
    const data = this.state.evolutions;
    console.log(data);
   
    const pokemon = [];
    for(let i=0; i<data.length; i++){
      console.log(data[i].name);
      pokemon.push(<Pokemon pokeName={data[i].name} pokeSpeciesURL={data[i].url} />)
    }
    return pokemon;
  }
  componentDidMount() {
    //this.getPokemon();
    //this.getSpecies();
    //this.getEvolutions();
  }
  //<Pokemon pokeImg={this.state.img} />
  render() {
    return (
      <div className={AppStyles.Main}>
        <Search getPokemon={this.getPokemon} />
        <Pokemon pokeImg={this.state.img} />
        {this.isEvolved &&(this.pokemonEVOS())}
        <Pokemon pokeImg={this.state.img}/>
      </div>
    );
  }
}

export default App;
