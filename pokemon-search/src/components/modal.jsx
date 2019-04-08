import React, { Component } from 'react';
import { Button, Modal} from 'reactstrap';
import AppStyles from "./App.css";

class PokeModal extends Component {
    constructor(props) {
        super(props);
        this.state = { modal: false};
    
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }

      componentWillReceiveProps(){
        this.setState({
            modal: this.props.modalVisible
        });
        //console.log(this.props.name);
       //console.log(this.props.url);
      }
     
      render() {
        return (
            <div>        
            <Modal isOpen={this.state.modal} className={AppStyles.modal}>
            <p>Modal is open</p>
            <p>{this.props.name}</p>
            <p>{this.props.url}</p>
            <Button color="success" onClick={this.toggle}>React Modal</Button>
            </Modal>
            </div>
          
        );
      }
    }
 
export default PokeModal;