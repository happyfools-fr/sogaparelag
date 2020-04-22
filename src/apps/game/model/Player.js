import {RoundAction} from './RoundAction'

/** 
 * Player holds player state in game
 * 
 */
export class Player 
{  
    constructor(loggedInUser) 
    {
        this.userId = loggedInUser.id
        this.nickName = loggedInUser.displayName
        this._sickenessLevel = 0
        this.isDead = false
        this.currentHand = null
    }

    get id()
    {
        return this.userId 
    }

    get isSick()
    {
        return this._sickenessLevel != 0
    }

    onGetSick()
    {
        this._sickenessLevel = 2
    }

    onRoundEnded()
    {
        this._sickenessLevel --;
        this._sickenessLevel = (this._sickenessLevel < 0) ? 0 : this._sickenessLevel;
    }

    choosePlayerIdToVoteAgainst(players)
    {
        //TODO
        return players[0]
    }

    chooseFinalPlayerIdToVoteAgainst(players)
    {
        //TODO
        return players[0]
    }

    chooseActionToPerform()
    {
        //TODO
        return RoundAction.CollectFood;
        //return RoundAction.CollectWood;
        //return RoundAction.CollectWater;
    }
}
