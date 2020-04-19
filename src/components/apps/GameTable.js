import PlayerOnTable from './PlayerOnTable'

export class GameTable {
    constructor(playerIds) {
        this._playersCount = playerIds.length
        this._playingPlayer = new PlayerOnTable(playerIds[0]);
        this._fillTable(playerIds);
    }

    _fillTable(playerIds) {
        let previousCreatedPlayerOnTable = this._playingPlayer;
        //1 .. N-1
        for (let i = 1; i < playerIds.length; i++) {
            let player = new PlayerOnTable(playerIds[i]);
            previousCreatedPlayerOnTable._nextPlayer = player;
            player._previousPlayer = previousCreatedPlayerOnTable;
            previousCreatedPlayerOnTable = player;
        }
        //cas N-1
        this._playingPlayer._previousPlayer = previousCreatedPlayerOnTable;
        previousCreatedPlayerOnTable._nextPlayer = this._playingPlayer;
    }

    killPlayer(playerId)
    {
        let checkedPlayerCount = 0;
        let playerFound = false;
        while (checkedPlayerCount < this._playersCount)
        {
            checkedPlayerCount++
            if (this._playingPlayer._playerId == playerId)
            {
                playerFound = true
                let previousPlayer = this._playingPlayer._previousPlayer
                let nextPlayer = this._playingPlayer._nextPlayer
                previousPlayer._nextPlayer = nextPlayer
                nextPlayer._previousPlayer = previousPlayer
                this._playersCount --
                break
            }
            this._playingPlayer = this._playingPlayer._nextPlayer
        }
 
        return playerFound;
    }

    switchHeadPlayer(playerId)
    {
        let checkedPlayerCount = 0;
        while (checkedPlayerCount < this._countOfPlayer)
        {
            checkedPlayerCount++
            if (this._playingPlayer._playerId == playerId)
                return true
        }
 
        return false;
    }
}

export default GameTable;
