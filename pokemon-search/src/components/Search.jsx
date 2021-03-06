import React from 'react';
import AppStyles from "./App.css";

function Search(props){
  return (
    <div className={AppStyles.Search} style={{backgroundColor: props.Color}} >
      <form onSubmit={props.getPokemon} className={AppStyles.InputField} >
        <input
          type="text"
          name="pokemonName"
          placeholder="Enter Pokemon Name or ID"
        />
        <button>search</button>
      </form>
    </div>
  );
};

export default Search;
