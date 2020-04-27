import Player from '../model/Player'
import SittingPlayer, {SERDE_KEYS} from '../model/SittingPlayer'
import LoggedInUser from '../model/LoggedInUser'

const assert = require('assert');


describe('SittingPlayer', function()
{

    it('should convert to doc object', () =>
    {
      const loggedInUser1 = new LoggedInUser('fake-uid1', 'fake-displayName');
      const loggedInUser2 = new LoggedInUser('fake-uid2', 'fake-displayName');
      const loggedInUser3 = new LoggedInUser('fake-uid3', 'fake-displayName');

      const _player1 = new Player(loggedInUser1);
      const _player2 = new Player(loggedInUser2);
      const _player3 = new Player(loggedInUser3);

      const _sittingPlayer = new SittingPlayer(_player2)
      _sittingPlayer._next = _player3
      _sittingPlayer._previous = _player1

      const doc = _sittingPlayer.toDoc()
      assert.deepEqual(SERDE_KEYS, Object.keys(doc));
      assert.deepEqual(doc['_player'], _player2.toDoc());
      assert.deepEqual(doc['_next'], _player3.toDoc());
      assert.deepEqual(doc['_previous'], _player1.toDoc());
    });
    
    it('should instantiate correctly from doc object', () =>
    {
      
      const loggedInUser1 = new LoggedInUser('fake-uid1', 'fake-displayName');
      const loggedInUser2 = new LoggedInUser('fake-uid2', 'fake-displayName');
      const loggedInUser3 = new LoggedInUser('fake-uid3', 'fake-displayName');

      const _player1 = new Player(loggedInUser1);
      const _player2 = new Player(loggedInUser2);
      const _player3 = new Player(loggedInUser3);
      
      const doc = {
        _previous: _player1.toDoc(),
        _player: _player2.toDoc(),
        _next: _player3.toDoc(),
      };
      
      const _sittingPlayer = new SittingPlayer()
      _sittingPlayer.fromDoc(doc);
      assert.deepEqual(_player1, _sittingPlayer._previous);
      assert.deepEqual(_player2, _sittingPlayer._player);
      assert.deepEqual(_player3, _sittingPlayer._next);

    });
});