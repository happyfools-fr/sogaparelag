import React, { Component } from 'react';

import Game from '../model/Game';

// Styles imports
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'

class Action extends Component {
  
  render() {
    const game = this.props.game;    
    return (
      <React.Fragment>
        <Button variant="primary" onClick={
          () => {
          Game.pushUpdateGameState(game);
          alert("Action 1: Game.updateGameState");
        }
      }>Get water</Button>
        <Button variant="success" onClick={
          () => {
          Game.pushUpdateGameState(game);
          alert("Action 2: Game.updateGameState");
        }
      }>Get wood</Button>
        <Button variant="danger" onClick={
          () => {
          Game.pushUpdateGameState(game);
          alert("Action 3: Game.updateGameState");
        }
      }>Get food</Button>
      </React.Fragment>

  )}
}

export default Action;