import * as firebase from 'firebase';
import firebaseApp from '../../../firebaseApp';

const db = firebase.firestore(firebaseApp);

export default class User {
  
  constructor (uid, nickname) {
    this._id = uid;
    this.nickname = nickname;
  }

  static pushOrUpdateRecord(user) {
    db.collection("user").doc(user._id).set({
      ...user
    },
    {
      merge: true,
    }
  );
    return user;
  }
  
  static createAndPushUser(user) {
    const user = new User(
      user.uid,
      user.displayName,
    )
    return User.pushOrUpdateRecord(user);
  }  
}
