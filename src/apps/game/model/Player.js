import {RoundAction} from './RoundAction'

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
    
    fromDoc(doc) {
      this.userId = doc['userId'];
      this.nickName = doc['nickName'];
      this._sickenessLevel = doc['_sickenessLevel'];
      this.isDead = doc['isDead'];
      this.currentHand = doc['currentHand'];
    }

}
