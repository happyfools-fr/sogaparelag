import LoggedInUser from  './LoggedInUser'
import Utils from './Utils'

export const SERDE_KEYS = [
  'userId', 'nickname', '_sickenessLevel',
'isDead', 'currentHand', 'hasPlayedThisRound',
'waterVote', 'foodVote', 'spectateGame',
'photoURL', 'next', 'previous'
];
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
        this.photoURL = loggedInUser.photoURL

        this._sickenessLevel = 0
        this.isDead = false

        this.currentHand = null

        this.hasPlayedThisRound = false

        this.waterVote = null
        this.foodVote = null

        this.spectateGame = null

        this._previous = null;
        this._next = null;
    }

    get id() { return this.userId; }
    get _id() { return this.userId; }

    get previous() { return this._previous; }
    set previous(value) { this._previous = value; }

    get next() { return this._next; }
    set next(value) { this._next = value; }

    get isSick() { return this._sickenessLevel !== 0; }


    onGetSick()
    {
        this._sickenessLevel = 2;
        return 0;
    }



    kill() {
        this.isDead = true;
    }

    onRoundStarts()
    {
        this._sickenessLevel --;
        this._sickenessLevel = (this._sickenessLevel < 0) ? 0 : this._sickenessLevel;
    }


    toDoc()
    {
        return {
            userId : this.userId,
            nickname : this.nickname,
            _sickenessLevel : this._sickenessLevel,
            isDead : this.isDead,
            currentHand : this.currentHand,
            hasPlayedThisRound : this.hasPlayedThisRound,
            waterVote: this.waterVote,
            foodVote: this.foodVote,
            spectateGame: this.spectateGame,
            photoURL: this.photoURL,
            previous : this.previous,
            next : this.next,
        }
    }


    static fromDoc(doc) {
      let player;
      if(doc && Utils.checker(SERDE_KEYS, Object.keys(doc)))
      {
          const loggedInUser = new LoggedInUser(doc['userId'], doc['nickname'], doc['photoURL']);
          player = new Player(loggedInUser);
          player._sickenessLevel = doc['_sickenessLevel'];
          player.isDead = doc['isDead'];
          player.currentHand = doc['currentHand'];
          player.hasPlayedThisRound = doc['hasPlayedThisRound']
          player.waterVote = doc['waterVote'];
          player.foodVote = doc['foodVote'];
          player.spectateGame = doc['spectateGame'];
          player.previous = doc['previous'];
          player.next = doc['next'];
      } else {
          console.log("Missing value in de-serialization", Object.keys(doc).filter((k) => !SERDE_KEYS.includes(k)))
      }
      return player;
    }

}

    // performAction(game, selectedAction, additionalRequest=0)
    // {
    //     let actionResult;
    //
    //     switch (actionToPerform)
    //     {
    //         case RoundAction.CollectWater:
    //             actionResult = game._waterManager.collect();
    //
    //         case RoundAction.CollectFood:
    //             actionResult = game._foodManager.collect();
    //
    //         case RoundAction.CollectWood:
    //             actionResult = game._woodManager.tryCollect(additionalRequest) || this.onGetSick()
    //
    //         default :
    //             throw new Error('Default case in RoundManager for player', this);
    //       }
    //
    //     const actionSummary = game.onPlayerActionPerformed(this, selectedAction, actionResult);
    //     return [actionResult, actionSummary];
    // }
    //
    //
    // performVote(game, actionToPerform, votedPlayerId)
    // {
    //     switch (actionToPerform)
    //     {
    //         case RoundAction.WaterVote:
    //             this.waterVote = votedPlayerId
    //             game.onPlayerWaterVote()
    //             break;
    //
    //         case RoundAction.FoodVote:
    //             this.foodVote = votedPlayerId
    //             game.onPlayerFoodVote()
    //             break;
    //
    //         case RoundAction.FinalWaterVote:
    //             this.finalWaterVote = votedPlayerId
    //             game.onPlayerFinalWaterVote()
    //             break;
    //
    //         case RoundAction.FinalFoodVote:
    //             this.finalFoodVote = votedPlayerId
    //             game.onPlayerFinalFoodVote()
    //             break;
    //
    //         default :
    //             throw new Error('Default case in RoundManager for player', this);
    //       }
    // }
    //}
