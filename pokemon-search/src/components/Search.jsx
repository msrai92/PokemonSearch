import React from 'react';
import AppStyles from "./App.css";

function Search(props){
  return (
    <div className={AppStyles.Search}>
      <form onSubmit={props.getPokemon} className={AppStyles.InputField} >
        <input
          type="text"
          name="pokemonName"
          placeholder="enter name or id"
        />
        <button>search</button>
      </form>
    </div>
  );
};

export default Search;
