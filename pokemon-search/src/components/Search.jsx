import React, { Component } from "react";
import AppStyles from "./App.css";

class Search extends Component {
  state = {};
  render() {
    return (
      <div className={AppStyles.Search}>
        <form onSubmit={this.props.getPokemon} className={AppStyles.InputField} >
          <input
            type="text"
            name="pokemonName"
            placeholder="enter name or id"
          />
          <button>search</button>
        </form>
      </div>
    );
  }
}

export default Search;
