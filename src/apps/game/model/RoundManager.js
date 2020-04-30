import {RoundAction} from './RoundAction'


export class RoundManager
{
    constructor(gameTable, waterManager, foodManager, woodManager)
    {
        this._gameTable = gameTable
        this._waterManager = waterManager
        this._foodManager = foodManager
        this._woodManager = woodManager
        this.actionsPerformedByPlayer = []
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
    
    playAction(player, actionToPerform, additionalRequest=0) {
      let healthyPlayerEnumerator = this._gameTable.getPositionedHealthyPlayerEnumerator()
      
      let currentPlayer = this._gameTable.currentPlayer;
      if (currentPlayer.userId === player.userId)
      {
        console.log("actionToPerform", actionToPerform);
        let actionSummaryPrefix = `${player.nickname}-${player.userId} chose to `;
        let actionSummary;
        switch (actionToPerform)
        {
            case RoundAction.CollectWater:
                this._waterManager.collect()
                actionSummary = actionSummaryPrefix + "collect some water.";
                break;
        
            case RoundAction.CollectFood:
                this._foodManager.collect()
                actionSummary = actionSummaryPrefix + "collect some food.";
                break;

            case RoundAction.CollectWood:
                let additionalRequest = currentPlayer.additionalWoodRequest()
                if (!this._woodManager.tryCollect(additionalRequest))
                {
                  currentPlayer.onGetSick()
                }
                actionSummary = actionSummaryPrefix + `collect some wood with additional request of ${additionalRequest} logs.`;
                break;

            default :
                throw new Error('Default case in RoundManager for player', player);
          }
        
          // Push action logs
          this.actionsPerformedByPlayer.push(actionSummary);
          console.log("after push this.actionsPerformedByPlayer", this.actionsPerformedByPlayer);
          // update _gameTable
          let endOfRound = this._gameTable.updateAfterRoundAction(currentPlayer);
          return [this, currentPlayer, endOfRound]
          
        } 
        else 
        {
            throw new Error('Not your turn to play in the round', player);
        }
    }
}
