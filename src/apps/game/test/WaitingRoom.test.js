import LoggedInUser from  '../model/LoggedInUser'
import WaitingRoom, {SERDE_KEYS, MIN_NUMBER_PLAYERS, MAX_NUMBER_PLAYERS} from '../model/WaitingRoom'
import Game from '../model/Game'

const assert = require('assert');

describe('WaitingRoom', function()
{
    it('correctly create round', () =>
    {
        let waitingRoom = new WaitingRoom()
    });

    it('add user', () =>
    {
        let waitingRoom = new WaitingRoom()
        let user = new LoggedInUser("toto", "ToTO")
        waitingRoom.addLoggedInUser(user)
        assert.equal(waitingRoom._loggedInUsers.length, 1)
        assert.equal(waitingRoom._loggedInUsers[0], user)
    });

    it('start game with users logged in at this time', () =>
    {
        let waitingRoom = new WaitingRoom()
        for(var i = 0; i < MIN_NUMBER_PLAYERS; i++){
          const userId = 'toto' + i;
          const user = new LoggedInUser(userId, "ToTO");
          waitingRoom.addLoggedInUser(user);
        }

        waitingRoom.startGame()

        assert.equal(waitingRoom._currentGame.playersCount, MIN_NUMBER_PLAYERS)

        let userIsLate = new LoggedInUser("tototheplusone", "ToTO")
        waitingRoom.addLoggedInUser(userIsLate)
        assert.equal(waitingRoom._loggedInUsers.length, MIN_NUMBER_PLAYERS+1)

        assert.equal(waitingRoom._currentGame.playersCount, MIN_NUMBER_PLAYERS)
    });

    it('game is null before starts', () =>
    {
        let waitingRoom = new WaitingRoom()

        for(var i = 0; i < MIN_NUMBER_PLAYERS; i++){
          const userId = 'toto' + i;
          const user = new LoggedInUser(userId, "ToTO");
          waitingRoom.addLoggedInUser(user);
        }

        assert(waitingRoom._currentGame == null)
        waitingRoom.startGame()
        assert(waitingRoom._currentGame != null)
    });

    it('game does not start with less that ' + MIN_NUMBER_PLAYERS + 'players', () =>
    {
        let waitingRoom = new WaitingRoom()

        assert(waitingRoom._currentGame == null)

        for(var i = 1;i < MIN_NUMBER_PLAYERS;  i++){
          let user = new LoggedInUser(`toto${i}`, "ToTO")
            waitingRoom.addLoggedInUser(user);
        }
        waitingRoom.startGame()
        assert.equal(waitingRoom._currentGame, null)
    });

    it('game starts with players between ' + MIN_NUMBER_PLAYERS + ' and ' + MAX_NUMBER_PLAYERS, () =>
    {
        let waitingRoom = new WaitingRoom()

        assert(waitingRoom._currentGame == null);
        for(var i = 0; i < MAX_NUMBER_PLAYERS; i++){
          const userId = 'toto' + i;
          const user = new LoggedInUser(userId, "ToTO");
          waitingRoom.addLoggedInUser(user);
        }

        waitingRoom.startGame()
        assert(waitingRoom._currentGame != null)
    });

    it('rejects loggedInUser if over quota = ' + MAX_NUMBER_PLAYERS, () =>
    {
        let waitingRoom = new WaitingRoom()

        assert(waitingRoom._currentGame == null);
        for(var i = 0; i < MAX_NUMBER_PLAYERS; i++){
          const userId = 'toto' + i;
          const user = new LoggedInUser(userId, "ToTO");
          waitingRoom.addLoggedInUser(user);
        }

        const user = new LoggedInUser("userCannotEnter", "ToTO");
        let res = waitingRoom.addLoggedInUser(user);
        assert.equal(res, false);
    });

    it('doc convertion is valid', () =>
    {
        let waitingRoom = new WaitingRoom()

        assert(waitingRoom._currentGame == null);
        for(var i = 0; i < MAX_NUMBER_PLAYERS; i++){
          const userId = 'toto' + i;
          const user = new LoggedInUser(userId, "ToTO");
          waitingRoom.addLoggedInUser(user);
        }

        waitingRoom.startGame()
        const doc = waitingRoom.toDoc();
        assert.deepEqual(Object.keys(doc), SERDE_KEYS);
        assert.equal(doc['_id'], waitingRoom._id);
        assert.equal(doc['slugname'], waitingRoom.slugname);
        assert.deepEqual(doc['_loggedInUsers'], waitingRoom._loggedInUsers.map((u) => {return u.toDoc()}));
        assert.deepEqual(doc['_currentGame'], waitingRoom._currentGame.toDoc());
    });

    it('intantiate from doc object', () =>
    {
        let waitingRoom = new WaitingRoom()
        let listLoggedInUsers = [];
        for(var i = 0; i < MAX_NUMBER_PLAYERS; i++){
          const user = new LoggedInUser(`toto${i}`, "ToTO");
          listLoggedInUsers.push(user);
          waitingRoom.addLoggedInUser(user);
        }
        waitingRoom.startGame()

        const doc = {
          _id: "hello",
          slugname: "slug",
          _loggedInUsers: listLoggedInUsers.map( u => {return u.toDoc();}),
          _currentGame: waitingRoom._currentGame.toDoc(),
        }

        let waitingRoom2 = WaitingRoom.fromDoc(doc);
        assert.equal(doc['_id'], waitingRoom2._id);
        assert.equal(doc['slugname'], waitingRoom2.slugname);
        assert.deepEqual(listLoggedInUsers, waitingRoom2._loggedInUsers);
        assert.deepEqual(waitingRoom._currentGame.toDoc(), waitingRoom2._currentGame.toDoc());
        //todo
        // assert.deepEqual(waitingRoom._currentGame, waitingRoom2._currentGame);


    });

});
