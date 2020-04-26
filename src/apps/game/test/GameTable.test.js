import {GameTable} from '../model/GameTable'
import Player from '../model/Player';
import LoggedInUser from '../model/LoggedInUser'


const user1 = new LoggedInUser(1, 'toto')
const user2 = new LoggedInUser(2, 'tata')
const user3 = new LoggedInUser(3, 'titi')

const assert = require('assert');


describe('GameTable', function()
{
    it('init 1 player game without crashing', () =>
    {
        let player1 = new Player(user1)
        const _gameTable = new GameTable([player1])
    });

    it('correctly init 1 player game', () =>
    {
        let player1 = new Player(user1)
        const gameTable = new GameTable([player1])
        assert.equal(gameTable.playersCount, 1)

        let firstPlayer = gameTable._headPlayer
        assert.equal(firstPlayer.id, 1)
        assert.equal(firstPlayer.next.id, 1)
        assert.equal(firstPlayer.previous.id, 1)
    });

    it('init 3 players game without crashing', () =>
    {
        let player1 = new Player(user1)
        let player2 = new Player(user2)
        let player3 = new Player(user3)
        const gameTable = new GameTable([player1, player2, player3])
    });

    it('correctly init 3 players game', () =>
    {
        let player1 = new Player(user1)
        let player2 = new Player(user2)
        let player3 = new Player(user3)
        const gameTable = new GameTable([player1, player2, player3])
        assert.equal(gameTable.playersCount, 3)

        let firstPlayer = gameTable._headPlayer
        assert.equal(firstPlayer.id, 1)
        assert.equal(firstPlayer.next.id, 2)
        assert.equal(firstPlayer.previous.id, 3)

        let secondPlayer = firstPlayer.next
        assert.equal(secondPlayer.id, 2)
        assert.equal(secondPlayer.next.id, 3)
        assert.equal(secondPlayer.previous.id, 1)

        let thirdPlayer = secondPlayer.next
        assert.equal(thirdPlayer.id, 3)
        assert.equal(thirdPlayer.next.id, 1)
        assert.equal(thirdPlayer.previous.id, 2)
    });

    it('should correctly enumerate over players', () =>
    {
        let player1 = new Player(user1)
        let player2 = new Player(user2)
        let player3 = new Player(user3)
        const gameTable = new GameTable([player1, player2, player3])

        let enumerator = gameTable.getPlayerEnumerator()
        let currentPlayerId = enumerator.next()
        assert.equal(currentPlayerId.done, false)
        assert.equal(currentPlayerId.value.id, 1)

        currentPlayerId = enumerator.next()
        assert.equal(currentPlayerId.done, false)
        assert.equal(currentPlayerId.value.id, 2)

        currentPlayerId = enumerator.next()
        assert.equal(currentPlayerId.done, false)
        assert.equal(currentPlayerId.value.id, 3)

        currentPlayerId = enumerator.next()
        assert.equal(currentPlayerId.done, true)
    });

    it('should correctly enumerate over healthy players', () =>
    {
        let player1 = new Player(user1)
        let player2 = new Player(user2)
        player2._sickenessLevel = 2
        let player3 = new Player(user3)
        const gameTable = new GameTable([player1, player2, player3])

        let enumerator = gameTable.getHealthyPlayerEnumerator()
        let currentPlayerId = enumerator.next()
        assert.equal(currentPlayerId.done, false)
        assert.equal(currentPlayerId.value.id, 1)

        currentPlayerId = enumerator.next()
        assert.equal(currentPlayerId.done, false)
        assert.equal(currentPlayerId.value.id, 3)

        currentPlayerId = enumerator.next()
        assert.equal(currentPlayerId.done, true)
    });

    it('head player should be first in array at init', () =>
    {
        let player1 = new Player(user1)
        let player2 = new Player(user2)
        let player3 = new Player(user3)
        const gameTable = new GameTable([player1, player2, player3])

        assert.equal(gameTable._headPlayer.id, 1)
    });

    it('head player should be given reverse game order', () =>
    {
        let player1 = new Player(user1)
        let player2 = new Player(user2)
        let player3 = new Player(user3)
        const gameTable = new GameTable([player1, player2, player3])

        gameTable.assignNextHeadPlayer()
        assert.equal(gameTable._headPlayer.id, 3)
    });

    it('kill player 1 should remove him from the table', () =>
    {
        let player1 = new Player(user1)
        let player2 = new Player(user2)
        let player3 = new Player(user3)
        const gameTable = new GameTable([player1, player2, player3])

        assert.equal(gameTable.killPlayer(1), true)
        assert.equal(gameTable.playersCount, 2)
    });

    it('kill player 1 should adjust game relations and give PlayingButton to next so that it would go to player 3 in that case', () =>
    {
        let player1 = new Player(user1)
        let player2 = new Player(user2)
        let player3 = new Player(user3)
        const gameTable = new GameTable([player1, player2, player3])

        gameTable.killPlayer(1)
        assert.equal(gameTable.playersCount, 2)

        let firstPlayer = gameTable._headPlayer
        assert.equal(firstPlayer.id, 2)
        assert.equal(firstPlayer.next.id, 3)
        assert.equal(firstPlayer.previous.id, 3)

        let secondPlayer = firstPlayer.next
        assert.equal(secondPlayer.id, 3)
        assert.equal(secondPlayer.next.id, 2)
        assert.equal(secondPlayer.previous.id, 2)
    });

    it('kill player 2 should adjust game relations and do not change HeadPlayer', () =>
    {
        let player1 = new Player(user1)
        let player2 = new Player(user2)
        let player3 = new Player(user3)
        const gameTable = new GameTable([player1, player2, player3])

        gameTable.killPlayer(2)
        assert.equal(gameTable.playersCount, 2)

        let firstPlayer = gameTable._headPlayer
        assert.equal(firstPlayer.id, 1)
        assert.equal(firstPlayer.next.id, 3)
        assert.equal(firstPlayer.previous.id, 3)

        let secondPlayer = firstPlayer.next
        assert.equal(secondPlayer.id, 3)
        assert.equal(secondPlayer.next.id, 1)
        assert.equal(secondPlayer.previous.id, 1)
    });

    it('kill unknown player should answer false and nothing has changed', () =>
    {
        let player1 = new Player(user1)
        let player2 = new Player(user2)
        let player3 = new Player(user3)
        const gameTable = new GameTable([player1, player2, player3])

        assert.equal(gameTable.killPlayer(4), false)
        assert.equal(gameTable.playersCount, 3)

        let firstPlayer = gameTable._headPlayer
        assert.equal(firstPlayer.id, 1)
        assert.equal(firstPlayer.next.id, 2)
        assert.equal(firstPlayer.previous.id, 3)

        let secondPlayer = firstPlayer.next
        assert.equal(secondPlayer.id, 2)
        assert.equal(secondPlayer.next.id, 3)
        assert.equal(secondPlayer.previous.id, 1)

        let thirdPlayer = secondPlayer.next
        assert.equal(thirdPlayer.id, 3)
        assert.equal(thirdPlayer.next.id, 1)
        assert.equal(thirdPlayer.previous.id, 2)
    });

});
