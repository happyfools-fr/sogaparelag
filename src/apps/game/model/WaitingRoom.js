import {Game2} from './Game2'
import { v1 as uuidv1 } from 'uuid';

/**
 * WaitingRoom
 * - Can add loggedInPlayer only if game has not started (if !this_currentGame)
 * - Can start game only if this._loggedInUsers.length >= 3 && <= 12
 *
 * Features:
 * - create WaitingRoom collection
 */

const MIN_NUMBER_PLAYERS = 3;
const MAX_NUMBER_PLAYERS = 12;

export class WaitingRoom
{
    constructor()
    {
        this._id = uuidv1();
        this.slugname = this._createSlugname();
        this._loggedInUsers = [];
        this._currentGame = null
    }

    addLoggedInPlayer(loggedInPlayer)
    {
        const numberOfPlayers = this._loggedInUsers.length;
        if (!this._currentGame && numberOfPlayers < MAX_NUMBER_PLAYERS) {
            this._loggedInUsers.push(loggedInPlayer)
        } else {
            return null
        }
    }

    startGame()
    {
        const numberOfPlayers = this._loggedInUsers.length;
        if (numberOfPlayers >= MIN_NUMBER_PLAYERS && numberOfPlayers <= MAX_NUMBER_PLAYERS) {
            return new Game2(this._loggedInUsers)
        } else {
            return null
        }
    }

    _createSlugname()
    {
        const json = require('../../../assets/words.json');
        const words = json["words"];
        const random = Math.round(Math.random() * words.length / 2)
        return words[random] + "-" + words[random * 2]
    }
}

export default WaitingRoom
