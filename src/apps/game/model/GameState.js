
import { v1 as uuidv1 } from 'uuid';

class GameState {
  constructor(
    _id,
    roundNumber,
    currentPlayerId,
    waterSupply,
    foodSupply,
    isStarted,
    isPlaying,
    playerStatesInGame,
    shipwreckDeck,
    weatherDeck
  ) {
    this._id = _id;
    this.roundNumber = roundNumber;
    this.currentPlayerId = currentPlayerId;
    this.waterSupply = waterSupply;
    this.foodSupply = foodSupply;
    this.isStarted = isStarted;
    this.isPlaying = isPlaying;
    this.playerStatesInGame = playerStatesInGame;
    this.shipwreckDeck = shipwreckDeck;
    this.weatherDeck = weatherDeck;
  }

  static getGameState(game) {
    return new GameState(
      uuidv1(),
      game.currentState.roundNumber,
      game.currentState.currentPlayerId,
      game.currentState.waterSupply,
      game.currentState.foodSupply,
      game.currentState.isStarted,
      game.currentState.isPlaying,
      game.currentState.playerStatesInGame,
      game.currentState.shipwreckDeck,
      game.currentState.weatherDeck,
    );
  }

  static getInitialGameState() {
    return new GameState(
      uuidv1(),
      0,
      'unknown-user-id',
      6,
      5,
      false,
      false,
      [],
      null,
      null,
    );
  }

}

export default GameState;
