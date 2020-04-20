import {PollingSystem} from '../model/PollingSystem'
import {GameTable} from '../model/GameTable'
import Player from '../model/Player'


const assert = require('assert');
let player1 = new Player(1, false, false, null)
let player2 = new Player(2, false, false, null)
let player3 = new Player(3, false, false, null)
const gameTable = new GameTable([player1, player2, player3])
const _poll = new PollingSystem(gameTable)

describe('GameTable', function() 
{
    it('init 3 players polling system', () => 
    {
        let initialPolls = _poll._initVotingPolls()
        assert.equal(Object.keys(initialPolls).length, 3)

        assert.equal(1 in initialPolls, true)
        assert.equal(initialPolls[1], 0)

        assert.equal(2 in initialPolls, true)
        assert.equal(initialPolls[2], 0)

        assert.equal(3 in initialPolls, true)
        assert.equal(initialPolls[3], 0)
    });

    it('get unique player with max votes', () => 
    {
        let votes = {}
        votes[1] =  2
        votes[2] =  1
        votes[3] =  0
        let playerWithMaxVote = PollingSystem._getSittingPlayersWithMaxVote(votes)
        assert.equal(playerWithMaxVote.length, 1)
        assert.equal(playerWithMaxVote[0], 1)
    });

    it('get multiple players with max votes', () => 
    {
        let votes = {}
        votes[1] =  1
        votes[2] =  1
        votes[3] =  0
        let playerWithMaxVote = PollingSystem._getSittingPlayersWithMaxVote(votes)
        assert.equal(playerWithMaxVote.length, 2)
        assert.equal(playerWithMaxVote[0], 1)
        assert.equal(playerWithMaxVote[1], 2)
    });
});