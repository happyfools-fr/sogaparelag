class GameTable {
    constructor(playerIds) {
        this._countOfPlayer = playerIds.lenght
        this._playingPlayer = new PlayerOnTable();
        this._fillTable(playerIds);
    }
    
    fillTable(playerIds) {
        //cas 0
        this._playingPlayer._previousPlayer = playerIds[playerIds.lenght - 1];
        this._playingPlayer._playerId = playerIds[0];
        let previousCreatedPlayerOnTable = this._playingPlayer;
        //0 .. N-1
        for (let i = 0; i < playerIds.lenght - 1; i++) {
            let player = new PlayerOnTable();
            this.previousCreatedPlayerOnTable._nextPlayer = player;
            this.player._previousPlayer = previousCreatedPlayerOnTable;
            this.player._playerId = playerIds[i];
            previousCreatedPlayerOnTable = player;
        }
        //cas N-1
        previousCreatedPlayerOnTable._nextPlayer = this._playingPlayer;
    }

    killPlayer(playerId)
    {
        let checkedPlayerCount = 0;
        let playerFound = false;
        while (checkedPlayerCount < this._countOfPlayer)
        {
            checkedPlayerCount++
            if (this._playingPlayer._playerId == playerId)
            {
                playerFound = true
                let previousPlayer = this._playingPlayer._previousPlayer
                let nextPlayer = this._playingPlayer._nextPlayer
                previousPlayer._nextPlayer = nextPlayer
                nextPlayer._previousPlayer = previousPlayer
                this._countOfPlayer --
                break
            }
            this._playingPlayer = this._playingPlayer._nextPlayer
        }
 
        return playerFound;
    }
}
