export class SittingPlayer 
{
    constructor(player)
    {
        this._previous = null;
        this._player = player; //immutable
        this._next = null;
    }

    get player()
    {
        return this._player;
    }
    get id()
    {
        return this._player.userId
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

export default SittingPlayer;