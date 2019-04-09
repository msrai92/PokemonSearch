import React, { Component } from "react";
import { Spring } from 'react-spring';
import AppStyles from "./App.css";
import PokeModal from "./modal.jsx";

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false};
    this.handleClick = this.handleClick.bind(this);
    this.getColor = this.getColor.bind(this);
  }
  state = {
    modalVisible: false,
    name: undefined,
    url: undefined,
    color: "FireBrick"
  };

  
  handleClick() {
    console.log("clicked");
    console.log(this.state.modalVisible);
    this.setState((prevState, props) => ({
      modalVisible: true
    }));
    console.log(this.state.modalVisible);
  
   // console.log("pokemon pic clicked");
   // console.log(this.state.modalVisible);
  }
  
  componentWillReceiveProps(){
    this.setState({
        modalVisible: this.props.visible,
        types: this.props.types
    });
    console.log(this.state.types);
    console.log(this.props.types);
    //console.log(this.props.name);
   //console.log(this.props.url);
  }


  componentDidUpdate(){
    console.log("component did update");
    console.log(this.props.types);
  }

  setColors(){
    console.log("attemptinng to set color");
  }

  getColor(){
    //const bgColor = { background: this.state.color};
    return bgColor = { background: "FireBrick"};
  }
  render() {
    return (
      <Spring from={{ opacity: 0 }} to={{ opacity:1 }}>
      {props => (
      <div className={AppStyles.Pokemon} style={props} style={{backgroundColor:this.props.color}}>
        <div className={AppStyles.square}>
          {this.props.pokeImg && (
            <img
              onClick={this.handleClick}
              src={this.props.pokeImg}
              className={AppStyles.image}
            />
          )}
        </div>
      
        <h3 style={{fontFamily: "Impact"}}>{this.props.pokeName}</h3>
        {this.props.pokeName && (this.state.modalVisible===true) && (
          <PokeModal modalVisible={this.state.modalVisible} name={this.props.pokeName} url={this.props.pokeUrl}/>
        )}
        
      </div>


      )}
       
      </Spring>
    );
  }
}

export default Pokemon;
