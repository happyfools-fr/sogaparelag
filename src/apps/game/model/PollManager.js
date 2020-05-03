export class PollManager
{
    constructor(gameTable)
    {
        this._gameTable = gameTable;
    }

    /*
    * The underlying type vote is held in context: 
    *  context = RoundAction.WaterVote or RoundAction.WaterVote
    */
    voteWithContext(context)
    {
        let votesByPlayerId = this._initVotingPolls()
        let playerEnumerator = this._gameTable.getPlayerEnumerator()
        while (true)
        {
            let currentPlayer = playerEnumerator.next()
            if (currentPlayer.done){
                break;
            }
            let chosenPlayerId = currentPlayer.value.player.choosePlayerIdToVoteAgainst(this._gameTable.players, context)
            console.log("voteWithContext, chosenPlayerId", chosenPlayerId)
            console.log("voteWithContext, votesByPlayerId[chosenPlayerId] A", votesByPlayerId[chosenPlayerId])
            votesByPlayerId[chosenPlayerId]  = votesByPlayerId[chosenPlayerId] + 1;
            console.log("voteWithContext, votesByPlayerId[chosenPlayerId] B", votesByPlayerId[chosenPlayerId])

        }

        console.log("votesByPlayerId: ", votesByPlayerId);
        
        let playersWithMaxVote = this._getPlayerIdsWithMaxVote(votesByPlayerId)
        if (playersWithMaxVote.length > 1)
        {
            let finalVoteByHeadPlayer = this._gameTable.headPlayer.chooseFinalPlayerIdToVoteAgainst(playersWithMaxVote)

            if (playersWithMaxVote.includes(finalVoteByHeadPlayer)) {
                return finalVoteByHeadPlayer;
            }
            throw Error("Error in voteWithContext")
        }

        console.log("playersWithMaxVote[0]: ", playersWithMaxVote[0]);

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
