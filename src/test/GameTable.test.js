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

        let firstPlayer = gameTable._playingPlayer
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

        let firstPlayer = gameTable._playingPlayer
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