import React, { Component } from "react";
import { Spring } from 'react-spring';
import Search from "./Search.jsx";
import Pokemon from "./Pokemon.jsx";
import { Button, Modal} from 'reactstrap';
import { Alert } from 'reactstrap';
import AppStyles from "./App.css";
import "@babel/polyfill";
import "babel-plugin-transform-runtime";

class App extends Component { 
  
  componentWillMount(){
    const visited = localStorage["visited"];
    if(visited){
      this.setState({
        popup: false
      })
    } else {
      localStorage["visited"] = true;
      this.setState({
        popup: true
      })
    }
  }
  state = {
    popup: true,
    img: undefined,
    target: undefined,
    pokemonInfo: undefined,
    currSpecies: undefined,
    evolutions: undefined,
    isEvolved: false,
    baseSpecies: undefined,
    evoFound: undefined,
    errMsg: undefined,
    evoInfo: undefined,
    colorDictionary: undefined,
    defaultColor: "FireBrick",
    unknownPokemon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    defaultImage: true,
    AlertMsg: true
  };
  getPokemon = async e => {
    e.preventDefault();
    const targetPoke = e.target.elements.pokemonName.value.toLowerCase();
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
        evoFound: undefined,
        target: targetPoke,
        defaultImage: false,
        AlertMsg: false
      });
      if (pokeData !== undefined) {
        this.getSpecies(pokeData.species.name);
      }
    } catch (err) {
      console.log("error occurred");
      this.setState({
        evoFound: undefined,
        errMsg: "No Pokemon Found",
        target: targetPoke
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
    let pokemon = [];
    const dict = {
      ground: "BurlyWood ",
      flying: "AliceBlue",
      normal: "Tan",
      fighting: "Red",
      poison: "Purple",
      rock: "Sienna",
      bug: "YellowGreen",
      ghost: "RebeccaPurple",
      steel: "Silver",
      fire: "OrangeRed",
      water: "DodgerBlue",
      grass: "ForestGreen",
      electric: "Yellow",
      psychic: "HotPink",
      ice: "LightSkyBlue",
      dragon: "MediumSlateBlue",
      dark: "#333333",
      fairy: "Plum"
    };
    
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].name);
      const targetPoke = data[i].name;
      
      const pokeCall = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${targetPoke}/`
      );
      const pokeData = await pokeCall.json();
      const pokeType = []
      for(let k=0; k<pokeData.types.length; k++){
        pokeType.push(pokeData.types[k].type.name)
      }
      console.log(pokeType);
      const pokeColor = dict[pokeType[0]];
      console.log(pokeColor);
      console.log("found pokemon");
      console.log(pokeData);
      const p = pokeData.sprites.front_default;
      //const fixedName = data[i].name.charAt(0).toUpperCase() + data[i].name.slice(1);
      //console.log(fixedName);
      console.log(p);

      const entry = {
        name: data[i].name,
        url: data[i].url,
        sprite: p,
        color: pokeColor,
        types: pokeType
      }
      pokemon.push(entry);
    }
    console.log("target poke");
    console.log(this.state.target);
    let targetColor = "FireBrick";
    let targetPoke;
    for(let i=0; i<pokemon.length; i++){
      if(pokemon[i].name == this.state.target){
        console.log("target found");
        targetColor = pokemon[i].color;
        targetPoke = pokemon[i];
      }
    }
    if(pokemon.indexOf(targetPoke)>0){
      //pokemon = pokemon.filter(item => item.name !== targetPoke);
      pokemon.splice(pokemon.indexOf(targetPoke),1);
      pokemon.unshift(targetPoke);
    }
    
    console.log(pokemon);
    this.setState({
      evoInfo: pokemon,
      defaultColor: targetColor
  
    });
    
  }

  renderPokemon(){
    const pokemon = [];
    let evolutions;
    console.log(this.state.evoInfo);
    if(this.state.evoInfo!==undefined){
      evolutions = this.state.evoInfo;
      console.log("evolutions for render");
      console.log(evolutions);
      for(var i=0; i<evolutions.length; i++){
        const poke = <Pokemon visible={false} type={evolutions[i].types} pokeName={evolutions[i].name} pokeUrl={evolutions[i].url} pokeImg={evolutions[i].sprite} color={evolutions[i].color}/>;
        pokemon.push(poke);
      }
      return pokemon;
    }else{
      const errMsg = <h3 className={AppStyles.pokeError}>{this.state.errMsg}</h3>
      return errMsg;
    }
  }

  onExit = (state) => {
    console.log("dismiss alert");
    this.setState({
      AlertMsg: false
    });
  }

  /*
  <div className={AppStyles.AlertMsg}>
            <Alert 
            isOpen={this.state.AlertMsg} 
            toggle={this.onExit} 
            > Enter Pokemon name to search and double click image to display information
            </Alert>
            </div>
  */
  
  componentDidMount() {
    //this.getPokemon();
    //this.getSpecies();
    //this.getEvolutions();
  }
  //<Pokemon pokeImg={this.state.img} />
  //<Pokemon pokeImg={this.state.img} evolutions={this.state.evolutions} />
  render() {
    return (
      <Spring from={{ opacity: 0 }} to={{ opacity:1 }}>
        {props => (
          <div className={AppStyles.Main} style={props} style={{backgroundColor: this.state.defaultColor}}>
            
            <Search getPokemon={this.getPokemon} Color={this.state.defaultColor} />
            
            {this.state.defaultImage && (
              <div className={AppStyles.unknownSquare}>
                <img
                  src={this.state.unknownPokemon}
                  className={AppStyles.unknownImage}
                />
              </div>
            )}
            
            {this.renderPokemon()}
            
          </div>
        )}  
      </Spring>
     
    );
  }
}

export default App;

/*
if (this.state.evoInfo!==undefined) {
      const pokemon = this.state.evoInfo.map(evolution =>{
        <Pokemon pokeName={evolution.name} pokeUrl={evolution.url} pokeImg={evolution.sprite} />
       
      })
    }else{
      const errMsg = "Your Pokemon could not be found or an error has occurred";
    }

    {this.state.evoInfo!==undefined ? (
          <div>
            {this.state.evoInfo.map(evolution => {
              return (
                <Pokemon pokeName={evolution.name} pokeUrl={evolution.url} pokeImg={evolution.sprite} />
              )
            })}
            </div>
        ): <p>{this.state.errMsg}</p>}

        {this.state.evoInfo!==undefined ? (
          <div>
          {this.state.evoInfo(evolution => <Pokemon pokeName={evolution.name} pokeUrl={evolution.url} pokeImg={evolution.sprite}/>)}
          </div>
        ): <p>{this.state.errMsg}</p>}

*/