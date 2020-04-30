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
    
    getActionSummary(player, actionToPerform, additionalRequest=0)
    {
      let actionSummary;
      let actionSummaryPrefix = `${player.nickname} chose to `;
      switch (actionToPerform)
      {
          case RoundAction.CollectWater:
              actionSummary = actionSummaryPrefix + "collect some water.";
              break;
      
          case RoundAction.CollectFood:
              actionSummary = actionSummaryPrefix + "collect some food.";
              break;

          case RoundAction.CollectWood:
              actionSummary = actionSummaryPrefix + `collect some wood with additional request of ${additionalRequest} logs.`;
              break;

          default :
              throw new Error('Default case in getActionSummary for player and action', player, actionToPerform);
        }
        return actionSummary;
    }
    
    
    playAction(player, actionToPerform, additionalRequest=0) {
      let healthyPlayerEnumerator = this._gameTable.getPositionedHealthyPlayerEnumerator()
      
      let currentPlayer = this._gameTable.currentPlayer;
      if (currentPlayer.userId === player.userId)
      {
        console.log("actionToPerform", actionToPerform);
        switch (actionToPerform)
        {
            case RoundAction.CollectWater:
                this._waterManager.collect()
                break;
        
            case RoundAction.CollectFood:
                this._foodManager.collect()
                break;

            case RoundAction.CollectWood:
                if (!this._woodManager.tryCollect(additionalRequest))
                {
                  console.log("currentPlayer.onGetSick()")
                  currentPlayer.onGetSick()
                }
                break;

            default :
                throw new Error('Default case in RoundManager for player', player);
          }
        
          // Push action logs
          let actionSummary = this.getActionSummary(player, actionToPerform, additionalRequest);
          this.actionsPerformedByPlayer.push(actionSummary);
        } 
        else 
        {
            throw new Error('Not your turn to play in the round', player);
        }
    }
    
    _onRoundEnded()
    {
        this._waterManager.onRoundEnded()
        let playerEnumerator = this._gameTable.getPlayerEnumerator()
        while (true)
        {
            let currentPlayer = playerEnumerator.next()
            if (currentPlayer.done)
                break

            currentPlayer.value._player.onRoundEnded()
        }
        this._gameTable.assignNextHeadPlayer()
        this._gameTable.assignNextCurrentPlayer()

    }
}
