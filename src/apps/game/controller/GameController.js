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

    _objectToFirestoreDoc(game) {
        console.log("_objectToFirestoreDoc game", game);
        console.log("_objectToFirestoreDoc game._gameTable", game._gameTable);

        let doc = {
            _id: game._id,

            _lastRound : game._lastRound,
            _win : game._win,
            history: game.history,

            players: game._gameTable.players.map(
              player => {
                return this.playerController._objectToFirestoreDoc(player);
              }
            ),
            history: game.history,
            //todo
            currentState: null,
        };
        console.log("_objectToFirestoreDoc game as doc", doc);

        return doc;
    }

    /**
    *
    */
    _createObject(data) {

        const players = data.players.map( p => { return this.playerController._createObject(p) } )

        let game = new Game(players, new WaterManager(0), new FoodManager(0), new WoodManager(0));

        game._id = data._id;

        game._lastRound = data._lastRound;
        game._win = data._win;
        game.history = data.history;

        game._gameTable = new GameTable(players);

        //todo
        return game;
    }
}

export default GameController;
