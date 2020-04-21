import PollManager from './PollManager'
import WaterManager from './WaterManager'
import FoodManager from './FoodManager'
import WoodManager from './WoodManager'
import Player from './Player'
import RoundAction from './RoundAction'


export class Round
{
    constructor(gameTable, waterManager, foodManager, woodManager)
    {
        this._gameTable = gameTable
        this._waterManager = waterManager
        this._foodManager = foodManager
        this._woodManager = woodManager
    }

    play()
    {
        let healthyPlayerEnumerator = this._gameTable.getHealthyPlayerEnumerator()
        while (true)
        {
            let currentPlayer = healthyPlayerEnumerator.next()
            if (currentPlayer.done)
                break   
                
            let actionToPerform = currentPlayer.value.chooseActionToPerform()
            switch (actionToPerform)
            {
                case RoundAction.CollectWater:
                    this._waterManager.collect()
                    break
                
                case RoundAction.CollectFood:
                    this._foodManager.collect()
                    break
                  
                case RoundAction.CollectWood:
                    if (!this._woodManager.tryCollect())
                        currentPlayer.value.onGetSick()
                    break
            }
        }
    }
}
