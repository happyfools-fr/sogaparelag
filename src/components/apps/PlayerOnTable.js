export class PlayerOnTable {
    constructor(playerId)
    {
        this._previousPlayer = null;
        this._playerId = playerId; //immutable
        this._nextPlayer = null;
    }

    set previousPlayer(value)
    {
        this._previousPlayer = value;
    }

    set nextPlayer(value)
    {
        this._nextPlayer = value;
    }
}

export default PlayerOnTable;