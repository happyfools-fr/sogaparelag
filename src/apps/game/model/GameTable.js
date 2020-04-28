import SittingPlayer from './SittingPlayer'
import LoggedInUser from './LoggedInUser'
import Player from './Player'
import Utils from './Utils'

export const SERDE_KEYS = ['players', 'playersCount', 'indexOfHeadPlayer'];

export class GameTable
{
    constructor(players, indexOfHeadPlayer = 0)
    {
        this.players = players
        this.playersCount = players.length
        this.indexOfHeadPlayer = indexOfHeadPlayer
        this._headPlayer = new SittingPlayer(players[indexOfHeadPlayer]);
        this._initTable(players);
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
        let checkedPlayerCount = 0;
        let playerEnumerator = this.getPlayerEnumerator()
        while (true)
        {
            let currentPlayer = playerEnumerator.next()
            if (currentPlayer.done)
                return false

            if (currentPlayer.value.id == playerIdToKill)
            {
                let previousPlayer = currentPlayer.value.previous
                let nextPlayer = currentPlayer.value.next
                previousPlayer.next = nextPlayer
                nextPlayer.previous = previousPlayer

                if (this._headPlayer.player == currentPlayer.value.player)
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
        
    assignNextHeadPlayer()
    {
        this._headPlayer = this._headPlayer.previous;
    }

    * getPlayerEnumerator()
    {
        yield this._headPlayer;
        let currentPlayer = this._headPlayer.next;
        while (currentPlayer.player != this._headPlayer.player)
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
        while (currentPlayer.player != this._headPlayer.player)
        {
            if (!currentPlayer.player.isSick)
                yield currentPlayer;
            currentPlayer = currentPlayer.next
        }
    }

    toDoc() {
        return {
          players: this.players.map((p) => {return p.toDoc();}), 
          playersCount: this.playersCount,
          indexOfHeadPlayer: this.indexOfHeadPlayer,
          // _headPlayer: this._headPlayer.toDoc(),
        }
    }
    
    static fromDoc(doc) {
      let gameTable;
      if(doc && Utils.checker(SERDE_KEYS, Object.keys(doc))){      
        const players = doc['players'].map((pDoc) => {
          return Player.fromDoc(pDoc);
        })
        const indexOfHeadPlayer = doc['indexOfHeadPlayer'];
        gameTable = new GameTable(players, indexOfHeadPlayer);
        // gameTable = new GameTable(players);        
        // let _headPlayer = SittingPlayer.fromDoc(doc['_headPlayer']);
      }
      return gameTable;
    }
}

export default GameTable;
