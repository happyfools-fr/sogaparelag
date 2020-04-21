import {Player} from '../model/Player'
import {MockLoggedInUser} from './MockLoggedInUser'
const assert = require('assert');

const loggedInUser = new MockLoggedInUser('fake-uid', 'fake-displayName');

describe('Player', function() 
{
    it('has _sickenessLevel is initialized to 0', () => 
    {
        const _player = new Player(loggedInUser);
        assert.equal(_player._sickenessLevel, 0);
    });

    it('has _sickenessLevel is set to 2 with onGetSick', () => 
    {
        const _player = new Player(loggedInUser);
        assert.equal(_player._sickenessLevel, 0);
        _player.onGetSick();
        assert(_player.isSick);
        assert.equal(_player._sickenessLevel, 2);
    });


    it('has _sickenessLevel is decremented with onEndOfRound', () => 
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
});
