
/** 
 * Features:
 * - connect to a GamingRoom by slugname
 */
export default class LoggedInUser 
{
  
  constructor (uid, nickname) 
  {
    this._id = uid;
    this.nickname = nickname;
  }


  get id()
  { 
      return this._id
  }

  connectToGameRoom(slugname){


      //todo
      return true;
  }

//   static pushOrUpdateRecord(player) 
//   {
//     db.collection("player").doc(player._id).set({
//       ...player
//     },
//     {
//       merge: true,
//     }
//   );
//     return player;
//   }
  
// //   static createAndPushLoggedInUser(user) 
// //   {
// //     const player = new LoggedInUser(
// //       user.uid,
// //       user.displayName,
// //     )
// //     return LoggedInUser.pushOrUpdateRecord(player);
// //   }  
}
