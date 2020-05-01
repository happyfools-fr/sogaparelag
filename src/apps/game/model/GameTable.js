import SittingPlayer from './SittingPlayer'
import Player from './Player'
import Utils from './Utils'

export const SERDE_KEYS = [
  'players', 'playersCount', 'indexOfHeadPlayer',
  'indexOfCurrentPlayer', 'roundIndex'
];

export class GameTable
{
    
    constructor(players, indexOfHeadPlayer = 0, indexOfCurrentPlayer = 0, roundIndex = 1)
    {
        this.players = players
        this.playersCount = players.length

        this.indexOfHeadPlayer = indexOfHeadPlayer
        this._headPlayer = new SittingPlayer(players[indexOfHeadPlayer]);

        this._initTable(players, indexOfHeadPlayer);

        this.indexOfCurrentPlayer = indexOfCurrentPlayer
        this._initCurrentPlayer();
        console.log("_initCurrentPlayer over");
        this.roundIndex = roundIndex ? roundIndex : 1;
        
        this.endOfRound = false;
    }

    get headPlayer()
    {
        return this._headPlayer.player
    }
    
    get currentPlayer()
    {
        return this._currentPlayer.player
    }
    
    * getPlayerEnumerator()
    {
        yield this._headPlayer;
        let currentPlayer = this._headPlayer.next;
        while (currentPlayer.player !== this._headPlayer.player)
        {
            yield currentPlayer;
            currentPlayer = currentPlayer.next
        }
    }

    * getHealthyPlayerEnumerator()
    {
        if (!this._headPlayer.player.isSick)
            yield this._headPlayer;

        let currentPlayer = this._headPlayer.next;
        while (currentPlayer.player !== this._headPlayer.player)
        {
            if (!currentPlayer.player.isSick)
                yield currentPlayer;
            currentPlayer = currentPlayer.next
        }
    }

    assignNextHeadPlayer()
    {
        this._headPlayer = this._headPlayer.previous;
        this.indexOfHeadPlayer = this.indexOfHeadPlayer === 0 ?
                                  this.playersCount - 1 :
                                  this.indexOfHeadPlayer - 1
    }

    assignNextCurrentPlayer()
    {
        this._currentPlayer = this._currentPlayer.next;
        this.indexOfCurrentPlayer = this.indexOfCurrentPlayer === this.playersCount - 1 ?
                                      0 : this.indexOfCurrentPlayer + 1
    }
    
    _initTable(players, indexOfHeadPlayer = 0)
    {
        let previousCreatedPlayerOnTable = this._headPlayer;

        //indexOfHeadPlayer+1 .. N-1
        for (let i = indexOfHeadPlayer + 1; i < players.length; i++) {
            let player = new SittingPlayer(players[i]);
            previousCreatedPlayerOnTable.next = player;
            player.previous = previousCreatedPlayerOnTable;
            previousCreatedPlayerOnTable = player;
        }

        //0 .. indexOfHeadPlayer-1
        for (let i = 0; i < indexOfHeadPlayer; i++) {
            let player = new SittingPlayer(players[i]);
            previousCreatedPlayerOnTable.next = player;
            player.previous = previousCreatedPlayerOnTable;
            previousCreatedPlayerOnTable = player;
        }

        //cas indexOfHeadPlayer-1
        this._headPlayer.previous = previousCreatedPlayerOnTable;
        previousCreatedPlayerOnTable.next = this._headPlayer;
    }

    _initCurrentPlayer()
    {
        let currentPlayerId = this.players[this.indexOfCurrentPlayer].userId
        let playerEnumerator = this.getHealthyPlayerEnumerator()
        while (true)
        {
            let currentPlayer = playerEnumerator.next()
            if (currentPlayer.done)
                throw Error('Current Player Index out of range')

            if (currentPlayer.value._player.userId === currentPlayerId)
            {
                this._currentPlayer = currentPlayer.value
                return
            }
        }
    }

    onRoundStarts()
    {
        this.assignNextHeadPlayer();
        this.endOfRound = false
        this._currentPlayer = this._headPlayer.next
        this.indexOfCurrentPlayer = this.indexOfCurrentPlayer === this.playersCount - 1 ?
                                      0 : this.indexOfCurrentPlayer + 1
        this.roundIndex = this.roundIndex + 1;
        let playerEnumerator = this.getPlayerEnumerator()
        while (true)
        {
            let currentPlayer = playerEnumerator.next()
            if (currentPlayer.done)
                return

            currentPlayer.value.player.hasPlayedThisRound = false
        }
    }

    onPlayerTurnEnded(player)
    {
        //ASSERT this.currentPlayer.player === player
        this._currentPlayer.player.hasPlayedThisRound = true

        if (this._currentPlayer.next === this._headPlayer)
        {
            this.endOfRound = true
            return
        }
        
        this.assignNextCurrentPlayer();
    }

    killPlayer(playerIdToKill)
    {
        let playerEnumerator = this.getPlayerEnumerator()
        while (true)
        {
            let currentPlayer = playerEnumerator.next()
            if (currentPlayer.done)
                return false

            if (currentPlayer.value.id === playerIdToKill)
            {
                let previousPlayer = currentPlayer.value.previous
                let nextPlayer = currentPlayer.value.next
                previousPlayer.next = nextPlayer
                nextPlayer.previous = previousPlayer

                if (this._headPlayer.player === currentPlayer.value.player)
                    this._headPlayer = this._headPlayer.next

                this._refreshPlayers()
                return true;
            }
        }
    }

    _refreshPlayers()
    {
        this.players = []
        let playerEnumerator = this.getPlayerEnumerator()
        let it = 0

        while (true)
        {
            let currentPlayer = playerEnumerator.next()
            if (currentPlayer.done)
                break

            if (currentPlayer.value.player === this._headPlayer.player)
              this.indexOfHeadPlayer = it

            this.players.push(currentPlayer.value.player)
            it++
        }

        this.playersCount = this.players.length
    }

    toDoc() {
        return {
          players: this.players.map((p) => {return p ? p.toDoc() : null;}),
          playersCount: this.playersCount,
          indexOfHeadPlayer: this.indexOfHeadPlayer,
          indexOfCurrentPlayer: this.indexOfCurrentPlayer,
          roundIndex: this.roundIndex,
        }
    }

    static fromDoc(doc) {
      let gameTable;
      if(doc && Utils.checker(SERDE_KEYS, Object.keys(doc))){
        const players = doc['players'].map((pDoc) => {
          return Player.fromDoc(pDoc);
        })
        const indexOfHeadPlayer = doc['indexOfHeadPlayer'];
        const indexOfCurrentPlayer = doc['indexOfCurrentPlayer']
        gameTable = new GameTable(
          players, indexOfHeadPlayer, indexOfCurrentPlayer, parseInt(doc['roundIndex'])
        );
      }
      return gameTable;
    }
}

export default GameTable;
