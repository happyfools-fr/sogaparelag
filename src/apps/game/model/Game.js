import Player from "./Player";
import LoggedInUser from "./LoggedInUser";
import {RoundAction} from './RoundAction'
import {WaterManager} from "./WaterManager";
import {FoodManager} from "./FoodManager";
import {WoodManager} from "./WoodManager";

import {GameTable} from "./GameTable";
import {PollManager} from "./PollManager";
import Utils from './Utils'
import { v1 as uuidv1 } from 'uuid';

export const SERDE_KEYS = [
  '_id', '_lastRound', '_win', '_mustLeave', '_endOfGame', '_waterManager',
  '_foodManager', '_woodManager', '_gameTable', 'history',
  'pollFood', 'pollWater',
];

export default class Game
{
    constructor(loggedInUsers, waterManager, foodManager, woodManager)
    {
        this._id = uuidv1();

        this._lastRound = false
        this._win = false
        this._mustLeave = false
        this._endOfGame = false

        this._waterManager = waterManager
        this._foodManager = foodManager
        this._woodManager = woodManager

        let players = Game._createPlayers(loggedInUsers)
        this._gameTable = new GameTable(players, 0, 0, 0)
        this._pollManager = new PollManager(this._gameTable);

        this.history = [];

        this.pollFood = false;
        this.pollWater = false;

    }

    static _createPlayers(loggedInUsers)
    {
        let players = []
        loggedInUsers.map( (user) => { return players.push(new Player(user))} )
        return players
    }

    get playersCount() { return this._gameTable.playersCount }

    get headPlayerId() { return this._gameTable.headPlayer.userId; }

    get headPlayer() { return this._gameTable.headPlayer; }

    get currentPlayerId() { return this._gameTable.currentPlayer.userId; }

    get currentPlayer() { return this._gameTable.currentPlayer; }

    get nextPlayerId() { return this._gameTable._currentPlayer.next.player.userId; }

    get nextPlayer() { return this._gameTable._currentPlayer.next.player; }

    get waterSupply() { return this._waterManager.inventory; }

    get foodSupply() { return this._foodManager.inventory; }

    get woodSupply() { return this._woodManager.inventory; }

    onPlayerActionPerformed(player, selectedAction, additionalRequest)
    {
        // Push action logs
        let actionSummary = this.getActionSummary(player, selectedAction, additionalRequest);
        this.history.push(
          {
              type: selectedAction,
              value: actionSummary
          }
        );

        this._gameTable.onPlayerTurnEnded(player)
        if (!this._gameTable.endOfRound)
            return;

        this.onActionRoundEnded()
    }

    onActionRoundEnded()
    {
        // CanLeave should only be tested after all management

        // if (this._canLeave())
        // {
        //   alert("You are saved!");
        //   this._win = true
        //   return;
        // }

        // Init SUPPLY MANAGEMENT sequence
        this._initWaterManagement();
    }

    get waterVoteEnded()
    {
       return this._gameTable.players.filter(p => !p.isDead).every(p => p.waterVote !== null);
    }

    onPlayerWaterVote()
    {
      if(!this.waterVoteEnded){
        console.log("!waterVoteEnded", this.waterVoteEnded)
        return;
      }
      alert("onWaterVoteEnded");
      this.onWaterVoteEnded();
    }

    get footVoteEnded()
    {
       return this._gameTable.players.filter(p => !p.isDead).every(p => p.foodVote !== null);
    }

    onWaterVoteEnded()
    {
      //Kill the voted Player
      let playerIdToKill = this._pollManager.voteWithContext(RoundAction.WaterVote)
      alert('onWaterVoteEnded killing player playerIdToKill = ' + playerIdToKill)

      if (this._gameTable.playersCount === 1)
      {
        this._endOfGame = true
        this._win = false
        alert("GAME OVER");
        return
      }

      this._gameTable.killPlayer(playerIdToKill)

      //enough water to play next round?
      if (this._gameTable.playersCount - this._waterManager.inventory <= 0)
      {
        //everybody drinks
        this._waterManager.drink(this._gameTable.playersCount)
        //end of water vote
        this._gameTable.players.forEach( p => {
          p.waterVote = null;
        });
        this.pollWater = false

         this._initFoodManagement();
         return
      }

      //Otherwise redo vote
      this._initWaterManagement();
    }

    _initWaterManagement()
    {
      if (this._gameTable.playersCount - this._waterManager.inventory > 0)
      {
        alert("Time for Water Vote!");
        this.pollWater = true;
        this._gameTable.players.forEach( p => {
          p.waterVote = null;
        });
        return;
      }
      // Else drink water and keep on
      this._waterManager.drink(this._gameTable.playersCount);
      return this._initFoodManagement();
    }

    _initFoodManagement()
    {
      if (this._gameTable.playersCount - this._foodManager.inventory > 0)
      {
        alert("Time for Food Vote!");
        this.pollFood = true;
        this._gameTable.players.forEach( p => {
          p.foodVote = null;
        });
        return;
      }
      // Else eat food and keep on
      this._foodManager.eat(this._gameTable.playersCount);

      this.onAllManagementEnded();
    }

    onPlayerFoodVote()
    {
      if(!this.footVoteEnded)
      {
          console.log("!this.footVoteEnded", !this.footVoteEnded)
          return
      }
      alert("onFoodVoteEnded");
      this.onFoodVoteEnded();
    }

    onFoodVoteEnded()
    {
      //Kill the voted Player
      let playerIdToKill = this._pollManager.voteWithContext(RoundAction.FoodVote)
      alert('onFoodVoteEnded killing player playerIdToKill = ' + playerIdToKill)

      if (this._gameTable.playersCount === 1)
      {
        this._endOfGame = true
        this._win = false
        alert("GAME OVER");
        return
      }

      this._gameTable.killPlayer(playerIdToKill)

      //enough water to play next round?
      if (this._gameTable.playersCount - this._foodManager.inventory <= 0)
      {
        //everybody eats
        this._foodManager.eat(this._gameTable.playersCount)
        //end of water vote
        this._gameTable.players.forEach( p => {
          p.foodVote = null;
        });
        this.pollFood = false
        this.onAllManagementEnded();
        return
      }

      //Otherwise redo vote
      this._initFoodManagement();
    }

    onAllManagementEnded()
    {
      //CAN LEAVE?
      if (this._canLeave())
      {
          this._win = true
          this._endOfGame = true
          alert("You are safe!");
          return;
      }
      if (this._mustLeave)
      {
          this._endOfGame = true
          this._win = false
          alert("GAME OVER");
      }
      else if (this._waterManager.mustLeave())
      {
          this._mustLeave = true
          // Init SUPPLY MANAGEMENT sequence
          this._initWaterManagement();
      }
      else
      {
        this._gameTable.onRoundStarts();
        this._waterManager.onRoundEnded();
      }
    }

    onPlayerFinalWaterVote()
    {
      return ;
    }

    onPlayerFinalFoodVote()
    {
      return ;
    }

    _canLeave()
    {
        let canLeaveWithEnoughWater = this._waterManager.authorizeLeaving(this._gameTable.playersCount)
        let canLeaveWithEnoughFood = this._foodManager.authorizeLeaving(this._gameTable.playersCount)
        let canLeaveWithEnoughWood = this._woodManager.authorizeLeaving(this._gameTable.playersCount)
        return canLeaveWithEnoughWater && canLeaveWithEnoughFood && canLeaveWithEnoughWood
    }

    getActionSummary(player, actionToPerform, additionalRequest=0)
    {
        let actionSummary;
        let actionSummaryPrefix = `${player.nickname} chose to `;
        switch (actionToPerform)
        {
            case RoundAction.CollectWater:
                actionSummary = actionSummaryPrefix + "collect some water.";
                break;

            case RoundAction.CollectFood:
                actionSummary = actionSummaryPrefix + "collect some food.";
                break;

            case RoundAction.CollectWood:
                actionSummary = actionSummaryPrefix + `collect some wood with additional request of ${additionalRequest} logs.`;
                break;

            default :
                throw new Error('Default case in getActionSummary for player and action', player, actionToPerform);
          }
          return actionSummary;
    }

    toDoc() {
        return {
            _id : this._id,

            _lastRound : this._lastRound,
            _win : this._win,
            _mustLeave: this._mustLeave,
            _endOfGame: this._endOfGame,

            _waterManager : this._waterManager ? this._waterManager.toDoc() : null,
            _foodManager : this._foodManager ? this._foodManager.toDoc() : null,
            _woodManager : this._woodManager ? this._woodManager.toDoc() : null,

            _gameTable: this._gameTable ? this._gameTable.toDoc() : null,
            history: this.history,

            pollFood:  this.pollFood,
            pollWater: this.pollWater,
        };
    }

    static fromDoc(doc) {
      let game;
      if(doc && Utils.checker(SERDE_KEYS, Object.keys(doc))){
          const loggedInUsers = [new LoggedInUser('tototo', 'ddd')];
          const waterManager = WaterManager.fromDoc(doc['_waterManager']);
          const foodManager = FoodManager.fromDoc(doc['_foodManager']);
          const woodManager = WoodManager.fromDoc(doc['_woodManager']);

          game = new Game(loggedInUsers, waterManager, foodManager, woodManager);
          game._id = doc['_id'];
          game._lastRound = doc['_lastRound'];
          game._win = doc['_win'];
          game._mustLeave = doc['_mustLeave'];
          game._endOfGame = doc['_endOfGame'];
          let gameTable = GameTable.fromDoc(doc['_gameTable']);
          game._gameTable = gameTable;
          game._pollManager = new PollManager(game._gameTable);
          game.history = doc['history'];
          game.pollFood = doc['pollFood'];
          game.pollWater = doc['pollWater'];
      }
      return game;
    }
}
