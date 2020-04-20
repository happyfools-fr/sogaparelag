import PlayerOnTable from './PlayerOnTable'

export class GameTable {
    constructor(playerIds) {
        this._playerIds = playerIds
        this._playersCount = playerIds.length
        this._headPlayer = new PlayerOnTable(playerIds[0]);
        this._initTable(playerIds);
    }

    _initTable(playerIds) {
        let previousCreatedPlayerOnTable = this._headPlayer;
        //1 .. N-1
        for (let i = 1; i < playerIds.length; i++) {
            let player = new PlayerOnTable(playerIds[i]);
            previousCreatedPlayerOnTable.next = player;
            player.previous = previousCreatedPlayerOnTable;
            previousCreatedPlayerOnTable = player;
        }
        //cas N-1
        this._headPlayer.previous = previousCreatedPlayerOnTable;
        previousCreatedPlayerOnTable.next = this._headPlayer;
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
                let previousPlayer = currentPlayer.value.previous
                let nextPlayer = currentPlayer.value.next
                previousPlayer.next = nextPlayer
                nextPlayer.previous = previousPlayer
                this._playersCount --

                if (this._headPlayer._playerId == currentPlayer.value._playerId)
                    this._headPlayer = this._headPlayer.next

                return true;
            }
        }
    }

    assignNextHeadPlayer()
    {
        this._headPlayer = this._headPlayer.previous;
    }

    * getPlayerEnumerator()
    {
        yield this._headPlayer;
        let currentPlayer = this._headPlayer.next;
        while (currentPlayer._playerId != this._headPlayer._playerId)
        {
            yield currentPlayer;
            currentPlayer = currentPlayer.next
        }
    }
}

export default GameTable;
