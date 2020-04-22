import {Player} from '../model/Player'
import {MockLoggedInUser} from './MockLoggedInUser'
import {RoundAction} from '../model/RoundAction'

const assert = require('assert');

const loggedInUser = new MockLoggedInUser('fake-uid', 'fake-displayName');

describe('Player', function() 
{
    it('_sickenessLevel attribute is initialized to 0', () => 
    {
        const _player = new Player(loggedInUser);
        assert.equal(_player._sickenessLevel, 0);
    });

    it('_sickenessLevel attribute is set to 2 with onGetSick', () => 
    {
        const _player = new Player(loggedInUser);
        assert.equal(_player._sickenessLevel, 0);
        _player.onGetSick();
        assert(_player.isSick);
        assert.equal(_player._sickenessLevel, 2);
    });

    it('_sickenessLevel attribute is decremented with onEndOfRound', () => 
    {
        const _player = new Player(loggedInUser);
        assert.equal(_player._sickenessLevel, 0);
        _player.onGetSick();
        assert.equal(_player._sickenessLevel, 2);
        _player.onRoundEnded();
        assert.equal(_player._sickenessLevel, 1);
        _player.onRoundEnded();
        assert.equal(_player._sickenessLevel, 0);
        _player.onRoundEnded();
        assert.equal(_player._sickenessLevel, 0);
    });

    it('vote against first playerId', () => 
    {
        const _player = new Player(loggedInUser);
        let players = [5, 4, 3, 2, 1]
        assert.equal(_player.choosePlayerIdToVoteAgainst(players), 5)
    });

    it('final vote against first playerId', () => 
    {
        const _player = new Player(loggedInUser);
        let players = [5, 4, 3, 2, 1]
        assert.equal(_player.chooseFinalPlayerIdToVoteAgainst(players), 5)
    });

    it('action should always be to collect food', () => 
    {
        const _player = new Player(loggedInUser);
        assert.equal(_player.chooseActionToPerform(), RoundAction.CollectFood)
    });
});
