import {PollManager} from '../model/PollManager'
import {GameTable} from '../model/GameTable'
import {Player} from '../model/Player'
import {MockLoggedInUser} from './MockLoggedInUser'

let player1 = new Player(new MockLoggedInUser(1, 'toto'))
let player2 = new Player(new MockLoggedInUser(2, 'tata'))
let player3 = new Player(new MockLoggedInUser(3, 'titi'))
const gameTable = new GameTable([player1, player2, player3])
const _poll = new PollManager(gameTable)

const assert = require('assert');


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
        let playerWithMaxVote = _poll._getPlayerIdsWithMaxVote(votes)
        assert.equal(playerWithMaxVote.length, 1)
        assert.equal(playerWithMaxVote[0], 1)
    });

    it('get multiple players with max votes', () => 
    {
        let votes = {}
        votes[1] =  1
        votes[2] =  1
        votes[3] =  0
        let playerWithMaxVote = _poll._getPlayerIdsWithMaxVote(votes)
        assert.equal(playerWithMaxVote.length, 2)
        assert.equal(playerWithMaxVote[0], 1)
        assert.equal(playerWithMaxVote[1], 2)
    });
});