import {GameTable} from '../model/GameTable'
import {Player} from '../model/Player'
import {WaterManager} from '../model/WaterManager'
import {WoodManager} from '../model/WoodManager'
import {FoodManager} from '../model/FoodManager'
import {Round} from '../model/Round'
import {RoundAction} from '../model/RoundAction'
import {MockLoggedInUser} from './MockLoggedInUser'
import {MockPlayer} from './MockPlayer'
import { v1 as uuidv1 } from 'uuid';


const assert = require('assert');


describe('Round', function()
{
    it('correctly create round', () =>
    {
      let id1 = uuidv1();
      let id2 = uuidv1();
      let id3 = uuidv1();
      let player1 = new MockPlayer(new MockLoggedInUser(id1, 'toto'))
      let player2 = new MockPlayer(new MockLoggedInUser(id2, 'tata'))
      let player3 = new MockPlayer(new MockLoggedInUser(id3, 'titi'))
      const gameTable = new GameTable([player1, player2, player3])

      let waterManager = new WaterManager()
      let woodManager = new WoodManager()
      let foodManager = new FoodManager()
      let round = new Round(gameTable, waterManager, foodManager, woodManager)
    });

    it('all gets water', () =>
    {
      let id1 = uuidv1();
      let id2 = uuidv1();
      let id3 = uuidv1();
      let player1 = new MockPlayer(new MockLoggedInUser(id1, 'toto'))
      let player2 = new MockPlayer(new MockLoggedInUser(id2, 'tata'))
      let player3 = new MockPlayer(new MockLoggedInUser(id3, 'titi'))
      const gameTable = new GameTable([player1, player2, player3])


      let waterManager = new WaterManager()
      waterManager._weathers = [1]

      let woodManager = new WoodManager()
      woodManager._woods = [true, true]

      let foodManager = new FoodManager()
      foodManager._foods = [3]

      let round = new Round(gameTable, waterManager, foodManager, woodManager)

      player1._chooseActionToPerform = RoundAction.CollectWater
      player1._additionalWoodRequest = 0
      player2._chooseActionToPerform = RoundAction.CollectWater
      player2._additionalWoodRequest = 0
      player3._chooseActionToPerform = RoundAction.CollectWater
      player3._additionalWoodRequest = 0

      round.play()

      assert.equal(waterManager.inventory, 3)
      assert.equal(woodManager.inventory, 0)
      assert.equal(foodManager.inventory, 0)
      assert.equal(Object.keys(round.actionsPerformedByPlayer).length, 3)

      assert(id1 in round.actionsPerformedByPlayer)
      assert.equal(round.actionsPerformedByPlayer[id1].length, 1)
      assert.equal(round.actionsPerformedByPlayer[id1][0], RoundAction.CollectWater)

      assert(id2 in round.actionsPerformedByPlayer)
      assert.equal(round.actionsPerformedByPlayer[id2].length, 1)
      assert.equal(round.actionsPerformedByPlayer[id2][0], RoundAction.CollectWater)

      assert(id3 in round.actionsPerformedByPlayer)
      assert.equal(round.actionsPerformedByPlayer[id3].length, 1)
      assert.equal(round.actionsPerformedByPlayer[id3], RoundAction.CollectWater)
    });

    it('all gets food', () =>
    {
      let id1 = uuidv1();
      let id2 = uuidv1();
      let id3 = uuidv1();
      let player1 = new MockPlayer(new MockLoggedInUser(id1, 'toto'))
      let player2 = new MockPlayer(new MockLoggedInUser(id2, 'tata'))
      let player3 = new MockPlayer(new MockLoggedInUser(id3, 'titi'))
      const gameTable = new GameTable([player1, player2, player3])

      let waterManager = new WaterManager()
      waterManager._weathers = [1]

      let woodManager = new WoodManager()
      woodManager._woods = [true, true]

      let foodManager = new FoodManager()
      foodManager._foods = [3]

      let round = new Round(gameTable, waterManager, foodManager, woodManager)

      player1._chooseActionToPerform = RoundAction.CollectFood
      player1._additionalWoodRequest = 0
      player2._chooseActionToPerform = RoundAction.CollectFood
      player2._additionalWoodRequest = 0
      player3._chooseActionToPerform = RoundAction.CollectFood
      player3._additionalWoodRequest = 0

      round.play()

      assert.equal(waterManager.inventory, 0)
      assert.equal(woodManager.inventory, 0)
      assert.equal(foodManager.inventory, 3 * 3)
      assert.equal(Object.keys(round.actionsPerformedByPlayer).length, 3)

      assert(id1 in round.actionsPerformedByPlayer)
      assert.equal(round.actionsPerformedByPlayer[id1].length, 1)
      assert.equal(round.actionsPerformedByPlayer[id1][0], RoundAction.CollectFood)

      assert(id2 in round.actionsPerformedByPlayer)
      assert.equal(round.actionsPerformedByPlayer[id2].length, 1)
      assert.equal(round.actionsPerformedByPlayer[id2][0], RoundAction.CollectFood)

      assert(id3 in round.actionsPerformedByPlayer)
      assert.equal(round.actionsPerformedByPlayer[id3].length, 1)
      assert.equal(round.actionsPerformedByPlayer[id3], RoundAction.CollectFood)
    });

    it('all gets Wood', () =>
    {
      let id1 = uuidv1();
      let id2 = uuidv1();
      let id3 = uuidv1();
      let player1 = new MockPlayer(new MockLoggedInUser(id1, 'toto'))
      let player2 = new MockPlayer(new MockLoggedInUser(id2, 'tata'))
      let player3 = new MockPlayer(new MockLoggedInUser(id3, 'titi'))
      const gameTable = new GameTable([player1, player2, player3])


      let waterManager = new WaterManager()
      waterManager._weathers = [1]

      let woodManager = new WoodManager()
      woodManager._woods = [true, true]

      let foodManager = new FoodManager()
      foodManager._foods = [3]

      let round = new Round(gameTable, waterManager, foodManager, woodManager)

      player1._chooseActionToPerform = RoundAction.CollectWood
      player1._additionalWoodRequest = 0
      player2._chooseActionToPerform = RoundAction.CollectWood
      player2._additionalWoodRequest = 0
      player3._chooseActionToPerform = RoundAction.CollectWood
      player3._additionalWoodRequest = 0

      round.play()

      assert.equal(waterManager.inventory, 0)
      assert.equal(woodManager.inventory, 3)
      assert.equal(foodManager.inventory, 0)
      assert.equal(Object.keys(round.actionsPerformedByPlayer).length, 3)

      assert(id1 in round.actionsPerformedByPlayer)
      assert.equal(round.actionsPerformedByPlayer[id1].length, 1)
      assert.equal(round.actionsPerformedByPlayer[id1][0], RoundAction.CollectWood)

      assert(id2 in round.actionsPerformedByPlayer)
      assert.equal(round.actionsPerformedByPlayer[id2].length, 1)
      assert.equal(round.actionsPerformedByPlayer[id2][0], RoundAction.CollectWood)

      assert(id3 in round.actionsPerformedByPlayer)
      assert.equal(round.actionsPerformedByPlayer[id3].length, 1)
      assert.equal(round.actionsPerformedByPlayer[id3], RoundAction.CollectWood)
    });

    it('player #3 gets sick', () =>
    {
      let id1 = uuidv1();
      let id2 = uuidv1();
      let id3 = uuidv1();
      let player1 = new MockPlayer(new MockLoggedInUser(id1, 'toto'))
      let player2 = new MockPlayer(new MockLoggedInUser(id2, 'tata'))
      let player3 = new MockPlayer(new MockLoggedInUser(id3, 'titi'))
      const gameTable = new GameTable([player1, player2, player3])

      let waterManager = new WaterManager()
      waterManager._weathers = [1]

      let woodManager = new WoodManager()
      woodManager._woods = [false]

      let foodManager = new FoodManager()
      foodManager._foods = [3]

      let round = new Round(gameTable, waterManager, foodManager, woodManager)

      player1._chooseActionToPerform = RoundAction.CollectWater
      player1._additionalWoodRequest = 0
      player2._chooseActionToPerform = RoundAction.CollectWater
      player2._additionalWoodRequest = 0
      player3._chooseActionToPerform = RoundAction.CollectWood
      player3._additionalWoodRequest = 1

      round.play()

      assert.equal(woodManager.inventory, 0)
      assert(player3.isSick)
    });


    it('only iterate over healthy players', () =>
    {
      let id1 = uuidv1();
      let id2 = uuidv1();
      let id3 = uuidv1();
      let player1 = new MockPlayer(new MockLoggedInUser(id1, 'toto'))
      let player2 = new MockPlayer(new MockLoggedInUser(id2, 'tata'))
      let player3 = new MockPlayer(new MockLoggedInUser(id3, 'titi'))
      const gameTable = new GameTable([player1, player2, player3])

      let waterManager = new WaterManager()
      waterManager._weathers = [1]

      let woodManager = new WoodManager()
      woodManager._woods = [true, true]

      let foodManager = new FoodManager()
      foodManager._foods = [3]

      let round = new Round(gameTable, waterManager, foodManager, woodManager)

      player1._chooseActionToPerform = RoundAction.CollectFood
      player1._additionalWoodRequest = 0
      player2._chooseActionToPerform = RoundAction.CollectFood
      player2._additionalWoodRequest = 0
      player3._chooseActionToPerform = RoundAction.CollectFood
      player3._additionalWoodRequest = 0
      player3.onGetSick()

      round.play()

      assert.equal(waterManager.inventory, 0)
      assert.equal(woodManager.inventory, 0)
      assert.equal(foodManager.inventory, 3 * 2)
      assert.equal(Object.keys(round.actionsPerformedByPlayer).length, 2)

      assert(id1 in round.actionsPerformedByPlayer)
      assert.equal(round.actionsPerformedByPlayer[id1].length, 1)
      assert.equal(round.actionsPerformedByPlayer[id1][0], RoundAction.CollectFood)

      assert(id2 in round.actionsPerformedByPlayer)
      assert.equal(round.actionsPerformedByPlayer[id2].length, 1)
      assert.equal(round.actionsPerformedByPlayer[id2][0], RoundAction.CollectFood)

      assert(!(id3 in round.actionsPerformedByPlayer))
    });

});
