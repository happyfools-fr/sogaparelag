import SittingPlayer from './SittingPlayer'
import Player from './Player'
import Utils from './Utils'

export const SERDE_KEYS = [
  'players', 'playersCount', 'indexOfHeadPlayer',
  'currentPlayer', 'roundIndex'
];

export class GameTable
{
    constructor(players, indexOfHeadPlayer = 0, currentPlayer=null, roundIndex=0)
    {
        this.players = players
        this.playersCount = players.length
        this.indexOfHeadPlayer = indexOfHeadPlayer
        this._headPlayer = new SittingPlayer(players[indexOfHeadPlayer]);
        this._initTable(players);

        //
        this.currentPlayer = currentPlayer ? currentPlayer : this._headPlayer.player;
        this.roundIndex = roundIndex ? roundIndex : 1;
    }

    get headPlayer()
    {
        return this._headPlayer.player
    }

    // _initTable(players)
    // {
    //     let previousCreatedPlayerOnTable = this._headPlayer;
    //     //1 .. N-1
    //     for (let i = 1; i < players.length; i++) {
    //         let player = new SittingPlayer(players[i]);
    //         previousCreatedPlayerOnTable.next = player;
    //         player.previous = previousCreatedPlayerOnTable;
    //         previousCreatedPlayerOnTable = player;
    //     }
    //     //cas N-1
    //     this._headPlayer.previous = previousCreatedPlayerOnTable;
    //     previousCreatedPlayerOnTable.next = this._headPlayer;
    // }


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

    // _refreshPlayers()
    // {
    //     this.players = []
    //     let playerEnumerator = this.getPlayerEnumerator()
    //
    //     while (true)
    //     {
    //         let currentPlayer = playerEnumerator.next()
    //         if (currentPlayer.done)
    //             break
    //
    //         this.players.push(currentPlayer.value.player)
    //     }
    //
    //     this.playersCount = this.players.length
    // }

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

    /*
    * Retrieve the HealthyPlayerEnumerator with default position in enum
    to match the currentPlayer in state
    */
    getPositionedHealthyPlayerEnumerator(){
      let healthyPlayerEnumerator = this.getHealthyPlayerEnumerator()
      let retrievedPlayer;
      while(true)
      {
        retrievedPlayer = healthyPlayerEnumerator.next()
        if (retrievedPlayer.done){
          healthyPlayerEnumerator = this.getHealthyPlayerEnumerator();
          break
        }
        if (retrievedPlayer.value._player.userId === this.currentPlayer.userId)
        {
          break
        }
      }
      return healthyPlayerEnumerator;
    }

    getInfinitePositionedHealthyPlayerEnumerator(){
      let healthyPlayerEnumerator;
      if (this.isEndOfRound()){
        healthyPlayerEnumerator = this.getHealthyPlayerEnumerator();
      } else {
        healthyPlayerEnumerator = this.getPositionedHealthyPlayerEnumerator();
      }
      return healthyPlayerEnumerator;
    }

    assignNextHeadPlayer()
    {
        this._headPlayer = this._headPlayer.previous;
        // let indexOfHeadPlayer =
        //   this.indexOfHeadPlayer == 0
        //   ? this.playersCount - 1
        //   : this.indexOfHeadPlayer - 1
        // this._initTable(this.players, indexOfHeadPlayer)
    }

    isEndOfRound()
    {
      let iter = this.getPositionedHealthyPlayerEnumerator();
      let nextSittingPlayer = iter.next();
      return nextSittingPlayer.done;
    }

    getNextSittingPlayer()
    {
      let healthyPlayerEnumerator = this.getInfinitePositionedHealthyPlayerEnumerator();
      let nextSittingPlayer = healthyPlayerEnumerator.next();
      return nextSittingPlayer;
    }



    updateAfterRoundAction(currentPlayerUpdated)
    {
        // Update current player state
        // Todo unless current player alter some other player states...
        this.players = this.players.map( p => {
          if(p.userId === currentPlayerUpdated.userId){
            return currentPlayerUpdated;
          } else {
            return p;
          }
        })
        //Should not change
        this.playersCount = this.players.length
        return this.isEndOfRound();
    }

    toDoc() {
        return {
          players: this.players.map((p) => {return p ? p.toDoc() : null;}),
          playersCount: this.playersCount,
          indexOfHeadPlayer: this.indexOfHeadPlayer,
          //
          currentPlayer: this.currentPlayer.toDoc(),
          roundIndex: this.roundIndex
        }
    }

    static fromDoc(doc) {
      let gameTable;
      if(doc && Utils.checker(SERDE_KEYS, Object.keys(doc))){
        const players = doc['players'].map((pDoc) => {
          return Player.fromDoc(pDoc);
        })
        const indexOfHeadPlayer = doc['indexOfHeadPlayer'];
        const currentPlayer = Player.fromDoc(doc['currentPlayer']);
        gameTable = new GameTable(
          players, indexOfHeadPlayer, currentPlayer, parseInt(doc['roundIndex'])
        );
      }
      return gameTable;
    }
}

export default GameTable;
