
class PlayerStateInGame {
  
  constructor(playerId, isSick, isDead, currentHand) {
    this.playerId = playerId;
    this.isSick = isSick;
    this.isDead = isDead;
    this.currentHand = currentHand;
  }

  static getInitialPlayerStateInGame(player) {
    const playerStateInGame = new PlayerStateInGame(
      player._id,
      false,
      false,
      "4 cards in hand"
    )
    return playerStateInGame;
  }
}

export default PlayerStateInGame;
