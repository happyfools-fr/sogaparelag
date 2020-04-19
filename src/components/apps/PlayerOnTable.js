class PlayerOnTable {
    constructor(previousPlayer, playerId, nextPlayer) {
        this._previousPlayer = previousPlayer;
        this._playerId = playerId; //immutable
        this._nextPlayer = nextPlayer;
    }
}
