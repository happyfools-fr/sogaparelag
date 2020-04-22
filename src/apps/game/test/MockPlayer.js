import {Player} from '../model/Player'

export class MockPlayer extends Player
{  
    constructor(loggedInUser)
    {
        super(loggedInUser)

        this._choosePlayerIdToVoteAgainst = 0
        this._chooseFinalPlayerIdToVoteAgainst = 0
        this._chooseActionToPerform = 0
    }

    choosePlayerIdToVoteAgainst(players)
    {
        return this._choosePlayerIdToVoteAgainst
    }

    chooseFinalPlayerIdToVoteAgainst(players)
    {
        return this._chooseFinalPlayerIdToVoteAgainst
    }

    chooseActionToPerform()
    {
        return this._chooseActionToPerform
    }
}
