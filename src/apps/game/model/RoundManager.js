import {RoundAction} from './RoundAction'


export class RoundManager
{
    constructor(gameTable, waterManager, foodManager, woodManager)
    {
        this._gameTable = gameTable
        this._waterManager = waterManager
        this._foodManager = foodManager
        this._woodManager = woodManager
        this.actionsPerformedByPlayer = {}
    }

    play()
    {
        let healthyPlayerEnumerator = this._gameTable.getHealthyPlayerEnumerator()
        while (true)
        {
            let currentPlayer = healthyPlayerEnumerator.next()
            if (currentPlayer.done)
                break

            this.actionsPerformedByPlayer[currentPlayer.value.id] = []

            let actionToPerform = currentPlayer.value.player.chooseActionToPerform()
            this.actionsPerformedByPlayer[currentPlayer.value.id].push(actionToPerform)

            switch (actionToPerform)
            {
                case RoundAction.CollectWater:
                    this._waterManager.collect()
                    break

                case RoundAction.CollectFood:
                    this._foodManager.collect()
                    break

                case RoundAction.CollectWood:
                    let additionalRequest = currentPlayer.value.player.additionalWoodRequest()
                    if (!this._woodManager.tryCollect(additionalRequest))
                    {
                      currentPlayer.value.player.onGetSick()
                    }
                    break

                default :
                    throw new Error('Default case in RoundManager for player', currentPlayer);
            }
        }
    }
}
