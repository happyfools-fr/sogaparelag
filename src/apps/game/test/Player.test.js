import Player from '../model/Player'
import LoggedInUser from '../model/LoggedInUser'
import {RoundAction} from '../model/RoundAction'

const assert = require('assert');

const loggedInUser = new LoggedInUser('fake-uid', 'fake-displayName');

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

    it('additionalRequest for wood is 0', () =>
    {
        const _player = new Player(loggedInUser);
        assert.equal(_player.additionalWoodRequest(), 0)
    });
    
    it('should convert to doc object', () =>
    {
        const _player = new Player(loggedInUser);
        const doc = _player.toDoc()
        this.userId = doc['userId'];
        this.nickname = doc['nickname'];
        this._sickenessLevel = doc['_sickenessLevel'];
        this.isDead = doc['isDead'];
        this.currentHand = doc['currentHand'];
        assert.deepEqual(Object.keys(doc), 
        [
          'userId', 'nickname', '_sickenessLevel', 'isDead', 'currentHand'
        ]);
        assert.equal(doc['userId'], _player.userId);
        assert.equal(doc['nickname'], _player.nickname);
        assert.equal(doc['_sickenessLevel'], _player._sickenessLevel);
        assert.equal(doc['isDead'], _player.isDead);
        assert.deepEqual(doc['currentHand'], _player.currentHand);
    });
    
    it('should instantiate correctly from doc object', () =>
    {
        const doc = {
            userId: 'dfg',
            nickname: 'fdg',
            _sickenessLevel: 2,
            isDead: true,
            currentHand: [2, 4],
        };
        const _player = Player.fromDoc(doc);
        assert.equal(doc['userId'], _player.userId);
        assert.equal(doc['nickname'], _player.nickname);
        assert.equal(doc['_sickenessLevel'], _player._sickenessLevel);
        assert.equal(doc['isDead'], _player.isDead);
        assert.deepEqual(doc['currentHand'], _player.currentHand);
    });
});
