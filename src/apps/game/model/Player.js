import {RoundAction} from './RoundAction'
import LoggedInUser from  './LoggedInUser'
import Utils from './Utils'

const SERDE_KEYS = ['userId', 'nickname', '_sickenessLevel', 'isDead', 'currentHand'];
/**
 * Player holds player state in game
 *
 */
export default class Player
{
    constructor(loggedInUser)
    {
        this.userId = loggedInUser._id
        this.nickname = loggedInUser.nickname
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


    getListPotentialActionsToPerform(game)
    {
      //todo
      return [
        RoundAction.Nothing,
        RoundAction.CollectWater,
        RoundAction.CollectFood,
        RoundAction.CollectWood
      ]
    }

    performAction(game, selectedAction, additionalRequest=0)
    {
      // const [updatedRoundManager, updatedPlayer, endOfRound] = game._roundManager.playAction(this, selectedAction, additionalRequest);
      // game.updateAfterRoundAction(updatedRoundManager, updatedPlayer, endOfRound);
      game.registerAction(this, selectedAction, additionalRequest)
      return game;
    }

    toDoc() {
        return {
            userId : this.userId,
            nickname : this.nickname,
            _sickenessLevel : this._sickenessLevel,
            isDead : this.isDead,
            currentHand : this.currentHand,
        }
    }

    static fromDoc(doc) {
      let player = null;
      if(doc && Utils.checker(SERDE_KEYS, Object.keys(doc))){
          const loggedInUser = new LoggedInUser(doc['userId'], doc['nickname']);
          player = new Player(loggedInUser);
          player._sickenessLevel = doc['_sickenessLevel'];
          player.isDead = doc['isDead'];
          player.currentHand = doc['currentHand'];
      }
      return player;
    }

}
