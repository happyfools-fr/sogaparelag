import {RoundAction} from './RoundAction'
import LoggedInUser from  './LoggedInUser'
import Utils from './Utils'

const SERDE_KEYS = ['userId', 'nickName', '_sickenessLevel', 'isDead', 'currentHand'];
/**
 * Player holds player state in game
 *
 */
export default class Player
{
    constructor(loggedInUser)
    {
        this.userId = loggedInUser._id
        this.nickName = loggedInUser.nickname
        this._sickenessLevel = 0
        this.isDead = false
        this.currentHand = null
    }

    get id()
    {
        return this.userId;
    }

    get _id()
    {
        return this.userId;
    }

    get isSick()
    {
        return this._sickenessLevel !== 0;
    }

    onGetSick()
    {
        this._sickenessLevel = 2;
    }

    onRoundEnded()
    {
        this._sickenessLevel --;
        this._sickenessLevel = (this._sickenessLevel < 0) ? 0 : this._sickenessLevel;
    }

    choosePlayerIdToVoteAgainst(players)
    {
        //TODO
        return players[0];
    }

    chooseFinalPlayerIdToVoteAgainst(players)
    {
        //TODO
        return players[0];
    }

    chooseActionToPerform()
    {
        //TODO
        return RoundAction.CollectFood;
        //return RoundAction.CollectWood;
        //return RoundAction.CollectWater;
    }

    additionalWoodRequest()
    {
      return 0
    }

    toDoc() {
        return {
            userId : this.userId,
            nickName : this.nickName,
            _sickenessLevel : this._sickenessLevel,
            isDead : this.isDead,
            currentHand : this.currentHand,
        }
    }
    
    static fromDoc(doc) {
      let player = null;
      if(doc && Utils.checker(SERDE_KEYS, Object.keys(doc))){
          const loggedInUser = new LoggedInUser(doc['userId'], doc['nickName']);
          player = new Player(loggedInUser);
          player._sickenessLevel = doc['_sickenessLevel'];
          player.isDead = doc['isDead'];
          player.currentHand = doc['currentHand'];
      }
      return player;
    }

}
