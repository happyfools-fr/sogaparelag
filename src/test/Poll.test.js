import {PollingSystem} from '../components/apps/PollingSystem'
import {GameTable} from '../components/apps/GameTable'


const assert = require('assert');
const _player1Id = 1;
const _player2Id = 2;
const _player3Id = 3;
const _gameTable = new GameTable([_player1Id, _player2Id, _player3Id])
const _poll = new PollingSystem(_gameTable)

describe('GameTable', function() 
{
    it('init 3 players polling system', () => 
    {
        let initialPolls = _poll._initVotingPolls()
        assert.equal(Object.keys(initialPolls).length, 3)

        assert.equal(_player1Id in initialPolls, true)
        assert.equal(initialPolls[_player1Id], 0)

        assert.equal(_player2Id in initialPolls, true)
        assert.equal(initialPolls[_player2Id], 0)

        assert.equal(_player3Id in initialPolls, true)
        assert.equal(initialPolls[_player3Id], 0)
    });

    it('get unique player with max votes', () => 
    {
        let votes = {}
        votes[_player1Id] =  2
        votes[_player2Id] =  1
        votes[_player3Id] =  0
        let playerWithMaxVote = _poll._getPlayersWithMaxVote(votes)
        assert.equal(playerWithMaxVote.length, 1)
        assert.equal(playerWithMaxVote[0], 1)
    });

    it('get multiple players with max votes', () => 
    {
        let votes = {}
        votes[_player1Id] =  1
        votes[_player2Id] =  1
        votes[_player3Id] =  0
        let playerWithMaxVote = _poll._getPlayersWithMaxVote(votes)
        assert.equal(playerWithMaxVote.length, 2)
        assert.equal(playerWithMaxVote[0], 1)
        assert.equal(playerWithMaxVote[1], 2)
    });
});