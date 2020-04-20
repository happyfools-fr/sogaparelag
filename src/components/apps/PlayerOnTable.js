export class PlayerOnTable {
    constructor(playerId)
    {
        this._previous = null;
        this._playerId = playerId; //immutable
        this._next = null;
    }

    get previous()
    {
        return this._previous;
    }
    set previous(value)
    {
        this._previous = value;
    }

    get next()
    {
        return this._next;
    }
    set next(value)
    {
        this._next = value;
    }
}

export default PlayerOnTable;