
class Player {
  
  constructor(playerId, isSick, isDead, currentHand) {
    this.playerId = playerId;
    this.isSick = isSick;
    this.isDead = isDead;
    this.currentHand = currentHand;
  }

  static getInitialPlayer(player) {
    const Player = new Player(
      player._id,
      false,
      false,
      "4 cards in hand"
    )
    return Player;
  }
}

export default Player;
