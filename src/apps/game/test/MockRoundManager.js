import {RoundManager} from '../model/RoundManager'


export class MockRoundManager extends RoundManager
{
    constructor(gameTable, waterManager, foodManager, woodManager)
    {
        super(gameTable, waterManager, foodManager, woodManager)
        this._waterInventory = 0
        this._foodInventory = 0
        this._woodInventory = 0
        this._playersToGetSick = []
    }

    play()
    {
        this._waterManager.inventory = this._waterInventory
        this._foodManager.inventory = this._foodInventory
        this._woodManager.inventory = this._woodInventory
        this._applySickness()
    }

    _applySickness()
    {
        let playerEnumerator = this._gameTable.getPlayerEnumerator()

        while (true)
        {
            let currentPlayer = playerEnumerator.next()
            if (currentPlayer.done)
                break

            if (this._playersToGetSick.includes(currentPlayer.value.id))
                currentPlayer.player.onGetSick()
        }
    }
}
