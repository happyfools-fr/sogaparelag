
class Player {
  
  constructor (uid, nickname, currentPlayerStateInGame) {
    this._id = uid;
    this.nickname = nickname;
    this.currentPlayerStateInGame = currentPlayerStateInGame;
  }

  static pushOrUpdateRecord(db, player) {
    db.collection("player").doc(player._id).set({
      _id: player._id,
      nickname: player.nickname,
      currentPlayerStateInGame: player.currentPlayerStateInGame,
    });
    return player;
  }
  
  static createAndPushPlayerWithState(db, user, playerStateInGame) {
    const stateInGame = playerStateInGame ? playerStateInGame._id : null;
    const player = new Player(
      user.uid,
      user.displayName,
      stateInGame,
    )
    return Player.pushOrUpdateRecord(db, player);
  }

  choosePlayerToVoteAgainst(players)
  {
      return players[0]
  }

  chooseFinalPlayerToVoteAgainst(players)
  {
      return players[0]
  }

}

export default Player;