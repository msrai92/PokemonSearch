import React, { Component } from 'react';
import { Button, Modal} from 'reactstrap';
import AppStyles from "./App.css";
import onClickOutside from 'react-onclickoutside';

class PokeModal extends Component {
    constructor(props) {
        super(props);
        this.state = { modal: false};
        this.toggle = this.toggle.bind(this);

      }

      state = {
        modal: false,
        abilities: undefined,
        height: undefined,
        weight: undefined,
        type: undefined,
        stats: undefined
      }

    
      toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }

  

      getPokemon = async (name, url) => {
        try {
          const pokeCall = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${name}/`
          );
          const pokeData = await pokeCall.json();
          console.log("found pokemon");
          console.log(pokeData);
          const pokeAbilities = [];
          for ( let i=0; i < pokeData.abilities.length; i++) {
            pokeAbilities.push(pokeData.abilities[i].ability.name);
          }
          console.log(pokeAbilities);
          const pokeHeight = pokeData.height;
          console.log(pokeHeight);
          const pokeWeight = pokeData.weight;
          console.log(pokeWeight);
          const pokeType = [];
          for(let k=0; k<pokeData.types.length; k++){
            pokeType.push(pokeData.types[k].type.name)
          }
          console.log(pokeType);
          const pokeStats = [];
         
          for (let j=0; j<pokeData.stats.length; j++) {
           
            const stat = {
              name: pokeData.stats[j].stat.name,
              base_stat: pokeData.stats[j].base_stat
            }
            pokeStats.push(stat)
          }
          console.log(pokeStats);

          this.setState({
            abilities: pokeAbilities,
            height: pokeHeight,
            weight: pokeWeight,
            type: pokeType,
            stats: pokeStats
          });
        } catch (err) {
          console.log("error occurred");
          this.setState({
            evoFound: undefined,
            errMsg: "No Pokemon Found"
          })
        }
      };

      componentWillReceiveProps(){
        console.log("pokemon pic clicked");
        console.log(this.props.modalVisible);
        console.log(this.props.name);
        console.log(this.props.url);
        this.setState({
            modal: this.props.modalVisible
        });

        this.getPokemon(this.props.name, this.props.url);
        
        //console.log(this.props.name);
       //console.log(this.props.url);
      }
      renderPokemon(){
        const pokemon = [];
        let evolutions;
        if(this.state.evoInfo!==undefined){
          evolutions = this.state.evoInfo;
          console.log("evolutions for render");
          console.log(evolutions);
          for(var i=0; i<evolutions.length; i++){
            const poke = <Pokemon visible={false} pokeName={evolutions[i].name} pokeUrl={evolutions[i].url} pokeImg={evolutions[i].sprite} />;
            pokemon.push(poke);
          }
          return pokemon;
        }else{
          const errMsg = <p>{this.state.errMsg}</p>
          return errMsg;
        }
      }

      getAbilities(){
        const pokeAbilities = [];
        let a = this.state.abilities;
        console.log(a);
        if(this.state.abilities!==undefined){
          for(var i=0; i<a.length; i++){
            const poke = <span> {i+1}. {a[i]}</span>;
            pokeAbilities.push(poke);
          }
        }
        return pokeAbilities;
      }

      getTypes(){
        const typing = [];
        let a = this.state.type;
        if(this.state.type!==undefined){
          for(var i=0; i<a.length; i++){
            if(i===a.length-1){
              const poke = <span> {a[i]}</span>;
              typing.push(poke);
            }else{
              const poke = <span> {a[i]},</span>
              typing.push(poke);
            }
          }
        }
        return typing;
      }
      handleClickOutside = () => {
          this.setState({
            modal: false
          });
      }
      render() {
        return (
            <div>        
            <Modal isOpen={this.state.modal} className={AppStyles.modal}>

            <div className={AppStyles.pokeData}>
            <h1 >{this.props.name}</h1>
            <p className={AppStyles.pokeKey}>abilities: 
            <span className={AppStyles.pokeValue}>
            {this.getAbilities()}
            </span>
            </p>
            <p className={AppStyles.pokeKey}>
            Height:
            <span className={AppStyles.pokeValue}> {(this.state.height/0.254).toFixed(2)} inches</span>
            </p>
            <p className={AppStyles.pokeKey}>
            Weight:
              <span className={AppStyles.pokeValue}> {(this.state.weight/4.54).toFixed(2)} pounds</span>
            </p>
            <p className={AppStyles.pokeKey}>
            Type: 
            <span className={AppStyles.pokeValue}> {this.getTypes()}</span>
            </p>

            <Button color="success" onClick={this.handleClickOutside} className={AppStyles.closeBtn}>close</Button>
            </div>
            </Modal>
            </div>
          
        );
      }
    }
 
export default onClickOutside(PokeModal);