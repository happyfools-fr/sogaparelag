import React, { Component } from 'react';
import Game from './Game';
class ActionApp extends Component {
  
  render() {
    const game = this.props.game;    
    return (
      <React.Fragment>
        <button onClick={
          () => {
          Game.pushUpdateGameState(game);
          alert("Action 1: Game.updateGameState");
        }
      }>Action 1</button>
        <button onClick={
          () => {
          Game.pushUpdateGameState(game);
          alert("Action 2: Game.updateGameState");
        }
      }>Action 2</button>
        <button onClick={
          () => {
          Game.pushUpdateGameState(game);
          alert("Action 3: Game.updateGameState");
        }
      }>Action 3</button>
        <button onClick={
          () => {
          Game.pushUpdateGameState(game);
          alert("Action 4: Game.updateGameState");
        }
      }>Action 4</button>
      </React.Fragment>

  )}
}

export default ActionApp;