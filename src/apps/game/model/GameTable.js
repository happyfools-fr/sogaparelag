import SittingPlayer from './SittingPlayer'
import Player from './Player'
import Utils from './Utils'

export const SERDE_KEYS = [
  'players', 'playersCount', 'indexOfHeadPlayer',
  'indexOfCurrentPlayer', 'roundIndex'
];

export class GameTable
{
    get headPlayer()
    {
        return this._headPlayer.player
    }

    constructor(players, indexOfHeadPlayer = 0, indexOfCurrentPlayer = 0, roundIndex = 0)
    {
        this.players = players
        this.playersCount = players.length

        this.indexOfHeadPlayer = indexOfHeadPlayer
        this._headPlayer = new SittingPlayer(players[indexOfHeadPlayer]);

        this._initTable(players, indexOfHeadPlayer);

        this.indexOfCurrentPlayer = indexOfCurrentPlayer
        this._initCurrentPlayer();

        this.roundIndex = roundIndex ? roundIndex : 1;
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

            if (currentPlayer.value.userId === currentPlayerId)
            {
                this.currentPlayer = currentPlayer.value
                return
            }
        }
    }

    onRoundStarts()
    {
        this.endOfRound = false
        this.currentPlayer = this._headPlayer
        this.indexOfCurrentPlayer = this.indexOfHeadPlayer
        this.roundIndex++;
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
        
        this.currentPlayer.player.hasPlayedThisRound = true

        if (this.currentPlayer.next === this._headPlayer)
        {
            this.endOfRound = true
            return
        }

        this.currentPlayer = this.currentPlayer.next
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

    // /*
    // * Retrieve the HealthyPlayerEnumerator with default position in enum
    // to match the currentPlayer in state
    // */
    // getPositionedHealthyPlayerEnumerator(){
    //   let healthyPlayerEnumerator = this.getHealthyPlayerEnumerator()
    //   let retrievedPlayer;
    //   while(true)
    //   {
    //     retrievedPlayer = healthyPlayerEnumerator.next()
    //     if (retrievedPlayer.done){
    //       healthyPlayerEnumerator = this.getHealthyPlayerEnumerator();
    //       break
    //     }
    //     if (retrievedPlayer.value._player.userId === this.currentPlayer.userId)
    //     {
    //       break
    //     }
    //   }
    //   return healthyPlayerEnumerator;
    // }
    //
    // getInfinitePositionedHealthyPlayerEnumerator(){
    //   let healthyPlayerEnumerator;
    //   if (this.isEndOfRound()){
    //     healthyPlayerEnumerator = this.getHealthyPlayerEnumerator();
    //   } else {
    //     healthyPlayerEnumerator = this.getPositionedHealthyPlayerEnumerator();
    //   }
    //   return healthyPlayerEnumerator;
    // }

    assignNextHeadPlayer()
    {
        this._headPlayer = this._headPlayer.previous;
        this.indexOfHeadPlayer = this.indexOfHeadPlayer === 0 ?
                                  this.playersCount - 1 :
                                  this.indexOfHeadPlayer - 1
    }

    assignNextCurrentPlayer()
    {
        this.currentPlayer = this.currentPlayer.next;
        this.indexOfCurrentPlayer = this.indexOfCurrentPlayer === this.playersCount - 1 ?
                                      0 : this.indexOfCurrentPlayer + 1
    }

    // isEndOfRound()
    // {
    //   let iter = this.getPositionedHealthyPlayerEnumerator();
    //   let nextSittingPlayer = iter.next();
    //   return nextSittingPlayer.done;
    // }

    // getNextSittingPlayer()
    // {
    //   let healthyPlayerEnumerator = this.getInfinitePositionedHealthyPlayerEnumerator();
    //   let nextSittingPlayer = healthyPlayerEnumerator.next();
    //   return nextSittingPlayer;
    // }
    //
    //
    // updatePlayer(player)
    // {
    //   this.players = this.players.map( p => {
    //     if(p.userId === player.userId){
    //       return player;
    //     } else {
    //       return p;
    //     }
    //   });
    //   if(this.currentPlayer.userId === player.userId)
    //   {
    //     this.currentPlayer = player;
    //   }
    // }

    // updateAfterRoundAction(currentPlayerUpdated)
    // {
    //     // Update current player state
    //     this.updatePlayer(currentPlayerUpdated)
    //     return this.isEndOfRound();
    // }

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
