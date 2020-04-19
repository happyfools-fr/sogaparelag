import * as firebase from 'firebase';
import firebaseApp from '../../../firebaseApp';

const db = firebase.firestore(firebaseApp);

export default class Player {
  
  constructor (uid, nickname) {
    this._id = uid;
    this.nickname = nickname;
  }

  static pushOrUpdateRecord(player) {
    db.collection("player").doc(player._id).set({
      ...player
    },
    {
      merge: true,
    }
  );
    return player;
  }
  
  static createAndPushPlayer(user) {
    const player = new Player(
      user.uid,
      user.displayName,
    )
    return Player.pushOrUpdateRecord(player);
  }  
}
