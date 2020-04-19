class Polling
{
    //should assert playerIds unique + headPlayerId in playerIds
    constructor(gameTable)
    {
        this._gameTable = gameTable;
    }
    
    voteToKill()
    {
        votesByPlayerId = {};
        let playerEnumerator = this._gameTable.getPlayerEnumerator()
        while (true)
        {
            let currentPlayer = playerEnumerator.next()
            if (currentPlayer.done)
                break   
                
            votesByPlayerId[currentPlayer._playerId] = 0
        }
    }

};
