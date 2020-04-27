import Player from './Player'
import LoggedInUser from  './LoggedInUser'
import Utils from "./Utils";

export const SERDE_KEYS = ['_player', '_next', '_previous']

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
        return this._player.id
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

    toDoc() {
        return {
            _player: this._player,
            _next: this._next,
            _previous: this._previous,
        }
    }
    
    fromDoc(doc) {
      if(doc && Utils.checker(SERDE_KEYS, Object.keys(doc))){
          const player = new Player(new LoggedInUser("", ""))      
          player.fromDoc(doc['_player'])
          this._player = doc['_player'] ? player : null;

          const next = new Player(new LoggedInUser("", ""))
          next.fromDoc(doc['_next'])
          this._next = doc['_next'] ? next : null;

          const previous = new Player(new LoggedInUser("", ""))
          previous.fromDoc(doc['_previous'])
          this._previous = doc['_previous'] ? previous : null;
      }
    }
}

export default SittingPlayer;
