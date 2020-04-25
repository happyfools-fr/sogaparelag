import {Player} from "./Player";
import {WaterManager} from "./WaterManager";
import {FoodManager} from "./FoodManager";
import {WoodManager} from "./WoodManager";
import {RoundManager} from "./RoundManager";
import {GameTable} from "./GameTable";
import {PollManager} from "./PollManager";
import { v1 as uuidv1 } from 'uuid';


export class Game
{
    constructor(loggedInUsers, waterManager, foodManager, woodManager)
    {
        this._id = uuidv1();

        let players = Game._createPlayers(loggedInUsers)
        this._lastRound = false
        this._win = false

        this._waterManager = waterManager

        this._foodManager = foodManager
        this._woodManager = woodManager

        this._gameTable = new GameTable(players)
        this._roundManager = new RoundManager(this._gameTable, this._waterManager, this._foodManager, this._woodManager)
        this._pollManager = new PollManager(this._gameTable);
    }

    static _createPlayers(loggedInUsers)
    {
        let players = []
        for (let i = 0; i < loggedInUsers.length; i++)
        {
            players.push(new Player(loggedInUsers[i]))
        }
        return players
    }

    get playersCount()
    {
      return this._gameTable.playersCount
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
        //everbody drinks
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
        //everbody eats
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
}
