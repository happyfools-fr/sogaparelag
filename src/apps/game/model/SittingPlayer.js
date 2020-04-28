import Player from './Player'
import LoggedInUser from  './LoggedInUser'
import Utils from "./Utils";

export const SERDE_KEYS = ['_next', '_player', '_previous']

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
          _next: null,
          _player: this._player.toDoc(),
          _previous: null,
        }
    }
    
    static fromDoc(doc) {
      let sittingPlayer = null;
      if(doc && Utils.checker(SERDE_KEYS, Object.keys(doc))){
          const player = Player.fromDoc(doc['_player']);
          sittingPlayer = new SittingPlayer(player);
          sittingPlayer._previous = null;
          sittingPlayer._next = null;          
      }
      return sittingPlayer;
    }
}

export default SittingPlayer;
