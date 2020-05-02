export class PollManager
{
    constructor(gameTable)
    {
        this._gameTable = gameTable;
    }

    voteWithContext(context)
    {
        let votesByPlayerId = this._initVotingPolls()
        let healthyPlayerEnumerator = this._gameTable.getHealthyPlayerEnumerator()
        while (true)
        {
            let currentPlayer = healthyPlayerEnumerator.next()
            if (currentPlayer.done)
                break

            let chosenPlayerId = currentPlayer.value.player.choosePlayerIdToVoteAgainst(this._gameTable.players, context)
            votesByPlayerId[chosenPlayerId] ++
        }
        let playersWithMaxVote = this._getPlayerIdsWithMaxVote(votesByPlayerId)
        if (playersWithMaxVote.length > 1)
        {
            let finalVoteByHeadPlayer = this._gameTable.headPlayer.chooseFinalPlayerIdToVoteAgainst(playersWithMaxVote)

            if (playersWithMaxVote.includes(finalVoteByHeadPlayer))
                return finalVoteByHeadPlayer

            throw Error()
        }

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

    _getPlayerIdsWithMaxVote(votesByPlayerId)
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
            else if (votesByPlayerId[playerId] === max)
            {
                playerIdsWithMax.push(playerId)
            }
        }
        return playerIdsWithMax
    }
};

export default PollManager;
