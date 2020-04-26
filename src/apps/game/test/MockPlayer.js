import Player from '../model/Player'
import {RoundAction} from '../model/RoundAction'

export class MockPlayer extends Player
{
    constructor(loggedInUser)
    {
        super(loggedInUser)

        this._choosePlayerIdToVoteAgainst = 0
        this._chooseFinalPlayerIdToVoteAgainst = 0
        this._chooseActionToPerform = RoundAction.Nothing
        this._additionalWoodRequest = 0
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

    additionalWoodRequest()
    {
        return this._additionalWoodRequest
    }
}
