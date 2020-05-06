import {RoundAction} from './RoundAction'
import LoggedInUser from  './LoggedInUser'
import Utils from './Utils'
import {ShipwreckCards} from './ShipwreckCard'

export const SERDE_KEYS = [
  'userId', 'nickname', '_sickenessLevel',
'isDead', 'currentHand', 'hasPlayedThisRound',
'waterVote', 'foodVote', 'spectateGame',
'photoURL',
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
        this._sickenessLevel = 0
        this.isDead = false
        this.currentHand = null
        this.hasPlayedThisRound = false
        this.waterVote = null
        this.foodVote = null
        this.spectateGame = null
        
        this.photoURL = loggedInUser.photoURL
    }

    get id() { return this.userId; }

    get _id() { return this.userId; }

    get isSick() { return this._sickenessLevel !== 0; }

    onGetSick()
    {
        this._sickenessLevel = 2;
    }

    onGetHealed()
    {
        this._sickenessLevel = 0;
    }
    
    get hasRevolver() { return this.currentHand.includes(ShipwreckCards.Revolver); }
    
    removeCardFromHand(card) 
    {
      const index = this.currentHand.indexOf(card);
      if (index > -1) {
        this.currentHand.splice(index, 1);
      }
    }
    
    addCardToHand(card) 
    {
      this.currentHand.push(card);
    }

    onRoundEnded()
    {
        this._sickenessLevel --;
        this._sickenessLevel = (this._sickenessLevel < 0) ? 0 : this._sickenessLevel;
    }

    choosePlayerIdToVoteAgainst(players, context)
    {
      let chosenPlayerId;
      switch (context)
      {
        case RoundAction.WaterVote:
            chosenPlayerId = this.waterVote
            break;

        case RoundAction.FoodVote:
            chosenPlayerId = this.foodVote
            break;

        case RoundAction.FinalWaterVote:
            chosenPlayerId = this.finalWaterVote
            break;

        case RoundAction.FinalFoodVote:
            chosenPlayerId = this.finalFoodVote
            break;

        default :
              throw new Error('Context error in choosePlayerIdToVoteAgainst with player', this);
      }
      return players.filter(p => p.id === chosenPlayerId)[0].id; 
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
        this.playAction(game, selectedAction, additionalRequest);
        game.onPlayerActionPerformed(this, selectedAction, additionalRequest);
    }

    playAction(game, actionToPerform, additionalRequest=0)
    {
        switch (actionToPerform)
        {
            case RoundAction.CollectWater:
                game._waterManager.collect()
                break;

            case RoundAction.CollectFood:
                game._foodManager.collect()
                break;

            case RoundAction.CollectWood:
                if (!game._woodManager.tryCollect(additionalRequest))
                {
                  this.onGetSick()
                }
                break;

            default :
                throw new Error('Default case in RoundManager for player', this);
          }
    }

    performVote(game, actionToPerform, votedPlayerId)
    {
        switch (actionToPerform)
        {
            case RoundAction.WaterVote:
                this.waterVote = votedPlayerId
                game.onPlayerWaterVote()
                break;

            case RoundAction.FoodVote:
                this.foodVote = votedPlayerId
                game.onPlayerFoodVote()
                break;

            case RoundAction.FinalWaterVote:
                this.finalWaterVote = votedPlayerId
                game.onPlayerFinalWaterVote()
                break;

            case RoundAction.FinalFoodVote:
                this.finalFoodVote = votedPlayerId
                game.onPlayerFinalFoodVote()
                break;

            default :
                throw new Error('Default case in RoundManager for player', this);
          }
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
        }
    }

    static fromDoc(doc) {
      let player = null;
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

      }
      return player;
    }

}
