import {GameTable} from '../model/GameTable'
import Player from '../model/Player'
import Game from '../model/Game'
import LoggedInUser from '../model/LoggedInUser'
import {WaterManager} from '../model/WaterManager'
import {WoodManager} from '../model/WoodManager'
import {FoodManager} from '../model/FoodManager'
import {RoundAction} from '../model/RoundAction'
import {MockRoundManager} from './MockRoundManager'
import {MockPollManager} from './MockPollManager'
import {MockPlayer} from './MockPlayer'
import { v1 as uuidv1 } from 'uuid';


const assert = require('assert');


describe('Game', function()
{
    it('correctly create players Game', () =>
    {
        let id1 = uuidv1();
        let id2 = uuidv1();
        let id3 = uuidv1();
        let user1 = new LoggedInUser(id1, 'toto')
        let user2 = new LoggedInUser(id2, 'tata')
        let user3 = new LoggedInUser(id3, 'titi')

        let players = Game._createPlayers([user1, user2, user3])
        assert.equal(players.length, 3)
        assert.equal(players[0].id, id1)
        assert.equal(players[1].id, id2)
        assert.equal(players[2].id, id3)
    });

    it('correctly create Game', () =>
    {
        let id1 = uuidv1();
        let id2 = uuidv1();
        let id3 = uuidv1();
        let user1 = new LoggedInUser(id1, 'toto')
        let user2 = new LoggedInUser(id2, 'tata')
        let user3 = new LoggedInUser(id3, 'titi')

        let waterManager = new WaterManager()
        let woodManager = new WoodManager()
        let foodManager = new FoodManager()

        let game = new Game([user1, user2, user3], waterManager, foodManager, woodManager)

        let roundManager = new MockRoundManager(game._gameTable, waterManager, foodManager, woodManager)
        let pollManager = new MockPollManager(game._gameTable)

        game._roundManager = roundManager
        game._pollManager = pollManager

        assert.equal(game.playersCount, 3)
    });

    it('win <-> >=2xFoods + >=2xWaters + >=6xWoods', () =>
    {
        let id1 = uuidv1();
        let id2 = uuidv1();
        let id3 = uuidv1();
        let user1 = new LoggedInUser(id1, 'toto')
        let user2 = new LoggedInUser(id2, 'tata')
        let user3 = new LoggedInUser(id3, 'titi')

        let waterManager = new WaterManager()
        let woodManager = new WoodManager()
        let foodManager = new FoodManager()

        let game = new Game([user1, user2, user3], waterManager, foodManager, woodManager)

        let roundManager = new MockRoundManager(game._gameTable, waterManager, foodManager, woodManager)
        let pollManager = new MockPollManager(game._gameTable)

        roundManager._waterInventory = 3*2
        roundManager._foodInventory = 3*2
        roundManager._woodInventory = 3*6

        game._roundManager = roundManager
        game._pollManager = pollManager

        assert(!game._win)
        game.play()
        assert(game._win)
    });

    it('can leave <-> >=2xFoods + >=2xWaters + >=6xWoods', () =>
    {
        let id1 = uuidv1();
        let id2 = uuidv1();
        let id3 = uuidv1();
        let user1 = new LoggedInUser(id1, 'toto')
        let user2 = new LoggedInUser(id2, 'tata')
        let user3 = new LoggedInUser(id3, 'titi')

        let waterManager = new WaterManager()
        let woodManager = new WoodManager()
        let foodManager = new FoodManager()

        let game = new Game([user1, user2, user3], waterManager, foodManager, woodManager)

        let roundManager = new MockRoundManager(game._gameTable, waterManager, foodManager, woodManager)
        let pollManager = new MockPollManager(game._gameTable)

        waterManager.inventory = 3*2
        foodManager.inventory = 3*2
        woodManager.inventory = 3*6

        game._roundManager = roundManager
        game._pollManager = pollManager

        assert(game._canLeave())
    });

    it('cant leave <-> <2xFoods + >=2xWaters + >=6xWoods', () =>
    {
        let id1 = uuidv1();
        let id2 = uuidv1();
        let id3 = uuidv1();
        let user1 = new LoggedInUser(id1, 'toto')
        let user2 = new LoggedInUser(id2, 'tata')
        let user3 = new LoggedInUser(id3, 'titi')

        let waterManager = new WaterManager()
        let woodManager = new WoodManager()
        let foodManager = new FoodManager()

        let game = new Game([user1, user2, user3], waterManager, foodManager, woodManager)

        let roundManager = new MockRoundManager(game._gameTable, waterManager, foodManager, woodManager)
        let pollManager = new MockPollManager(game._gameTable)

        waterManager.inventory = 3*2
        foodManager.inventory = 3*2-1
        woodManager.inventory = 3*6

        game._roundManager = roundManager
        game._pollManager = pollManager

        assert(!game._canLeave())
    });

    it('cant leave <-> >=2xFoods + <2xWaters + >=6xWoods', () =>
    {
        let id1 = uuidv1();
        let id2 = uuidv1();
        let id3 = uuidv1();
        let user1 = new LoggedInUser(id1, 'toto')
        let user2 = new LoggedInUser(id2, 'tata')
        let user3 = new LoggedInUser(id3, 'titi')

        let waterManager = new WaterManager()
        let woodManager = new WoodManager()
        let foodManager = new FoodManager()

        let game = new Game([user1, user2, user3], waterManager, foodManager, woodManager)

        let roundManager = new MockRoundManager(game._gameTable, waterManager, foodManager, woodManager)
        let pollManager = new MockPollManager(game._gameTable)

        waterManager.inventory = 3*2-1
        foodManager.inventory = 3*2
        woodManager.inventory = 3*6

        game._roundManager = roundManager
        game._pollManager = pollManager

        assert(!game._canLeave())
    });

    it('cant leave <-> >=2xFoods + >=2xWaters + <6xWoods', () =>
    {
        let id1 = uuidv1();
        let id2 = uuidv1();
        let id3 = uuidv1();
        let user1 = new LoggedInUser(id1, 'toto')
        let user2 = new LoggedInUser(id2, 'tata')
        let user3 = new LoggedInUser(id3, 'titi')

        let waterManager = new WaterManager()
        let woodManager = new WoodManager()
        let foodManager = new FoodManager()

        let game = new Game([user1, user2, user3], waterManager, foodManager, woodManager)

        let roundManager = new MockRoundManager(game._gameTable, waterManager, foodManager, woodManager)
        let pollManager = new MockPollManager(game._gameTable)

        waterManager.inventory = 3*2
        foodManager.inventory = 3*2
        woodManager.inventory = 3*6-1

        game._roundManager = roundManager
        game._pollManager = pollManager

        assert(!game._canLeave())
    });

    it('lastRound <-> weather == 3', () =>
    {
        let id1 = uuidv1();
        let id2 = uuidv1();
        let id3 = uuidv1();
        let user1 = new LoggedInUser(id1, 'toto')
        let user2 = new LoggedInUser(id2, 'tata')
        let user3 = new LoggedInUser(id3, 'titi')

        let waterManager = new WaterManager()
        waterManager._weathers = [3]
        let woodManager = new WoodManager()
        let foodManager = new FoodManager()

        let game = new Game([user1, user2, user3], waterManager, foodManager, woodManager)

        let roundManager = new MockRoundManager(game._gameTable, waterManager, foodManager, woodManager)
        let pollManager = new MockPollManager(game._gameTable)

        roundManager._waterInventory = 3*2
        roundManager._foodInventory = 3*2
        roundManager._woodInventory = 3*6

        game._roundManager = roundManager
        game._pollManager = pollManager

        assert(!game._lastRound)
        game.play()
        assert(game._lastRound)
    });

    it('water management with 0 kill', () =>
    {
        let id1 = uuidv1();
        let id2 = uuidv1();
        let id3 = uuidv1();
        let user1 = new LoggedInUser(id1, 'toto')
        let user2 = new LoggedInUser(id2, 'tata')
        let user3 = new LoggedInUser(id3, 'titi')

        let waterManager = new WaterManager()
        waterManager._weathers = [3]
        waterManager.inventory = 3
        let woodManager = new WoodManager()
        let foodManager = new FoodManager()

        let game = new Game([user1, user2, user3], waterManager, foodManager, woodManager)

        let roundManager = new MockRoundManager(game._gameTable, waterManager, foodManager, woodManager)
        let pollManager = new MockPollManager(game._gameTable)
        pollManager._playerToKill = id1

        game._roundManager = roundManager
        game._pollManager = pollManager

        assert.equal(game._gameTable.playersCount, 3)
        game._manageWaterEndOfRound()
        assert.equal(game._gameTable.playersCount, 3)
        assert.equal(game._waterManager.inventory, 0)
    });

    it('water management with 1 kill', () =>
    {
        let id1 = uuidv1();
        let id2 = uuidv1();
        let id3 = uuidv1();
        let user1 = new LoggedInUser(id1, 'toto')
        let user2 = new LoggedInUser(id2, 'tata')
        let user3 = new LoggedInUser(id3, 'titi')

        let waterManager = new WaterManager()
        waterManager._weathers = [3]
        waterManager.inventory = 2
        let woodManager = new WoodManager()
        let foodManager = new FoodManager()

        let game = new Game([user1, user2, user3], waterManager, foodManager, woodManager)

        let roundManager = new MockRoundManager(game._gameTable, waterManager, foodManager, woodManager)
        let pollManager = new MockPollManager(game._gameTable)
        pollManager._playerToKill = id1

        game._roundManager = roundManager
        game._pollManager = pollManager

        assert.equal(game._gameTable.playersCount, 3)
        game._manageWaterEndOfRound()
        assert.equal(game._gameTable.playersCount, 2)
        assert.equal(game._waterManager.inventory, 0)
    });

    it('food management with 0 kill', () =>
    {
        let id1 = uuidv1();
        let id2 = uuidv1();
        let id3 = uuidv1();
        let user1 = new LoggedInUser(id1, 'toto')
        let user2 = new LoggedInUser(id2, 'tata')
        let user3 = new LoggedInUser(id3, 'titi')

        let waterManager = new WaterManager()
        waterManager._weathers = [3]
        let woodManager = new WoodManager()
        let foodManager = new FoodManager()
        foodManager.inventory = 3

        let game = new Game([user1, user2, user3], waterManager, foodManager, woodManager)

        let roundManager = new MockRoundManager(game._gameTable, waterManager, foodManager, woodManager)
        let pollManager = new MockPollManager(game._gameTable)
        pollManager._playerToKill = id1

        game._roundManager = roundManager
        game._pollManager = pollManager

        assert.equal(game._gameTable.playersCount, 3)
        game._manageFoodEndOfRound()
        assert.equal(game._gameTable.playersCount, 3)
        assert.equal(game._foodManager.inventory, 0)
    });

    it('food management with 1 kill', () =>
    {
        let id1 = uuidv1();
        let id2 = uuidv1();
        let id3 = uuidv1();
        let user1 = new LoggedInUser(id1, 'toto')
        let user2 = new LoggedInUser(id2, 'tata')
        let user3 = new LoggedInUser(id3, 'titi')

        let waterManager = new WaterManager()
        waterManager._weathers = [3]
        let woodManager = new WoodManager()
        let foodManager = new FoodManager()
        foodManager.inventory = 2

        let game = new Game([user1, user2, user3], waterManager, foodManager, woodManager)

        let roundManager = new MockRoundManager(game._gameTable, waterManager, foodManager, woodManager)
        let pollManager = new MockPollManager(game._gameTable)
        pollManager._playerToKill = id1

        game._roundManager = roundManager
        game._pollManager = pollManager

        assert.equal(game._gameTable.playersCount, 3)
        game._manageFoodEndOfRound()
        assert.equal(game._gameTable.playersCount, 2)
        assert.equal(game._foodManager.inventory, 0)
    });
    
    it('convertion to doc is valid', () =>
    {
      
      let id1 = uuidv1();
      let id2 = uuidv1();
      let id3 = uuidv1();
      let user1 = new LoggedInUser(id1, 'toto')
      let user2 = new LoggedInUser(id2, 'tata')
      let user3 = new LoggedInUser(id3, 'titi')

      let waterManager = new WaterManager()
      let woodManager = new WoodManager()
      let foodManager = new FoodManager()

      let game = new Game([user1, user2, user3], waterManager, foodManager, woodManager)
      const doc = game.toDoc();
      
      assert.deepEqual(Object.keys(doc), 
        [
          '_id', '_lastRound', '_win', 'history', 
          '_gameTable','_waterManager','_foodManager','_woodManager',
          //TODO '_roundManager','_pollManager',
      ]
      );
      assert.equal(doc['_id'], game._id);
      assert.equal(doc['_lastRound'], game._lastRound);
      assert.equal(doc['_win'], game._win);
      assert.deepEqual(doc['history'], game.history);
      assert.deepEqual(doc['_gameTable'], game._gameTable.toDoc());
      assert.deepEqual(doc['_waterManager'], game._waterManager.toDoc());
      assert.deepEqual(doc['_foodManager'], game._foodManager.toDoc());
      assert.deepEqual(doc['_woodManager'], game._woodManager.toDoc());
      /**
      * TODO
      * assert.deepEqual(doc['_roundManager'], game._roundManager.toDoc());
      * assert.deepEqual(doc['_pollManager'], game._pollManager.toDoc());
      */


      
    });








});
