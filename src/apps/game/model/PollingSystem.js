import GameTable from './GameTable'

export class PollingSystem
{
    constructor(gameTable)
    {
        this._gameTable = gameTable;
    }
    
    vote()
    {
        votesByPlayerId = this._initVotingPolls()
        let healthyPlayerEnumerator = this._gameTable.getHealthyPlayerEnumerator()
        while (true)
        {
            let currentPlayer = healthyPlayerEnumerator.next()
            if (currentPlayer.done)
                break   
                
            let chosenPlayerId = currentPlayer.value.choosePlayerToVoteAgainst(this._gameTable.players)
            votesByPlayerId[chosenPlayerId] ++
        }
        let playersWithMaxVote = _getPlayersWithMaxVote(votesByPlayerId)
        if (playersWithMaxVote.length > 1)
            return this._gameTable.headPlayer.chooseFinalPlayerToVoteAgainst(this._gameTable.players)
        return playersWithMaxVote[0]
    }

    _initVotingPolls()
    {
        let votesByPlayerId = {};
        let playerEnumerator = this._gameTable.getPlayerEnumerator()
        while (true)
        {
            let currentPlayer = playerEnumerator.next()
            if (currentPlayer.done)
                break   
                
            votesByPlayerId[currentPlayer.value.id] = 0
        }
        return votesByPlayerId;
    }

    _getPlayersWithMaxVote(votesByPlayerId)
    {
        let max = -1
        let playerIdsWithMax = []
        for(let playerId in votesByPlayerId)
        {
            if (votesByPlayerId[playerId] > max)
            {
                max = votesByPlayerId[playerId];
                playerIdsWithMax = [playerId]
            }
            else if (votesByPlayerId[playerId] == max)
            {            
                playerIdsWithMax.push(playerId)
            }
        }
        return playerIdsWithMax
    }
};

export default PollingSystem;