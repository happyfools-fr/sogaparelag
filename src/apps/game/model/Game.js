import Player from "./Player";
import LoggedInUser from "./LoggedInUser";
import {RoundManager} from "./RoundManager";
import {WaterManager} from "./WaterManager";
import {FoodManager} from "./FoodManager";
import {WoodManager} from "./WoodManager";

import {GameTable} from "./GameTable";
import {PollManager} from "./PollManager";
import Utils from './Utils'
import { v1 as uuidv1 } from 'uuid';

export const SERDE_KEYS = [
  '_id', '_lastRound', '_win', '_waterManager',
  '_foodManager', '_woodManager', '_gameTable', 'history'
];

export default class Game
{
    constructor(loggedInUsers, waterManager, foodManager, woodManager)
    {
        this._id = uuidv1();

        this._lastRound = false
        this._win = false

        this._waterManager = waterManager
        this._foodManager = foodManager
        this._woodManager = woodManager

        let players = Game._createPlayers(loggedInUsers)
        this._gameTable = new GameTable(players)
        this._roundManager = new RoundManager(this._gameTable, this._waterManager, this._foodManager, this._woodManager)
        this._pollManager = new PollManager(this._gameTable);

        this.history = [];
    }

    static _createPlayers(loggedInUsers)
    {
        let players = []
        loggedInUsers.map( (user) => { return players.push(new Player(user))} )
        return players
    }

    get playersCount()
    {
      return this._gameTable.playersCount
    }

    get currentPlayerId() {
        return this._gameTable.currentPlayer.userId;
    }

    get nextPlayerId() {
        // return this._gameTable.players[0].id;
        let iter = this._gameTable.getPositionedHealthyPlayerEnumerator();
        let nextSittingPlayer = iter.next();
        console.log("A nextPlayerId.nextSittingPlayer", nextSittingPlayer)
        if (nextSittingPlayer.done){
          iter = this._gameTable.getHealthyPlayerEnumerator();
          nextSittingPlayer = iter.next();
          console.log("B in if nextPlayerId.nextSittingPlayer", nextSittingPlayer)
        }
        return nextSittingPlayer.value._player.userId;
    }
    get nextPlayer() {
        // return this._gameTable.players[0].id;
        let iter = this._gameTable.getPositionedHealthyPlayerEnumerator();
        let nextSittingPlayer = iter.next();
        if (nextSittingPlayer.done){
          iter = this._gameTable.getHealthyPlayerEnumerator();
          nextSittingPlayer = iter.next();
        }
        return nextSittingPlayer.value._player;
    }

    get waterSupply() {
        return this._waterManager.inventory;
    }

    get foodSupply() {
        return this._foodManager.inventory;
    }

    get woodSupply() {
        return this._woodManager.inventory;
    }

    play()
    {
        while (!this._lastRound)
        {
            this._lastRound = this._waterManager.mustLeave()

            this._roundManager.play()

            //CAN LEAVE?
            if (this._canLeave())
            {
                this._win = true
                break
            }

            //SUPPLY MANAGEMENT
            this._manageWaterEndOfRound()
            this._manageFoodEndOfRound()

            //CAN LEAVE?
            if (this._canLeave())
            {
                this._win = true
                break
            }

// UNCOMMENT WHEN KILL THEM ALL ACTIVATED
/*
            //do you want to kill them all to leave?


            //CAN LEAVE?
            if (this._canLeave())
            {
                this._win = true
                break
            }
*/

            //ON END OF ROUND
            this._onRoundEnded()
        }
    }

    _manageWaterEndOfRound()
    {
        //enough water to play next round?
        while (this._gameTable.playersCount - this._waterManager.inventory > 0)
        {
            let playerIdToKill = this._pollManager.vote()
            this._gameTable.killPlayer(playerIdToKill)
        }
        //everybody drinks
        this._waterManager.drink(this._gameTable.playersCount)
    }

    _manageFoodEndOfRound()
    {
        //enough food to play next round?
        while (this._gameTable.playersCount - this._foodManager.inventory > 0)
        {
            let playerIdToKill = this._pollManager.vote()
            this._gameTable.killPlayer(playerIdToKill)
        }
        //everybody eats
        this._foodManager.eat(this._gameTable.playersCount)
    }

    // _onRoundEnded()
    // {
    //     this._waterManager.onRoundEnded()
    //     let playerEnumerator = this._gameTable.getPlayerEnumerator()
    //     while (true)
    //     {
    //         let currentPlayer = playerEnumerator.next()
    //         if (currentPlayer.done)
    //             break
    //
    //         currentPlayer.value._player.onRoundEnded()
    //     }
    //     this._gameTable.assignNextHeadPlayer()
    // }

    _canLeave()
    {
        let canLeaveWithEnoughWater = this._waterManager.authorizeLeaving(this._gameTable.playersCount)
        let canLeaveWithEnoughFood = this._foodManager.authorizeLeaving(this._gameTable.playersCount)
        let canLeaveWithEnoughWood = this._woodManager.authorizeLeaving(this._gameTable.playersCount)
        return canLeaveWithEnoughWater && canLeaveWithEnoughFood && canLeaveWithEnoughWood
    }

    registerAction(player, selectedAction, additionalRequest)
    {
      const endOfRound = this._roundManager.playAction(player, selectedAction, additionalRequest);
      this.updateAfterRoundAction(endOfRound);
    }

    pullChangesFromRoundManager()
    {
      this._lastRound = this._roundManager._waterManager.mustLeave()

      this._waterManager = this._roundManager._waterManager
      this._foodManager = this._roundManager._foodManager
      this._woodManager = this._roundManager._woodManager

      this._gameTable = this._roundManager._gameTable
      this._pollManager = new PollManager(this._gameTable);

    }

    updateAfterRoundAction(endOfRound)
    {
      // if(!this._lastRound)
      if(true)
      {
        // Propagate changes in RoundManager to upper level: game
        this.pullChangesFromRoundManager()

        //if end of Round, apply updates
        if (endOfRound)
        {
          //CAN LEAVE?
          if (this._canLeave())
          {
              this._win = true
              return;
          }

          //SUPPLY MANAGEMENT
          this._manageWaterEndOfRound()
          this._manageFoodEndOfRound()

          //CAN LEAVE?
          if (this._canLeave())
          {
              this._win = true
              return;
          }

  // UNCOMMENT WHEN KILL THEM ALL ACTIVATED
  /*
          //do you want to kill them all to leave?


          //CAN LEAVE?
          if (this._canLeave())
          {
              this._win = true
              break
          }
  */

          //ON END OF ROUND
          this._roundManager._onRoundEnded()
          this.roundIndex = this.roundIndex + 1;
          this.pullChangesFromRoundManager()
      } else
      {
        //Simple End of Action
        //Update next current player
        let nextSittingPlayer = this._roundManager._gameTable.getNextSittingPlayer();
        this._roundManager._gameTable.currentPlayer = nextSittingPlayer.value._player;
        this.pullChangesFromRoundManager();
      }
      Array.prototype.push.apply(this.history, this._roundManager.actionsPerformedByPlayer);
    }
  }

    toDoc() {
        return {
            _id : this._id,

            _lastRound : this._lastRound,
            _win : this._win,

            _waterManager : this._waterManager ? this._waterManager.toDoc() : null,
            _foodManager : this._foodManager ? this._foodManager.toDoc() : null,
            _woodManager : this._woodManager ? this._woodManager.toDoc() : null,

            _gameTable: this._gameTable ? this._gameTable.toDoc() : null,
            history: this.history,
        }
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
          let gameTable = GameTable.fromDoc(doc['_gameTable']);
          game._gameTable = gameTable;
          game._roundManager = new RoundManager(game._gameTable, waterManager, foodManager, woodManager)
          game._pollManager = new PollManager(game._gameTable);
          game.history = doc['history'];
      }
      return game;
    }
}
