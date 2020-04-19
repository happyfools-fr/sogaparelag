import {GameTable} from '../components/apps/GameTable'

const assert = require('assert');
    

describe('GameTable', function() {
    it('init 1 player game without crashing', () => 
    {
        let player1Id = 1;
        const _gameTable = new GameTable([player1Id])
    });

    it('correctly init 1 player game', () => 
    {
        let player1Id = 1;
        const gameTable = new GameTable([player1Id])
        assert.equal(gameTable._playersCount, 1)

        let firstPlayer = gameTable._headPlayer
        assert.equal(firstPlayer._playerId, 1)
        assert.equal(firstPlayer._nextPlayer._playerId, 1)
        assert.equal(firstPlayer._previousPlayer._playerId, 1)
    });
    
    it('init 3 players game without crashing', () => 
    {
        let player1Id = 1;
        let player2Id = 2;
        let player3Id = 3;
        const gameTable = new GameTable([player1Id, player2Id, player3Id])
    });

    it('correctly init 3 players game', () => 
    {
        let player1Id = 1;
        let player2Id = 2;
        let player3Id = 3;
        const gameTable = new GameTable([player1Id, player2Id, player3Id])
        assert.equal(gameTable._playersCount, 3)

        let firstPlayer = gameTable._headPlayer
        assert.equal(firstPlayer._playerId, 1)
        assert.equal(firstPlayer._nextPlayer._playerId, 2)
        assert.equal(firstPlayer._previousPlayer._playerId, 3)

        let secondPlayer = firstPlayer._nextPlayer
        assert.equal(secondPlayer._playerId, 2)
        assert.equal(secondPlayer._nextPlayer._playerId, 3)
        assert.equal(secondPlayer._previousPlayer._playerId, 1)

        let thirdPlayer = secondPlayer._nextPlayer
        assert.equal(thirdPlayer._playerId, 3)
        assert.equal(thirdPlayer._nextPlayer._playerId, 1)
        assert.equal(thirdPlayer._previousPlayer._playerId, 2)
    });

    it('should correctly enumerate over players', () => 
    {
        let player1Id = 1;
        let player2Id = 2;
        let player3Id = 3;
        const gameTable = new GameTable([player1Id, player2Id, player3Id])
        
        let enumerator = gameTable.getPlayerEnumerator()
        let expectedId = 1
        while (true)
        {
            let currentPlayerId = enumerator.next()
            if (currentPlayerId.done)
                break
            assert.equal(currentPlayerId.value._playerId, expectedId)
            expectedId++
        }
    });

    it('head player should be first in array at init', () => 
    {
        let player1Id = 1;
        let player2Id = 2;
        let player3Id = 3;
        const gameTable = new GameTable([player1Id, player2Id, player3Id])
        assert.equal(gameTable._headPlayer._playerId, 1)
    });

    it('head player should be given reverse game order', () => 
    {
        let player1Id = 1;
        let player2Id = 2;
        let player3Id = 3;
        const gameTable = new GameTable([player1Id, player2Id, player3Id])
        gameTable.assignNextHeadPlayer()
        assert.equal(gameTable._headPlayer._playerId, 3)
    });

    it('kill player 1 should remove him from the table', () => 
    {
        let player1Id = 1;
        let player2Id = 2;
        let player3Id = 3;
        const gameTable = new GameTable([player1Id, player2Id, player3Id])
        assert.equal(gameTable.killPlayer(1), true)
        assert.equal(gameTable._playersCount, 2)
    });

    it('kill player 1 should adjust game relations and give PlayingButton to next so that it would go to player 3 in that case', () => 
    {
        let player1Id = 1;
        let player2Id = 2;
        let player3Id = 3;
        const gameTable = new GameTable([player1Id, player2Id, player3Id])
        gameTable.killPlayer(1)
        assert.equal(gameTable._playersCount, 2)

        let firstPlayer = gameTable._headPlayer
        assert.equal(firstPlayer._playerId, 2)
        assert.equal(firstPlayer._nextPlayer._playerId, 3)
        assert.equal(firstPlayer._previousPlayer._playerId, 3)

        let secondPlayer = firstPlayer._nextPlayer
        assert.equal(secondPlayer._playerId, 3)
        assert.equal(secondPlayer._nextPlayer._playerId, 2)
        assert.equal(secondPlayer._previousPlayer._playerId, 2)
    });

    it('kill player 2 should adjust game relations and do not change HeadPlayer', () => 
    {
        let player1Id = 1;
        let player2Id = 2;
        let player3Id = 3;
        const gameTable = new GameTable([player1Id, player2Id, player3Id])
        gameTable.killPlayer(2)
        assert.equal(gameTable._playersCount, 2)

        let firstPlayer = gameTable._headPlayer
        assert.equal(firstPlayer._playerId, 1)
        assert.equal(firstPlayer._nextPlayer._playerId, 3)
        assert.equal(firstPlayer._previousPlayer._playerId, 3)

        let secondPlayer = firstPlayer._nextPlayer
        assert.equal(secondPlayer._playerId, 3)
        assert.equal(secondPlayer._nextPlayer._playerId, 1)
        assert.equal(secondPlayer._previousPlayer._playerId, 1)
    });

    it('kill unknown player should answer false and nothing has changed', () => 
    {
        let player1Id = 1;
        let player2Id = 2;
        let player3Id = 3;
        const gameTable = new GameTable([player1Id, player2Id, player3Id])
        assert.equal(gameTable.killPlayer(4), false)
        assert.equal(gameTable._playersCount, 3)

        let firstPlayer = gameTable._headPlayer
        assert.equal(firstPlayer._playerId, 1)
        assert.equal(firstPlayer._nextPlayer._playerId, 2)
        assert.equal(firstPlayer._previousPlayer._playerId, 3)

        let secondPlayer = firstPlayer._nextPlayer
        assert.equal(secondPlayer._playerId, 2)
        assert.equal(secondPlayer._nextPlayer._playerId, 3)
        assert.equal(secondPlayer._previousPlayer._playerId, 1)

        let thirdPlayer = secondPlayer._nextPlayer
        assert.equal(thirdPlayer._playerId, 3)
        assert.equal(thirdPlayer._nextPlayer._playerId, 1)
        assert.equal(thirdPlayer._previousPlayer._playerId, 2)
    });
});