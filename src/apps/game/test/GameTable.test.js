import {GameTable} from '../model/GameTable'
import Player from '../model/Player';

const assert = require('assert');
    

describe('GameTable', function() 
{
    it('init 1 player game without crashing', () => 
    {
        let player1 = new Player(1, false, false, null)
        const _gameTable = new GameTable([player1])
    });

    it('correctly init 1 player game', () => 
    {
        let player1 = new Player(1, false, false, null)
        const gameTable = new GameTable([player1])
        assert.equal(gameTable._playersCount, 1)

        let firstPlayer = gameTable.headSittingPlayer
        assert.equal(firstPlayer.id, 1)
        assert.equal(firstPlayer.next.id, 1)
        assert.equal(firstPlayer.previous.id, 1)
    });
    
    it('init 3 players game without crashing', () => 
    {
        let player1 = new Player(1, false, false, null)
        let player2 = new Player(2, false, false, null)
        let player3 = new Player(3, false, false, null)
        const gameTable = new GameTable([player1, player2, player3])
    });

    it('correctly init 3 players game', () => 
    {
        let player1 = new Player(1, false, false, null)
        let player2 = new Player(2, false, false, null)
        let player3 = new Player(3, false, false, null)
        const gameTable = new GameTable([player1, player2, player3])
        assert.equal(gameTable._playersCount, 3)

        let firstPlayer = gameTable.headSittingPlayer
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
        let player1 = new Player(1, false, false, null)
        let player2 = new Player(2, false, false, null)
        let player3 = new Player(3, false, false, null)
        const gameTable = new GameTable([player1, player2, player3])

        let enumerator = gameTable.getSittingPlayerEnumerator()
        let expectedId = 1
        while (true)
        {
            let currentPlayerId = enumerator.next()
            if (currentPlayerId.done)
                break

            assert.equal(currentPlayerId.value.id, expectedId)
            expectedId++
        }
    });

    it('head player should be first in array at init', () => 
    {
        let player1 = new Player(1, false, false, null)
        let player2 = new Player(2, false, false, null)
        let player3 = new Player(3, false, false, null)
        const gameTable = new GameTable([player1, player2, player3])
        
        assert.equal(gameTable.headSittingPlayer.id, 1)
    });

    it('head player should be given reverse game order', () => 
    {
        let player1 = new Player(1, false, false, null)
        let player2 = new Player(2, false, false, null)
        let player3 = new Player(3, false, false, null)
        const gameTable = new GameTable([player1, player2, player3])
        
        gameTable.assignNextHeadSittingPlayer()
        assert.equal(gameTable.headSittingPlayer.id, 3)
    });

    it('kill player 1 should remove him from the table', () => 
    {
        let player1 = new Player(1, false, false, null)
        let player2 = new Player(2, false, false, null)
        let player3 = new Player(3, false, false, null)
        const gameTable = new GameTable([player1, player2, player3])
        
        assert.equal(gameTable.killSittingPlayer(1), true)
        assert.equal(gameTable._playersCount, 2)
    });

    it('kill player 1 should adjust game relations and give PlayingButton to next so that it would go to player 3 in that case', () => 
    {
        let player1 = new Player(1, false, false, null)
        let player2 = new Player(2, false, false, null)
        let player3 = new Player(3, false, false, null)
        const gameTable = new GameTable([player1, player2, player3])
        
        gameTable.killSittingPlayer(1)
        assert.equal(gameTable._playersCount, 2)

        let firstPlayer = gameTable.headSittingPlayer
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
        let player1 = new Player(1, false, false, null)
        let player2 = new Player(2, false, false, null)
        let player3 = new Player(3, false, false, null)
        const gameTable = new GameTable([player1, player2, player3])
        
        gameTable.killSittingPlayer(2)
        assert.equal(gameTable._playersCount, 2)

        let firstPlayer = gameTable.headSittingPlayer
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
        let player1 = new Player(1, false, false, null)
        let player2 = new Player(2, false, false, null)
        let player3 = new Player(3, false, false, null)
        const gameTable = new GameTable([player1, player2, player3])
        
        assert.equal(gameTable.killSittingPlayer(4), false)
        assert.equal(gameTable._playersCount, 3)

        let firstPlayer = gameTable.headSittingPlayer
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