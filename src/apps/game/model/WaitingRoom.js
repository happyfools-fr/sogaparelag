import Game from './Game'

import { v1 as uuidv1 } from 'uuid';
import {WaterManager} from "./WaterManager";
import {FoodManager} from "./FoodManager";
import {WoodManager} from "./WoodManager";

/**
 * WaitingRoom
 * - Can add loggedInPlayer only if game has not started (if !this_currentGame)
 * - Can start game only if this._loggedInUsers.length >= 3 && <= 12
 *
 * Features:
 * - create WaitingRoom collection
 */

export const MIN_NUMBER_PLAYERS = 3; // Should be 3
export const MAX_NUMBER_PLAYERS = 12;
const INITIAL_VALUES = [
//  water, food
    [6, 5],
    [8, 7],
    [10, 8],
    [12, 10],
    [14, 12],
    [16, 13],
    [18, 15],
    [20, 16],
    [22, 18],
    [24, 20]
]

export default class WaitingRoom
{
    constructor()
    {
        this._id = uuidv1();
        this.slugname = this._createSlugname();
        this._loggedInUsers = [];
        this._currentGame = null;
    }

    hasJoined(user) {
        return this._loggedInUsers.map( x => {return x._id}).includes(user._id)
    }

    addLoggedInUser(loggedInUserToAdd)
    {
        let numberOfPlayers = this._loggedInUsers.length;
        console.log("addLoggedInUser.numberOfPlayers", numberOfPlayers)
        if (!this.hasJoined(loggedInUserToAdd) && numberOfPlayers < MAX_NUMBER_PLAYERS) {
            this._loggedInUsers.push(loggedInUserToAdd);
            return true;
        } else {
            return false;
        }
    }

    startGame()
    {
        let numberOfPlayers = this._loggedInUsers.length;
        if (numberOfPlayers >= MIN_NUMBER_PLAYERS && numberOfPlayers <= MAX_NUMBER_PLAYERS) {
            let [initialWater, initialFood] = INITIAL_VALUES[numberOfPlayers-MIN_NUMBER_PLAYERS]
            let waterManager = new WaterManager(initialWater);
            let foodManager = new FoodManager(initialFood);
            let woodManager = new WoodManager(0);
            let game = new Game(this._loggedInUsers, waterManager, foodManager, woodManager);
            this._currentGame = game;
            return game;
        } else {
            return null;
        }
    }

    _createSlugname()
    {
        const json = require('../../../assets/words.json');
        const words = json["words"];
        const random = Math.round(Math.random() * words.length / 2)
        return words[random] + "-" + words[random * 2]
    }

    toDoc() {
        return {
            _id: this._id,
            slugname: this.slugname,
            _loggedInUsers: this._loggedInUsers.map((u) => {return u.toDoc()}),
            _currentGame: this._currentGame.toDoc(),
        }
    }
}
