import {PollManager} from '../model/PollManager'
import {GameTable} from '../model/GameTable'
import Player from '../model/Player'
import LoggedInUser from '../model/LoggedInUser'
import {RoundAction} from '../model/RoundAction'
import {MockPlayer} from './MockPlayer'
import { v1 as uuidv1 } from 'uuid';

let player1 = new Player(new LoggedInUser(1, 'toto'))
let player2 = new Player(new LoggedInUser(2, 'tata'))
let player3 = new Player(new LoggedInUser(3, 'titi'))
const gameTable = new GameTable([player1, player2, player3])
const _poll = new PollManager(gameTable)

const assert = require('assert');


describe('PollManager', function()
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


    it('everybody votes againt playerId #42', () =>
    {
        let player1 = new MockPlayer(new LoggedInUser(1, 'toto'))
        player1._choosePlayerIdToVoteAgainst = 42

        let player2 = new MockPlayer(new LoggedInUser(2, 'tata'))
        player2._choosePlayerIdToVoteAgainst = 42

        let player3 = new MockPlayer(new LoggedInUser(3, 'titi'))
        player3._choosePlayerIdToVoteAgainst = 42

        let player42 = new MockPlayer(new LoggedInUser(42, 'tete'))
        player42._choosePlayerIdToVoteAgainst = 42

        const gameTable = new GameTable([player1, player2, player3, player42])
        const _poll = new PollManager(gameTable)

        assert.equal(_poll.voteWithContext(RoundAction.WaterVote), 42)
    });

    it('2 againt #42 - 1 against #1 - 1 against #2', () =>
    {
        let player1 = new MockPlayer(new LoggedInUser(1, 'toto'))
        player1._choosePlayerIdToVoteAgainst = 42

        let player2 = new MockPlayer(new LoggedInUser(2, 'tata'))
        player2._choosePlayerIdToVoteAgainst = 42

        let player3 = new MockPlayer(new LoggedInUser(3, 'titi'))
        player3._choosePlayerIdToVoteAgainst = 1

        let player42 = new MockPlayer(new LoggedInUser(42, 'tete'))
        player42._choosePlayerIdToVoteAgainst = 2

        const gameTable = new GameTable([player1, player2, player3, player42])
        const _poll = new PollManager(gameTable)

        assert.equal(_poll.voteWithContext(RoundAction.WaterVote), 42)
    });

    it('2 against #42 - 2 against #1 - with #1 votes #42', () =>
    {
        let id1 = uuidv1();
        let id2 = uuidv1();
        let id3 = uuidv1();
        let id42 = uuidv1();

        let player1 = new MockPlayer(new LoggedInUser(id1, 'toto'))
        player1._choosePlayerIdToVoteAgainst = id42
        player1._chooseFinalPlayerIdToVoteAgainst = id42

        let player2 = new MockPlayer(new LoggedInUser(id2, 'tata'))
        player2._choosePlayerIdToVoteAgainst = id42

        let player3 = new MockPlayer(new LoggedInUser(id3, 'titi'))
        player3._choosePlayerIdToVoteAgainst = id1

        let player42 = new MockPlayer(new LoggedInUser(id42, 'tete'))
        player42._choosePlayerIdToVoteAgainst = id1

        const gameTable = new GameTable([player1, player2, player3, player42])
        const _poll = new PollManager(gameTable)

        assert.equal(_poll.voteWithContext(RoundAction.WaterVote), id42)
    });

    it('2 against #42 - 2 against #1 - with #1 votes #1', () =>
    {
        let id1 = uuidv1();
        let id2 = uuidv1();
        let id3 = uuidv1();
        let id42 = uuidv1();

        let player1 = new MockPlayer(new LoggedInUser(id1, 'toto'))
        player1._choosePlayerIdToVoteAgainst = id42
        player1._chooseFinalPlayerIdToVoteAgainst = id1

        let player2 = new MockPlayer(new LoggedInUser(id2, 'tata'))
        player2._choosePlayerIdToVoteAgainst = id42

        let player3 = new MockPlayer(new LoggedInUser(id3, 'titi'))
        player3._choosePlayerIdToVoteAgainst = id1

        let player42 = new MockPlayer(new LoggedInUser(id42, 'tete'))
        player42._choosePlayerIdToVoteAgainst = id1

        const gameTable = new GameTable([player1, player2, player3, player42])
        const _poll = new PollManager(gameTable)

        assert.equal(_poll.voteWithContext(RoundAction.WaterVote), id1)
    });

    it('2 against #42 - 2 against #1 - with #1 votes #2 throws', () =>
    {
        let id1 = uuidv1();
        let id2 = uuidv1();
        let id3 = uuidv1();
        let id42 = uuidv1();

        let player1 = new MockPlayer(new LoggedInUser(id1, 'toto'))
        player1._choosePlayerIdToVoteAgainst = id42
        player1._chooseFinalPlayerIdToVoteAgainst = id2

        let player2 = new MockPlayer(new LoggedInUser(id2, 'tata'))
        player2._choosePlayerIdToVoteAgainst = id42

        let player3 = new MockPlayer(new LoggedInUser(id3, 'titi'))
        player3._choosePlayerIdToVoteAgainst = id1

        let player42 = new MockPlayer(new LoggedInUser(id42, 'tete'))
        player42._choosePlayerIdToVoteAgainst = id1

        const gameTable = new GameTable([player1, player2, player3, player42])
        const _poll = new PollManager(gameTable)

        assert.throws(() => { _polll.vote() })
    });

    it('everybody votes against playerId #42 but all but him are sick', () =>
    {
        let player1 = new MockPlayer(new LoggedInUser(1, 'toto'))
        player1._choosePlayerIdToVoteAgainst = 42
        player1.onGetSick()

        let player2 = new MockPlayer(new LoggedInUser(2, 'tata'))
        player2._choosePlayerIdToVoteAgainst = 42
        player2.onGetSick()

        let player3 = new MockPlayer(new LoggedInUser(3, 'titi'))
        player3._choosePlayerIdToVoteAgainst = 42
        player3.onGetSick()

        let player42 = new MockPlayer(new LoggedInUser(42, 'tete'))
        player42._choosePlayerIdToVoteAgainst = 1

        const gameTable = new GameTable([player1, player2, player3, player42])

        const _poll = new PollManager(gameTable)

        assert.equal(_poll.voteWithContext(RoundAction.WaterVote), 42)
    });

});
