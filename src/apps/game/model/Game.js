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
        loggedInUsers.map( (user) => { players.push(new Player(user)) } )
        return players
    }

    get playersCount()
    {
      return this._gameTable.playersCount
    }

    get currentPlayerId() {
        return this._gameTable._headPlayer.id;
    }

    get nextPlayerId() {
        return this._gameTable.players[0].id;
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
        let it = 0
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

    _onRoundEnded()
    {
        this._waterManager.onRoundEnded()
        let playerEnumerator = this._gameTable.getPlayerEnumerator()
        while (true)
        {
            let currentPlayer = playerEnumerator.next()
            if (currentPlayer.done)
                break

            currentPlayer.onRoundEnded()
        }
        this._gameTable.assignNextHeadPlayer()
    }

    _canLeave()
    {
        let canLeaveWithEnoughWater = this._waterManager.authorizeLeaving(this._gameTable.playersCount)
        let canLeaveWithEnoughFood = this._foodManager.authorizeLeaving(this._gameTable.playersCount)
        let canLeaveWithEnoughWood = this._woodManager.authorizeLeaving(this._gameTable.playersCount)
        return canLeaveWithEnoughWater && canLeaveWithEnoughFood && canLeaveWithEnoughWood
    }

    toDoc() {
        return {
            _id : this._id,

            _lastRound : this._lastRound,
            _win : this._win,

            _waterManager : this._waterManager.toDoc(),
            _foodManager : this._foodManager.toDoc(),
            _woodManager : this._woodManager.toDoc(),
            
            _gameTable: this._gameTable.toDoc(),
            // this._roundManager = new RoundManager(this._gameTable, this._waterManager, this._foodManager, this._woodManager)
            // this._pollManager = new PollManager(this._gameTable);
            
            history: this.history,

        }
    }
    
    fromDoc(doc) {
      if(doc && Utils.checker(SERDE_KEYS, Object.keys(doc))){      
          this._id = doc['_id'];

          this._lastRound = doc['_lastRound'];
          this._win = doc['_win'];

          const waterManager = new WaterManager() 
          waterManager.fromDoc(doc['_waterManager'])
          this._waterManager = waterManager
          const foodManager = new FoodManager() 
          foodManager.fromDoc(doc['_foodManager'])
          this._foodManager = foodManager
          const woodManager = new WoodManager() 
          woodManager.fromDoc(doc['_woodManager'])
          this._woodManager = woodManager

          // new GameTable(players)
          let players = [
            new Player(new LoggedInUser('tototo', 'ddd')),
            new Player(new LoggedInUser('tototo1', 'ddd')),
            new Player(new LoggedInUser('tototo2', 'ddd'))
          ];
          let gameTable = new GameTable(players);
          gameTable.fromDoc(doc['_gameTable']);
          this._gameTable = gameTable;
          // this._roundManager = new RoundManager(this._gameTable, this._waterManager, this._foodManager, this._woodManager)
          // this._pollManager = new PollManager(this._gameTable);

          this.history = doc['history'];
      }
    }
}
