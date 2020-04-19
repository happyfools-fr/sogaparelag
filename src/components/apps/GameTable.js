import PlayerOnTable from './PlayerOnTable'

export class GameTable {
    constructor(playerIds) {
        this._playerIds = playerIds
        this._playersCount = playerIds.length
        this._headPlayer = new PlayerOnTable(playerIds[0]);
        this._headPlayer = this._headPlayer;
        this._initTable(playerIds);
    }

    _initTable(playerIds) {
        let previousCreatedPlayerOnTable = this._headPlayer;
        //1 .. N-1
        for (let i = 1; i < playerIds.length; i++) {
            let player = new PlayerOnTable(playerIds[i]);
            previousCreatedPlayerOnTable._nextPlayer = player;
            player._previousPlayer = previousCreatedPlayerOnTable;
            previousCreatedPlayerOnTable = player;
        }
        //cas N-1
        this._headPlayer._previousPlayer = previousCreatedPlayerOnTable;
        previousCreatedPlayerOnTable._nextPlayer = this._headPlayer;
    }

    killPlayer(playerId)
    {
        let checkedPlayerCount = 0;
        let playerEnumerator = this.getPlayerEnumerator()
        while (true)
        {
            let currentPlayer = playerEnumerator.next()
            if (currentPlayer.done)
                return false

            if (currentPlayer.value._playerId == playerId)
            {
                let previousPlayer = currentPlayer.value._previousPlayer
                let nextPlayer = currentPlayer.value._nextPlayer
                previousPlayer._nextPlayer = nextPlayer
                nextPlayer._previousPlayer = previousPlayer
                this._playersCount --

                if (this._headPlayer._playerId == currentPlayer.value._playerId)
                    this._headPlayer = this._headPlayer._nextPlayer

                return true;
            }
        }
    }

    assignNextHeadPlayer()
    {
        this._headPlayer = this._headPlayer._previousPlayer;
    }

    * getPlayerEnumerator()
    {
        yield this._headPlayer;
        let currentPlayer = this._headPlayer._nextPlayer;
        while (currentPlayer._playerId != this._headPlayer._playerId)
        {
            yield currentPlayer;
            currentPlayer = currentPlayer._nextPlayer
        }
    }
}

export default GameTable;
