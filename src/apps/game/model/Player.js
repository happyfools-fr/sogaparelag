import {RoundAction} from './RoundAction'

/**
 * Player holds player state in game
 *
 */
export default class Player
{
    constructor(loggedInUser)
    {
        this.userId = loggedInUser.uid
        this.nickName = loggedInUser.displayName
        this._sickenessLevel = 0
        this.isDead = false
        this.currentHand = null
    }


    get id()
    {
        return this.userId;
    }

    get _id()
    {
        return this.userId;
    }

    get isSick()
    {
        return this._sickenessLevel !== 0;
    }

    onGetSick()
    {
        this._sickenessLevel = 2;
    }

    onRoundEnded()
    {
        this._sickenessLevel --;
        this._sickenessLevel = (this._sickenessLevel < 0) ? 0 : this._sickenessLevel;
    }

    choosePlayerIdToVoteAgainst(players)
    {
        //TODO
        return players[0];
    }

    chooseFinalPlayerIdToVoteAgainst(players)
    {
        //TODO
        return players[0];
    }

    chooseActionToPerform()
    {
        //TODO
        return RoundAction.CollectFood;
        //return RoundAction.CollectWood;
        //return RoundAction.CollectWater;
    }

    additionalWoodRequest()
    {
      return 0
    }

    static async pushOrUpdateRecord(db, player) {
      await db.collection("player").doc(player.userId).set(
        {...player}
        );
      return player;
    }

    static createAndPushPlayer(db, user) {
      const player = new Player(user);
      return Player.pushOrUpdateRecord(db, player);
    }

}
