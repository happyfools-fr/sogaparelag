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
        // if game has not started
        // if this._loggedInUsers.length < MAX SIZE=12
        this._loggedInUsers.push(loggedInPlayer)
    }

    startGame()
    {   // if this._loggedInUsers.length >= 3 && <= 12
        this._currentGame = new Game2(this._loggedInUsers)
    }

    _createSlugname()
    {
        const json = require('../../../assets/words.json');
        const words = json["words"];
        const random = Math.round(Math.random() * words.length / 2)
        return words[random] + "-" + words[random * 2]
    }
}
