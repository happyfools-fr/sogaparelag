import Utils from './Utils'

const SERDE_KEYS = ['_id', 'nickname', 'photoURL'];
/**
 * Features:
 * - connect to a GamingRoom by slugname
 */
export default class LoggedInUser
{

  constructor (uid, nickname, photoURL=null)
  {
    this._id = uid;
    this.nickname = nickname;
    this.photoURL = photoURL;
  }


  get id() { return this._id }

  connectToGameWaitingRoom(slugname)
  {
      //todo
      return true;
  }

  toDoc()
  {
      return {
        _id: this._id,
        nickname: this.nickname,
        photoURL: this.photoURL,
      };
  }

  static fromDoc(doc)
  {
    let loggedInUser;
    if(doc && Utils.checker(SERDE_KEYS, Object.keys(doc)))
    {
        loggedInUser = new LoggedInUser(
          doc['_id'], 
          doc['nickname'],
          doc['photoURL'],
        );
    }
    return loggedInUser;
  }

}
