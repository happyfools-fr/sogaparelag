
export default class Player {
  
  constructor (uid, nickname) {
    this._id = uid;
    this.nickname = nickname;
  }

  static pushOrUpdateRecord(db, player) {
    db.collection("player").doc(player._id).set({
      ...player
    },
    {
      merge: true,
    }
  );
    return player;
  }
  
  static createAndPushPlayer(db, user) {
    const player = new Player(
      user.uid,
      user.displayName,
    )
    return Player.pushOrUpdateRecord(db, player);
  }  
}
