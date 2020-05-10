import Game from './Game'

import { v1 as uuidv1 } from 'uuid';
import {WaterManager} from "./WaterManager";
import {FoodManager} from "./FoodManager";
import {WoodManager} from "./WoodManager";
import LoggedInUser from "./LoggedInUser";
import Utils from "./Utils";

export const SERDE_KEYS = ['_id', 'slugname', '_loggedInUsers', '_currentGameId', '_creatorId'];
/**
 * WaitingRoom
 * - Can add loggedInPlayer only if game has not started (if !this_currentGame)
 * - Can start game only if this._loggedInUsers.length >= 3 && <= 12
 *
 * Features:
 * - create WaitingRoom collection
 */

export const MIN_NUMBER_PLAYERS = 1; // Should be 3
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
    [24, 20],
    [26, 21],
    [28, 23],
    [30, 25]
]

export default class WaitingRoom
{
    constructor(creatorId)
    {
        this._id = uuidv1();
        this.slugname = this._createSlugname();
        this._loggedInUsers = [];
        this._currentGameId = null;
        this._creatorId = creatorId;
    }

    get currentGameId() { return this._currentGameId }
    get creatorId() { return this._creatorId }

    hasJoined(user)
    {
        return this._loggedInUsers.map( x => {return x._id}).includes(user._id)
    }

    addLoggedInUser(loggedInUserToAdd)
    {
        let numberOfPlayers = this._loggedInUsers.length;
        if (!this.hasJoined(loggedInUserToAdd) && numberOfPlayers < MAX_NUMBER_PLAYERS)
        {
            this._loggedInUsers.push(loggedInUserToAdd);
            return true;
        }

        return false;
    }

    startGame() {
        let numberOfPlayers = this._loggedInUsers.length;
        if (numberOfPlayers >= MIN_NUMBER_PLAYERS && numberOfPlayers <= MAX_NUMBER_PLAYERS) {
            const [initialWater, initialFood] = INITIAL_VALUES[numberOfPlayers-MIN_NUMBER_PLAYERS]
            const waterManager = new WaterManager(initialWater);
            const foodManager = new FoodManager(initialFood);
            const woodManager = new WoodManager(0);
            const game = new Game(this._loggedInUsers, waterManager, foodManager, woodManager);
            this._currentGameId = game.id;
            return game;
        }

        return null;
    }s

    _createSlugname()
    {
        const json = require('../../../assets/words.json');
        const words = json["words"];
        const random = Math.round(Math.random() * words.length / 2)
        return words[random] + "-" + words[random * 2]
    }

    toDoc()
    {
        return {
            _id: this._id,
            slugname: this.slugname,
            _loggedInUsers: this._loggedInUsers.map((u) => {return u ? u.toDoc() : null}),
            _currentGameId: this._currentGameId,
            _creatorId: this._creatorId,
        }
    }

    static fromDoc(doc)
    {
      let waitingRoom;
      if(doc && Utils.checker(SERDE_KEYS, Object.keys(doc)))
      {
        waitingRoom = new WaitingRoom(doc['_creatorId']);
        waitingRoom._id = doc['_id'];
        waitingRoom.slugname = doc['slugname'];
        waitingRoom._loggedInUsers = doc['_loggedInUsers'].map((uDoc) => { return LoggedInUser.fromDoc(uDoc); });
        waitingRoom._currentGameId = doc['_currentGameId'];
      }

      return waitingRoom;
    }
}
