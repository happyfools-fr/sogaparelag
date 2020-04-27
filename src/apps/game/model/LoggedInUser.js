import Utils from './Utils'

const SERDE_KEYS = ['_id', 'nickname'];
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

  connectToGameWaitingRoom(slugname){


      //todo
      return true;
  }

  toDoc() {
      return {
        _id: this._id,
        nickname: this.nickname,
      };
  }

  fromDoc(doc) {
    if(doc && Utils.checker(SERDE_KEYS, Object.keys(doc))){      
        this._id = doc['_id'];
        this.nickname = doc['nickname'];
      }
  }

}
