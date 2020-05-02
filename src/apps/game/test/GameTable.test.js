import {GameTable} from '../model/GameTable'
import Player from '../model/Player';
import LoggedInUser from '../model/LoggedInUser'
import SittingPlayer from '../model/SittingPlayer'
import {SERDE_KEYS} from '../model/GameTable'
import {MIN_NUMBER_PLAYERS, MAX_NUMBER_PLAYERS} from '../model/WaitingRoom'

const user1 = new LoggedInUser(1, 'toto')
const user2 = new LoggedInUser(2, 'tata')
const user3 = new LoggedInUser(3, 'titi')

const assert = require('assert');


describe('GameTable', function()
{
    it('init 1 player game without crashing', () =>
    {
        let player1 = new Player(user1)
        const _gameTable = new GameTable([player1])
    });

    it('correctly init 1 player game', () =>
    {
        let player1 = new Player(user1)
        const gameTable = new GameTable([player1])
        assert.equal(gameTable.playersCount, 1)

        let firstPlayer = gameTable._headPlayer
        assert.equal(firstPlayer.id, 1)
        assert.equal(firstPlayer.next.id, 1)
        assert.equal(firstPlayer.previous.id, 1)
    });

    it('init 3 players game without crashing', () =>
    {
        let player1 = new Player(user1)
        let player2 = new Player(user2)
        let player3 = new Player(user3)
        const gameTable = new GameTable([player1, player2, player3])
    });

    it('correctly init 3 players game', () =>
    {
        let player1 = new Player(user1)
        let player2 = new Player(user2)
        let player3 = new Player(user3)
        const gameTable = new GameTable([player1, player2, player3])
        assert.equal(gameTable.playersCount, 3)

        let firstPlayer = gameTable._headPlayer
        assert.equal(firstPlayer.id, 1)
        assert.equal(firstPlayer.next.id, 2)
        assert.equal(firstPlayer.previous.id, 3)

        let secondPlayer = firstPlayer.next
        assert.equal(secondPlayer.id, 2)
        assert.equal(secondPlayer.next.id, 3)
        assert.equal(secondPlayer.previous.id, 1)

        let thirdPlayer = secondPlayer.next
        assert.equal(thirdPlayer.id, 3)
        assert.equal(thirdPlayer.next.id, 1)
        assert.equal(thirdPlayer.previous.id, 2)
    });

    it('should correctly enumerate over players', () =>
    {
        let player1 = new Player(user1)
        let player2 = new Player(user2)
        let player3 = new Player(user3)
        const gameTable = new GameTable([player1, player2, player3])

        let enumerator = gameTable.getPlayerEnumerator()
        let currentPlayerId = enumerator.next()
        assert.equal(currentPlayerId.done, false)
        assert.equal(currentPlayerId.value.id, 1)

        currentPlayerId = enumerator.next()
        assert.equal(currentPlayerId.done, false)
        assert.equal(currentPlayerId.value.id, 2)

        currentPlayerId = enumerator.next()
        assert.equal(currentPlayerId.done, false)
        assert.equal(currentPlayerId.value.id, 3)

        currentPlayerId = enumerator.next()
        assert.equal(currentPlayerId.done, true)
    });

    it('should correctly enumerate over healthy players', () =>
    {
        let player1 = new Player(user1)
        let player2 = new Player(user2)
        player2._sickenessLevel = 2
        let player3 = new Player(user3)
        const gameTable = new GameTable([player1, player2, player3])

        let enumerator = gameTable.getHealthyPlayerEnumerator()
        let currentPlayerId = enumerator.next()
        assert.equal(currentPlayerId.done, false)
        assert.equal(currentPlayerId.value.id, 1)

        currentPlayerId = enumerator.next()
        assert.equal(currentPlayerId.done, false)
        assert.equal(currentPlayerId.value.id, 3)

        currentPlayerId = enumerator.next()
        assert.equal(currentPlayerId.done, true)
    });

    it('head player should be first in array at init', () =>
    {
        let player1 = new Player(user1)
        let player2 = new Player(user2)
        let player3 = new Player(user3)
        const gameTable = new GameTable([player1, player2, player3])

        assert.equal(gameTable._headPlayer.id, 1)
    });

    it('head player should be given reverse game order', () =>
    {
        let player1 = new Player(user1)
        let player2 = new Player(user2)
        let player3 = new Player(user3)
        const gameTable = new GameTable([player1, player2, player3])

        gameTable.assignNextHeadPlayer()
        assert.equal(gameTable._headPlayer.id, 3)
    });

    it('kill player 1 should remove him from the table', () =>
    {
        let player1 = new Player(user1)
        let player2 = new Player(user2)
        let player3 = new Player(user3)
        const gameTable = new GameTable([player1, player2, player3])

        assert.equal(gameTable.killPlayer(1), true)
        assert.equal(gameTable.playersCount, 2)
    });

    it('kill player 1 should adjust game relations and give PlayingButton to next so that it would go to player 3 in that case', () =>
    {
        let player1 = new Player(user1)
        let player2 = new Player(user2)
        let player3 = new Player(user3)
        const gameTable = new GameTable([player1, player2, player3])

        gameTable.killPlayer(1)
        assert.equal(gameTable.playersCount, 2)

        let firstPlayer = gameTable._headPlayer
        assert.equal(firstPlayer.id, 2)
        assert.equal(firstPlayer.next.id, 3)
        assert.equal(firstPlayer.previous.id, 3)

        let secondPlayer = firstPlayer.next
        assert.equal(secondPlayer.id, 3)
        assert.equal(secondPlayer.next.id, 2)
        assert.equal(secondPlayer.previous.id, 2)
    });

    it('kill player 2 should adjust game relations and do not change HeadPlayer', () =>
    {
        let player1 = new Player(user1)
        let player2 = new Player(user2)
        let player3 = new Player(user3)
        const gameTable = new GameTable([player1, player2, player3])

        gameTable.killPlayer(2)
        assert.equal(gameTable.playersCount, 2)

        let firstPlayer = gameTable._headPlayer
        assert.equal(firstPlayer.id, 1)
        assert.equal(firstPlayer.next.id, 3)
        assert.equal(firstPlayer.previous.id, 3)

        let secondPlayer = firstPlayer.next
        assert.equal(secondPlayer.id, 3)
        assert.equal(secondPlayer.next.id, 1)
        assert.equal(secondPlayer.previous.id, 1)
    });

    it('kill unknown player should answer false and nothing has changed', () =>
    {
        let player1 = new Player(user1)
        let player2 = new Player(user2)
        let player3 = new Player(user3)
        const gameTable = new GameTable([player1, player2, player3])

        assert.equal(gameTable.killPlayer(4), false)
        assert.equal(gameTable.playersCount, 3)

        let firstPlayer = gameTable._headPlayer
        assert.equal(firstPlayer.id, 1)
        assert.equal(firstPlayer.next.id, 2)
        assert.equal(firstPlayer.previous.id, 3)

        let secondPlayer = firstPlayer.next
        assert.equal(secondPlayer.id, 2)
        assert.equal(secondPlayer.next.id, 3)
        assert.equal(secondPlayer.previous.id, 1)

        let thirdPlayer = secondPlayer.next
        assert.equal(thirdPlayer.id, 3)
        assert.equal(thirdPlayer.next.id, 1)
        assert.equal(thirdPlayer.previous.id, 2)
    });

    it('convert to valid doc', () =>
    {
        let player1 = new Player(user1)
        let player2 = new Player(user2)
        let player3 = new Player(user3)
        const listPlayers = [player1, player2, player3];
        let roundIndex = 10;
        const gameTable = new GameTable(listPlayers, 1, 1, roundIndex);

        const doc = gameTable.toDoc();

        assert.deepEqual(Object.keys(doc), SERDE_KEYS);
        assert.deepEqual(doc['players'], listPlayers.map(p => {return p.toDoc();}));
        assert.equal(doc['playersCount'], gameTable.playersCount);
        assert.deepEqual(doc['indexOfHeadPlayer'], gameTable.indexOfHeadPlayer);
        assert.deepEqual(doc['indexOfCurrentPlayer'], gameTable.indexOfCurrentPlayer);
        assert.deepEqual(doc['roundIndex'], gameTable.roundIndex);

    });

    it('instantiate from doc object', () =>
    {

        let newListPlayers = [];
        for(var i = 0; i < MAX_NUMBER_PLAYERS-5; i++){
          let player = new Player(new LoggedInUser(`titi${i}`, "ToTO"));
          newListPlayers.push(player);
        }
        let indexOfHeadPlayer = 4;
        let indexOfCurrentPlayer = 0
        let roundIndex = 10;
        const doc = {
          players: newListPlayers.map((p) => {return p.toDoc();}),
          playersCount: newListPlayers.length,
          indexOfHeadPlayer: indexOfHeadPlayer,
          indexOfCurrentPlayer: indexOfCurrentPlayer,
          roundIndex: roundIndex,
        }

        let gameTable = GameTable.fromDoc(doc);
        assert.deepEqual(gameTable.players, newListPlayers);
        assert.equal(gameTable.playersCount, newListPlayers.length);
        assert.deepEqual(gameTable.indexOfHeadPlayer, indexOfHeadPlayer);
        assert.deepEqual(gameTable.indexOfCurrentPlayer, indexOfCurrentPlayer);
        assert.equal(gameTable.roundIndex, roundIndex);

    });

    it('assignNextCurrentPlayer correctly', () =>
    {
        let listPlayers = [];
        for(var i = 0; i < MAX_NUMBER_PLAYERS-1; i++){
          let player = new Player(new LoggedInUser(`titi${i}`, "ToTO"));
          listPlayers.push(player);
        }
        let gameTable = new GameTable(listPlayers, 3, 1);

        assert.deepEqual(gameTable.currentPlayer, listPlayers[1]);
        gameTable.assignNextCurrentPlayer()
        assert.deepEqual(gameTable.currentPlayer, listPlayers[2]);


        gameTable = new GameTable(listPlayers, 3, 2);
        assert.deepEqual(gameTable.currentPlayer, listPlayers[2]);
        gameTable.assignNextCurrentPlayer()
        assert.deepEqual(gameTable.currentPlayer, listPlayers[3]);
    });

    it('assignNextCurrentPlayer correctly exluding sick players', () =>
    {
        let listPlayers = [];
        for(var i = 0; i < MAX_NUMBER_PLAYERS-1; i++){
          let player = new Player(new LoggedInUser(`titi${i}`, "ToTO"));
          if(i === 3){
             player.onGetSick();
           }
          listPlayers.push(player);
        }
        let gameTable = new GameTable(listPlayers, 1, 1);

        assert.deepEqual(gameTable.currentPlayer, listPlayers[1]);
        gameTable.assignNextCurrentPlayer()
        assert.deepEqual(gameTable.currentPlayer, listPlayers[2]);
        gameTable.assignNextCurrentPlayer()
        assert.deepEqual(gameTable.currentPlayer, listPlayers[4]);

    });

    it('assignNextHeadPlayer correctly', () =>
    {
        assert(true);
    });

    it('assignNextCurrentPlayer correctly after assignNextHeadPlayer', () =>
    {
        assert(true);
    });
});
