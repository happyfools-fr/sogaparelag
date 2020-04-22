import {MockLoggedInUser} from './MockLoggedInUser'
import {WaitingRoom} from '../model/WaitingRoom'
import {Game2} from '../model/Game2'

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
        let user = new MockLoggedInUser("toto", "ToTO")
        waitingRoom.addLoggedInPlayer(user)
        assert.equal(waitingRoom._loggedInUsers.length, 1)
        assert.equal(waitingRoom._loggedInUsers[0], user)
    });

    it('start game with users logged in at this time', () =>
    {
        let waitingRoom = new WaitingRoom()
        let user1 = new MockLoggedInUser("toto1", "ToTO")
        waitingRoom.addLoggedInPlayer(user1)

        let user2 = new MockLoggedInUser("toto2", "ToTO")
        waitingRoom.addLoggedInPlayer(user2)

        waitingRoom.startGame()

        assert.equal(waitingRoom._currentGame.playersCount, 2)

        let user3 = new MockLoggedInUser("toto3", "ToTO")
        waitingRoom.addLoggedInPlayer(user3)
        assert.equal(waitingRoom._loggedInUsers.length, 3)

        assert.equal(waitingRoom._currentGame.playersCount, 2)
    });

    it('game is null before starts', () =>
    {
        let waitingRoom = new WaitingRoom()

        assert(waitingRoom._currentGame == null)
        waitingRoom.startGame()
        assert(waitingRoom._currentGame != null)
    });


});
