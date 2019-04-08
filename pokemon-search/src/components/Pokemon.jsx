import React, { Component } from "react";
import { Spring } from 'react-spring';
import AppStyles from "./App.css";
import PokeModal from "./modal.jsx";

class Pokemon extends Component {
  state = {
    modalVisible: false,
    name: undefined,
    url: undefined
  };

  handleClick() {
    console.log("clicked")
    this.setState({
      modalVisible: true
    });
  }
  
  handleState() {
    console.log("clicked");
    this.setState({
      modalVisible: true
    });

    console.log(this.state.modalVisible);
  }

  
  
  render() {
    return (
      <Spring from={{ opacity: 0 }} to={{ opacity:1 }}>
      {props => (
      <div className={AppStyles.Pokemon} style={props}>
        <div className={AppStyles.square}>
          {this.props.pokeImg && (
            <img
              onClick={ () => this.handleState() }
              src={this.props.pokeImg}
              className={AppStyles.image}
            />
          )}
        </div>
        <div className={AppStyles.PokeInfo}>
        <p>{this.props.pokeName}</p>
        {this.props.pokeName && (
          <PokeModal modalVisible={this.state.modalVisible} name={this.props.pokeName} url={this.props.pokeUrl}/>

        )}
        
        </div>
        
      </div>


      )}
       
      </Spring>
    );
  }
}

export default Pokemon;
