import {GameTable} from '../model/GameTable'
import Player from '../model/Player'
import {WaterManager} from '../model/WaterManager'
import {Weather} from '../model/Weather'
import {WoodManager} from '../model/WoodManager'
import {FoodManager} from '../model/FoodManager'
import {RoundManager} from '../model/RoundManager'
import {RoundAction} from '../model/RoundAction'
import LoggedInUser from '../model/LoggedInUser'
import {MockPlayer} from './MockPlayer'
import { v1 as uuidv1 } from 'uuid';


const assert = require('assert');


describe('RoundManager', function()
{
    it('correctly create roundManager', () =>
    {
      let id1 = uuidv1();
      let id2 = uuidv1();
      let id3 = uuidv1();
      let player1 = new MockPlayer(new LoggedInUser(id1, 'toto'))
      let player2 = new MockPlayer(new LoggedInUser(id2, 'tata'))
      let player3 = new MockPlayer(new LoggedInUser(id3, 'titi'))
      const gameTable = new GameTable([player1, player2, player3])

      let waterManager = new WaterManager()
      let woodManager = new WoodManager()
      let foodManager = new FoodManager()
      let roundManager = new RoundManager(gameTable, waterManager, foodManager, woodManager)
    });

    it('all gets water', () =>
    {
      let id1 = uuidv1();
      let id2 = uuidv1();
      let id3 = uuidv1();
      let player1 = new MockPlayer(new LoggedInUser(id1, 'toto'))
      let player2 = new MockPlayer(new LoggedInUser(id2, 'tata'))
      let player3 = new MockPlayer(new LoggedInUser(id3, 'titi'))
      const gameTable = new GameTable([player1, player2, player3])


      let waterManager = new WaterManager()
      waterManager._weathers = [Weather.Drizzle]

      let woodManager = new WoodManager()
      woodManager._woods = [true, true]

      let foodManager = new FoodManager()
      foodManager._foods = [3]

      let roundManager = new RoundManager(gameTable, waterManager, foodManager, woodManager)

      player1._chooseActionToPerform = RoundAction.CollectWater
      player1._additionalWoodRequest = 0
      player2._chooseActionToPerform = RoundAction.CollectWater
      player2._additionalWoodRequest = 0
      player3._chooseActionToPerform = RoundAction.CollectWater
      player3._additionalWoodRequest = 0

      roundManager.play()

      assert.equal(waterManager.inventory, 3)
      assert.equal(woodManager.inventory, 0)
      assert.equal(foodManager.inventory, 0)
      assert.equal(Object.keys(roundManager.actionsPerformedByPlayer).length, 3)

      assert(id1 in roundManager.actionsPerformedByPlayer)
      assert.equal(roundManager.actionsPerformedByPlayer[id1].length, 1)
      assert.equal(roundManager.actionsPerformedByPlayer[id1][0], RoundAction.CollectWater)

      assert(id2 in roundManager.actionsPerformedByPlayer)
      assert.equal(roundManager.actionsPerformedByPlayer[id2].length, 1)
      assert.equal(roundManager.actionsPerformedByPlayer[id2][0], RoundAction.CollectWater)

      assert(id3 in roundManager.actionsPerformedByPlayer)
      assert.equal(roundManager.actionsPerformedByPlayer[id3].length, 1)
      assert.equal(roundManager.actionsPerformedByPlayer[id3], RoundAction.CollectWater)
    });

    it('all gets food', () =>
    {
      let id1 = uuidv1();
      let id2 = uuidv1();
      let id3 = uuidv1();
      let player1 = new MockPlayer(new LoggedInUser(id1, 'toto'))
      let player2 = new MockPlayer(new LoggedInUser(id2, 'tata'))
      let player3 = new MockPlayer(new LoggedInUser(id3, 'titi'))
      const gameTable = new GameTable([player1, player2, player3])

      let waterManager = new WaterManager()
      waterManager._weathers = [Weather.Drizzle]

      let woodManager = new WoodManager()
      woodManager._woods = [true, true]

      let foodManager = new FoodManager()
      foodManager._foods = [3]

      let roundManager = new RoundManager(gameTable, waterManager, foodManager, woodManager)

      player1._chooseActionToPerform = RoundAction.CollectFood
      player1._additionalWoodRequest = 0
      player2._chooseActionToPerform = RoundAction.CollectFood
      player2._additionalWoodRequest = 0
      player3._chooseActionToPerform = RoundAction.CollectFood
      player3._additionalWoodRequest = 0

      roundManager.play()

      assert.equal(waterManager.inventory, 0)
      assert.equal(woodManager.inventory, 0)
      assert.equal(foodManager.inventory, 3 * 3)
      assert.equal(Object.keys(roundManager.actionsPerformedByPlayer).length, 3)

      assert(id1 in roundManager.actionsPerformedByPlayer)
      assert.equal(roundManager.actionsPerformedByPlayer[id1].length, 1)
      assert.equal(roundManager.actionsPerformedByPlayer[id1][0], RoundAction.CollectFood)

      assert(id2 in roundManager.actionsPerformedByPlayer)
      assert.equal(roundManager.actionsPerformedByPlayer[id2].length, 1)
      assert.equal(roundManager.actionsPerformedByPlayer[id2][0], RoundAction.CollectFood)

      assert(id3 in roundManager.actionsPerformedByPlayer)
      assert.equal(roundManager.actionsPerformedByPlayer[id3].length, 1)
      assert.equal(roundManager.actionsPerformedByPlayer[id3], RoundAction.CollectFood)
    });

    it('all gets Wood', () =>
    {
      let id1 = uuidv1();
      let id2 = uuidv1();
      let id3 = uuidv1();
      let player1 = new MockPlayer(new LoggedInUser(id1, 'toto'))
      let player2 = new MockPlayer(new LoggedInUser(id2, 'tata'))
      let player3 = new MockPlayer(new LoggedInUser(id3, 'titi'))
      const gameTable = new GameTable([player1, player2, player3])


      let waterManager = new WaterManager()
      waterManager._weathers = [Weather.Drizzle]

      let woodManager = new WoodManager()
      woodManager._woods = [true, true]

      let foodManager = new FoodManager()
      foodManager._foods = [3]

      let roundManager = new RoundManager(gameTable, waterManager, foodManager, woodManager)

      player1._chooseActionToPerform = RoundAction.CollectWood
      player1._additionalWoodRequest = 0
      player2._chooseActionToPerform = RoundAction.CollectWood
      player2._additionalWoodRequest = 0
      player3._chooseActionToPerform = RoundAction.CollectWood
      player3._additionalWoodRequest = 0

      roundManager.play()

      assert.equal(waterManager.inventory, 0)
      assert.equal(woodManager.inventory, 3)
      assert.equal(foodManager.inventory, 0)
      assert.equal(Object.keys(roundManager.actionsPerformedByPlayer).length, 3)

      assert(id1 in roundManager.actionsPerformedByPlayer)
      assert.equal(roundManager.actionsPerformedByPlayer[id1].length, 1)
      assert.equal(roundManager.actionsPerformedByPlayer[id1][0], RoundAction.CollectWood)

      assert(id2 in roundManager.actionsPerformedByPlayer)
      assert.equal(roundManager.actionsPerformedByPlayer[id2].length, 1)
      assert.equal(roundManager.actionsPerformedByPlayer[id2][0], RoundAction.CollectWood)

      assert(id3 in roundManager.actionsPerformedByPlayer)
      assert.equal(roundManager.actionsPerformedByPlayer[id3].length, 1)
      assert.equal(roundManager.actionsPerformedByPlayer[id3], RoundAction.CollectWood)
    });

    it('player #3 gets sick', () =>
    {
      let id1 = uuidv1();
      let id2 = uuidv1();
      let id3 = uuidv1();
      let player1 = new MockPlayer(new LoggedInUser(id1, 'toto'))
      let player2 = new MockPlayer(new LoggedInUser(id2, 'tata'))
      let player3 = new MockPlayer(new LoggedInUser(id3, 'titi'))
      const gameTable = new GameTable([player1, player2, player3])

      let waterManager = new WaterManager()
      waterManager._weathers = [Weather.Drizzle]

      let woodManager = new WoodManager()
      woodManager._woods = [false]

      let foodManager = new FoodManager()
      foodManager._foods = [3]

      let roundManager = new RoundManager(gameTable, waterManager, foodManager, woodManager)

      player1._chooseActionToPerform = RoundAction.CollectWater
      player1._additionalWoodRequest = 0
      player2._chooseActionToPerform = RoundAction.CollectWater
      player2._additionalWoodRequest = 0
      player3._chooseActionToPerform = RoundAction.CollectWood
      player3._additionalWoodRequest = 1

      roundManager.play()

      assert.equal(woodManager.inventory, 0)
      assert(player3.isSick)
    });


    it('only iterate over healthy players', () =>
    {
      let id1 = uuidv1();
      let id2 = uuidv1();
      let id3 = uuidv1();
      let player1 = new MockPlayer(new LoggedInUser(id1, 'toto'))
      let player2 = new MockPlayer(new LoggedInUser(id2, 'tata'))
      let player3 = new MockPlayer(new LoggedInUser(id3, 'titi'))
      const gameTable = new GameTable([player1, player2, player3])

      let waterManager = new WaterManager()
      waterManager._weathers = [Weather.Drizzle]

      let woodManager = new WoodManager()
      woodManager._woods = [true, true]

      let foodManager = new FoodManager()
      foodManager._foods = [3]

      let roundManager  = new RoundManager(gameTable, waterManager, foodManager, woodManager)

      player1._chooseActionToPerform = RoundAction.CollectFood
      player1._additionalWoodRequest = 0
      player2._chooseActionToPerform = RoundAction.CollectFood
      player2._additionalWoodRequest = 0
      player3._chooseActionToPerform = RoundAction.CollectFood
      player3._additionalWoodRequest = 0
      player3.onGetSick()

      roundManager.play()

      assert.equal(waterManager.inventory, 0)
      assert.equal(woodManager.inventory, 0)
      assert.equal(foodManager.inventory, 3 * 2)
      assert.equal(Object.keys(roundManager.actionsPerformedByPlayer).length, 2)

      assert(id1 in roundManager.actionsPerformedByPlayer)
      assert.equal(roundManager.actionsPerformedByPlayer[id1].length, 1)
      assert.equal(roundManager.actionsPerformedByPlayer[id1][0], RoundAction.CollectFood)

      assert(id2 in roundManager.actionsPerformedByPlayer)
      assert.equal(roundManager.actionsPerformedByPlayer[id2].length, 1)
      assert.equal(roundManager.actionsPerformedByPlayer[id2][0], RoundAction.CollectFood)

      assert(!(id3 in roundManager.actionsPerformedByPlayer))
    });

    it('only iterate over healthy players', () =>
    {
      let id1 = uuidv1();
      let id2 = uuidv1();
      let id3 = uuidv1();
      let player1 = new MockPlayer(new LoggedInUser(id1, 'toto'))
      let player2 = new MockPlayer(new LoggedInUser(id2, 'tata'))
      let player3 = new MockPlayer(new LoggedInUser(id3, 'titi'))
      const gameTable = new GameTable([player1, player2, player3])

      let waterManager = new WaterManager()
      waterManager._weathers = [Weather.Drizzle]

      let woodManager = new WoodManager()
      woodManager._woods = [true, true]

      let foodManager = new FoodManager()
      foodManager._foods = [3]

      let roundManager  = new RoundManager(gameTable, waterManager, foodManager, woodManager)

      player1._chooseActionToPerform = RoundAction.CollectFood
      player1._additionalWoodRequest = 0
      player2._chooseActionToPerform = RoundAction.CollectFood
      player2._additionalWoodRequest = 0
      player3._chooseActionToPerform = RoundAction.CollectFood
      player3._additionalWoodRequest = 0
      player3.onGetSick()

      roundManager.play()

      assert.equal(waterManager.inventory, 0)
      assert.equal(woodManager.inventory, 0)
      assert.equal(foodManager.inventory, 3 * 2)
      assert.equal(Object.keys(roundManager.actionsPerformedByPlayer).length, 2)

      assert(id1 in roundManager.actionsPerformedByPlayer)
      assert.equal(roundManager.actionsPerformedByPlayer[id1].length, 1)
      assert.equal(roundManager.actionsPerformedByPlayer[id1][0], RoundAction.CollectFood)

      assert(id2 in roundManager.actionsPerformedByPlayer)
      assert.equal(roundManager.actionsPerformedByPlayer[id2].length, 1)
      assert.equal(roundManager.actionsPerformedByPlayer[id2][0], RoundAction.CollectFood)

      assert(!(id3 in roundManager.actionsPerformedByPlayer))
    });

    it('properly formats player action summaries', () =>
    {
      let id1 = uuidv1();
      let id2 = uuidv1();
      let id3 = uuidv1();
      let player1 = new Player(new LoggedInUser(id1, 'toto'))
      let player2 = new Player(new LoggedInUser(id2, 'tata'))
      let player3 = new Player(new LoggedInUser(id3, 'titi'))
      const gameTable = new GameTable([player1, player2, player3])

      let waterManager = new WaterManager()
      waterManager._weathers = [Weather.Drizzle]

      let woodManager = new WoodManager()
      woodManager._woods = [true, true]

      let foodManager = new FoodManager()
      foodManager._foods = [3]

      let roundManager  = new RoundManager(gameTable, waterManager, foodManager, woodManager)

      let summaryCollectWater = roundManager.getActionSummary(player1, RoundAction.CollectWater)
      assert.equal(
        `${player1.nickname} chose to collect some water.`,
        summaryCollectWater
      )

      let summaryCollectFood = roundManager.getActionSummary(player1, RoundAction.CollectFood)
      assert.equal(
        `${player1.nickname} chose to collect some food.`,
        summaryCollectFood
      )

      let summaryCollectWood = roundManager.getActionSummary(player1, RoundAction.CollectWood, 2)
      assert.equal(
        `${player1.nickname} chose to collect some wood with additional request of 2 logs.`,
        summaryCollectWood
      )

    });

    it('playAction only runs if currentPlayer matches player parameter', () =>
    {
      let id1 = uuidv1();
      let id2 = uuidv1();
      let id3 = uuidv1();
      let id4 = uuidv1();
      let player1 = new Player(new LoggedInUser(id1, 'toto'))
      let player2 = new Player(new LoggedInUser(id2, 'tata'))
      let player3 = new Player(new LoggedInUser(id3, 'titi'))
      let player4 = new Player(new LoggedInUser(id4, 'titicaca'))

      const gameTable = new GameTable([player1, player2, player3, player4])

      let waterManager = new WaterManager()
      waterManager._weathers = [Weather.Drizzle]

      let woodManager = new WoodManager()
      woodManager._woods = [true, true, true, true, true, true]

      let foodManager = new FoodManager()
      foodManager._foods = [3]

      let roundManager  = new RoundManager(gameTable, waterManager, foodManager, woodManager)
      player3.onGetSick()

      assert(roundManager._gameTable.currentPlayer.userId === player1.userId);
      // Player1 can perform action
      let actionToPerform = RoundAction.CollectWater;
      let summaryCollectWater = roundManager.getActionSummary(player1, actionToPerform)
      roundManager.playAction(player1, actionToPerform)
      assert(roundManager.actionsPerformedByPlayer.includes(summaryCollectWater));
      assert.deepEqual(roundManager.actionsPerformedByPlayer, [summaryCollectWater]);

      //Player cannot perform action
      assert.throws(
        () => {roundManager.playAction(player4, actionToPerform);},
        Error
      );
      //Leave list unchanged
      assert.deepEqual(roundManager.actionsPerformedByPlayer, [summaryCollectWater]);

      // Player1 can perform another action...
      actionToPerform = RoundAction.CollectWood;
      let adds =  5;
      let summaryCollectWood = roundManager.getActionSummary(player1, actionToPerform, adds)
      roundManager.playAction(player1, actionToPerform, adds)
      assert(roundManager.actionsPerformedByPlayer.includes(summaryCollectWood));
      assert.deepEqual(roundManager.actionsPerformedByPlayer, [summaryCollectWater, summaryCollectWood]);

    });

    it('playAction with unknown action raises error', () =>
    {
      let id1 = uuidv1();
      let id2 = uuidv1();
      let id3 = uuidv1();
      let id4 = uuidv1();
      let player1 = new Player(new LoggedInUser(id1, 'toto'))
      let player2 = new Player(new LoggedInUser(id2, 'tata'))
      let player3 = new Player(new LoggedInUser(id3, 'titi'))
      let player4 = new Player(new LoggedInUser(id4, 'titicaca'))

      const gameTable = new GameTable([player1, player2, player3, player4])

      let waterManager = new WaterManager()
      waterManager._weathers = [Weather.Drizzle]

      let woodManager = new WoodManager()
      woodManager._woods = [true, true]

      let foodManager = new FoodManager()
      foodManager._foods = [3]

      let roundManager  = new RoundManager(gameTable, waterManager, foodManager, woodManager)
      player3.onGetSick()

      assert(roundManager._gameTable.currentPlayer.userId === player1.userId);
      // Player1 cannot perform unknown action
      assert.throws(
        () => {roundManager.playAction(player1, "unknown action dude");},
        Error
      );
      //Leave list unchanged
      assert.deepEqual(roundManager.actionsPerformedByPlayer, []);

    });

    it('playAction with unknown action raises error', () =>
    {
      let id1 = uuidv1();
      let id2 = uuidv1();
      let id3 = uuidv1();
      let id4 = uuidv1();
      let player1 = new Player(new LoggedInUser(id1, 'toto'))
      let player2 = new Player(new LoggedInUser(id2, 'tata'))
      let player3 = new Player(new LoggedInUser(id3, 'titi'))
      let player4 = new Player(new LoggedInUser(id4, 'titicaca'))

      const gameTable = new GameTable([player1, player2, player3, player4])

      let waterManager = new WaterManager()
      waterManager._weathers = [Weather.Drizzle]

      let woodManager = new WoodManager()
      woodManager._woods = [false, false]

      let foodManager = new FoodManager()
      foodManager._foods = [3]

      let roundManager  = new RoundManager(gameTable, waterManager, foodManager, woodManager)

      assert(roundManager._gameTable.currentPlayer.userId === player1.userId);
      let actionToPerform = RoundAction.CollectWood;
      let adds =  1;
      let summaryCollectWood = roundManager.getActionSummary(player1, actionToPerform, adds)
      roundManager.playAction(player1, actionToPerform, adds)
      assert(roundManager.actionsPerformedByPlayer.includes(summaryCollectWood));
      assert.deepEqual(roundManager.actionsPerformedByPlayer, [summaryCollectWood]);

      // Player1 is sick
      assert(roundManager._gameTable.currentPlayer.isSick);
      assert(player1.isSick);
    });

  });
