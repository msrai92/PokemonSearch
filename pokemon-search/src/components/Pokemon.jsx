import React, { Component } from "react";
import AppStyles from './App.css';
class Pokemon extends Component {
  state = {};
  render() {
    return( 
    <div className={AppStyles.Pokemon}>
    {this.props.pokeImg && ( 
    <img src={this.props.pokeImg} />
    )}
    </div>
    );
  }
}

export default Pokemon;
