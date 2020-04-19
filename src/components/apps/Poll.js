class Polling
{
    //should assert playerIds unique + headPlayerId in playerIds
    constructor(gameTable)
    {
        this._gameTable = gameTable;
    }
    
    vote()
    {
        votesByPlayerId = this._initVotingPolls()
        let playerEnumerator = this._gameTable.getPlayerEnumerator()
        while (true)
        {
            let currentPlayer = playerEnumerator.next()
            if (currentPlayer.done)
                break   
                
            let chosenPlayerId = currentPlayer.value.choosePlayerToVoteAgainst(this._gameTable._playerIds)
            votesByPlayerId[chosenPlayerId] ++
        }
        let playersWithMaxVote = _getPlayersWithMaxVote(votesByPlayerId)
        if (playersWithMaxVote.length > 1)
            return this._gameTable._headPlayer.choosePlayerToVoteAgainst(this._gameTable._playerIds)
        return playersWithMaxVote[0]
    }

    _initVotingPolls()
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
        return votesByPlayerId;
    }

    _getPlayersWithMaxVote(votesByPlayerId)
    {
        let max = -1
        let playerIdsWithMax = []
        foreach(voteByPlayerId in votesByPlayerId)
        {
            if (voteByPlayerId.value > max)
            {
                max = voteByPlayerId.value;
                playerIdsWithMax = [voteByPlayerId.key]
            }

            if (voteByPlayerId.value < max)
                continue
            
            //voteByPlayerId.value == max
            playerIdsWithMax.add(voteByPlayerId.key)
        }
        return playerIdsWithMax
    }


};
