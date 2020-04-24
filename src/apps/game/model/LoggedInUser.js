
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
  
}
