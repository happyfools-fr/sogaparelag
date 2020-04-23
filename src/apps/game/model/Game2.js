import {Player} from "./Player";
import {WaterManager} from "./WaterManager";
import {FoodManager} from "./FoodManager";
import {WoodManager} from "./WoodManager";
import { RoundManager } from "./RoundManager";
import {GameTable} from "./GameTable";
import {PollManager} from "./PollManager";
import { v1 as uuidv1 } from 'uuid';


export class Game2
{
    constructor(loggedInUsers)
    {
        this._id = uuidv1();

        let players = this._createPlayers(loggedInUsers)

        this._lastRound = false
        this._win = false

        this._waterManager = new WaterManager()
        this._foodManager = new FoodManager()
        this._woodManager = new WoodManager()

        this._gameTable = new GameTable(players)
        this._roundManager = new RoundManager(this._gameTable, this._waterManager, this._foodManager, this._woodManager)
        this._pollManager = new PollManager(this._gameTable);
    }

    _createPlayers(loggedInUsers)
    {
        let players = []
        for (let loggedInUser in loggedInUsers)
        {
            players.push(new Player(loggedInUser, false, false, null))
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
            this._lastRound = _waterManager.mustLeave()
            //actions round
            this._roundManager.play()

            //can leave?
            if (this._canLeave())
            {
                this._win = true
                break
            }


            //enough water to play next round?
            while (this._gameTable.playersCount - this._waterManager.inventory > 0)
            {
                let playerIdToKill = _pollManager.vote()
                this._gameTable.killPlayer(playerIdToKill)
            }
            //everbody drinks
            this._waterManager.drink(this._gameTable.playersCount)


            //enough food to play next round?
            while (this._gameTable.playersCount - this._foodManager.inventory > 0)
            {
                let playerIdToKill = _pollManager.vote()
                this._gameTable.killPlayer(playerIdToKill)
            }
            //everbody eats
            this._foodManager.eat(this._gameTable.playersCount)


            //do you want to kill them all to leave?



            //onRoundEnded
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
    }

    _canLeave()
    {
        return  this._waterManager.authorizeLeaving(this._gameTable.playersCount) &&
                this._foodManager.authorizeLeaving(this._gameTable.playersCount) &&
                this._woodManager.authorizeLeaving(this._gameTable.playersCount)
    }
}
