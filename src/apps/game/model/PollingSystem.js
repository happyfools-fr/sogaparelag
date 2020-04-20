export class PollingSystem
{
    constructor(gameTable)
    {
        this._gameTable = gameTable;
    }
    
    vote()
    {
        let votesBySittingPlayerId = this._initVotingPolls()
        let sittingHealthyPlayerEnumerator = this._gameTable.getHealthySittingPlayerEnumerator()

        while (true)
        {
            let currentSittingPlayer = sittingHealthyPlayerEnumerator.next()
            if (currentSittingPlayer.done)
                break   
                
            let chosenPlayerId = currentSittingPlayer.value.choosePlayerToVoteAgainst(this._gameTable.players)
            votesBySittingPlayerId[chosenPlayerId] ++
        }
        let sittingPlayersWithMaxVote = PollingSystem._getSittingPlayersWithMaxVote(votesBySittingPlayerId)

        if (sittingPlayersWithMaxVote.length > 1)
            return this._gameTable.headSittingPlayer.chooseFinalPlayerToVoteAgainst(this._gameTable.getSittingPlayers)
        return sittingPlayersWithMaxVote[0]
    }

    _initVotingPolls()
    {
        let votesBySittingPlayerId = {};
        let sittingPlayerEnumerator = this._gameTable.getSittingPlayerEnumerator()
        while (true)
        {
            let currentSittingPlayer = sittingPlayerEnumerator.next()
            if (currentSittingPlayer.done)
                break   
            
            votesBySittingPlayerId[currentSittingPlayer.value.id] = 0
        }
        return votesBySittingPlayerId;
    }

    static _getSittingPlayersWithMaxVote(votesBySittingPlayerId)
    {
        let max = -1
        let sittingPlayerIdsWithMax = []
        for(let sittingPlayerId in votesBySittingPlayerId)
        {
            if (votesBySittingPlayerId[sittingPlayerId] > max)
            {
                max = votesBySittingPlayerId[sittingPlayerId];
                sittingPlayerIdsWithMax = [sittingPlayerId]
            }
            else if (votesBySittingPlayerId[sittingPlayerId] == max)
            {            
                sittingPlayerIdsWithMax.push(sittingPlayerId)
            }
        }
        
        return sittingPlayerIdsWithMax
    }
};


export default PollingSystem;