class Polling
{
    //should assert playerIds unique + headPlayerId in playerIds
    constructor(playerIds, headPlayerId)
    {
        this._playerIds = playerIds;
        this._headPlayerId = headPlayerId;
    }
    
    set HeadPlayerId(value)
    {
        this._headPlayerId = value;
    }

    voteToKill()
    {
        votesByPlayerId = {};
        foreach(playerId in this._playerIds)      
       {
            votesByPlayerId[playerId] = 0;
       } 

    }

};

class GameTable
{
    constructor(playerIds)
    {
        this._playingPlayer = new PlayerOnTable();
        this._fillTable(playerIds);
    }

    fillTable(playerIds)
    {
        //cas 0
        this._playingPlayer._previousPlayer = playerIds[playerIds.lenght - 1]
        this._playingPlayer._player = playerIds[0];

        let previousCreatedPlayerOnTable = this._playingPlayer;
        
        //0 .. N-1
        for(let i=0 ; i < playerIds.lenght - 1 ; i++)
        {
            let player = new PlayerOnTable();

            this.previousCreatedPlayerOnTable._nextPlayer = player;
            this.player._previousPlayer = previousCreatedPlayerOnTable;
            this.player._player = playerIds[i];
            previousCreatedPlayerOnTable = player;
        }

        //cas N-1
        previousCreatedPlayerOnTable._nextPlayer = this._playingPlayer;
    }
}

class PlayerOnTable
{
    constructor(previousPlayer, player, nextPlayer)
    {
        this._previousPlayer = previousPlayer;
        this._player = player; //immutable
        this._nextPlayer = nextPlayer;
    }

    getNextPlayer()
    {
        return this._nextPlayer;
    }
}