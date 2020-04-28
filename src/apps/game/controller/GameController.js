import Controller from './Controller'
import PlayerController from './PlayerController'
import Game from '../model/Game'
import GameTable from '../model/GameTable'
import {WaterManager} from '../model/WaterManager'
import {WoodManager} from '../model/WoodManager'
import {FoodManager} from '../model/FoodManager'

/** This class handles game CRUD and the database **/
class GameController extends Controller {

    constructor(database) {
        super("game", database);
        this.playerController = new PlayerController(database);
    };


    /**
    * To be define in subClass
    */
    _getObjectId(game) {
        return game._id;
    }


    /**
    *
    */
    _createObject(data) {

        const players = data._gameTable.players
            .map(
                (p) => { return this.playerController._createObject(p) }
            );

        let game = new Game(
            players,
            new WaterManager(data._waterManager.waterSupply),
            new FoodManager(data._foodManager.foodSupply),
            new WoodManager(data._woodManager.woodSupply)
        );

        game._id = data._id;

        game._lastRound = data._lastRound;
        game._win = data._win;
        game.history = data.history;

        game._gameTable = new GameTable(players);

        return game;
    }
}

export default GameController;
