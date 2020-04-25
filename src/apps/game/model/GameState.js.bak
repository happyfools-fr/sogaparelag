
import { v1 as uuidv1 } from 'uuid';

class GameState {
  constructor(
    _id,
    roundNumber,
    currentPlayerId,
    nextPlayerId,
    waterSupply,
    foodSupply,
    woodSupply,
    isStarted,
    isPlaying,
    playerStatesInGame,
    shipwreckDeck,
    weatherDeck
  ) {
    this._id = _id;
    this.roundNumber = roundNumber;
    this.currentPlayerId = currentPlayerId;
    this.nextPlayerId = nextPlayerId;
    this.waterSupply = waterSupply;
    this.foodSupply = foodSupply;
    this.woodSupply = woodSupply;
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
      game.currentState.nextPlayerId,
      game.currentState.waterSupply,
      game.currentState.foodSupply,
      game.currentState.woodSupply,
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
      'unknown-user-id',
      6,
      5,
      "unknown inital wood supply",
      false,
      false,
      [],
      null,
      null,
    );
  }

}

export default GameState;
