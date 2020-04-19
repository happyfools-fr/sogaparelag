import * as firebase from 'firebase';
import firebaseApp from '../../firebaseApp';

const db = firebase.firestore(firebaseApp);

class Player {
  
  constructor (uid, nickname, currentPlayerStateInGame) {
    this._id = uid;
    this.nickname = nickname;
    this.currentPlayerStateInGame = currentPlayerStateInGame;
  }

  static pushOrUpdateRecord(player) {
    db.collection("player").doc(player._id).set({
      _id: player._id,
      nickname: player.nickname,
      currentPlayerStateInGame: player.currentPlayerStateInGame,
    });
    // .then(function() {
    //     console.log("Player successfully written!");
    //     alert("Player pushed to firestore: " + JSON.stringify(player));
    //     return player;
    // })
    // .catch(function(error) {
    //     console.error("Error writing: ", error);
    // });
    return player;
  }
  
  static createAndPushPlayerWithState(user, playerStateInGame) {
    const stateInGame = playerStateInGame ? playerStateInGame._id : null;
    const player = new Player(
      user.uid,
      user.displayName,
      stateInGame,
    )
    return Player.pushOrUpdateRecord(player);
  }
  
  // static async fetchNickname(id){
  //   const docRef = await db.collection("player").doc(id).get();
  //   if (docRef.exists) {
  //       console.log("Document data:", docRef.data());
  //       const nickname = docRef.data().nickname;
  //       alert(nickname);
  //       return nickname;
  //   } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //   }
  // }
}
      // .then(function(doc) {
      //   if (doc.exists) {
      // 
      //       console.log("Document data:", doc.data());
      //       const nickname = doc.data().nickname;
      //       alert(nickname);
      //       return nickname;
      //   } else {
      //       // doc.data() will be undefined in this case
      //       console.log("No such document!");
      //   }
      // }).catch(function(error) {
      //     console.log("Error getting document:", error);
      // });

export default Player;