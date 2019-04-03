import React, { Component } from "react";
import AppStyles from "./App.css";

class Pokemon extends Component {
  state = {
    img: undefined,
    pokemonName: "Pikachu"
  };

  handleClick() {
    
    console.log("clicked");
  }
  
  render() {
    return (
      <div className={AppStyles.Pokemon}>
        <div className={AppStyles.square}>
          {this.props.pokeImg && (
            <img
              onClick={this.handleClick}
              src={this.props.pokeImg}
              className={AppStyles.image}
            />
          )}
          <p>Pokemon</p>
        </div>
        
      </div>
    );
  }
}

export default Pokemon;
