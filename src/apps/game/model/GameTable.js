import PlayerOnTable from './PlayerOnTable'

export class GameTable {
    constructor(players) {
        this._players = players
        this._playersCount = players.length
        this._headPlayer = new PlayerOnTable(players[0]);
        this._initTable(players);
    }

    get players()
    {
        return this._players
    }

    get headPlayer()
    {
        return this._headPlayer.player
    }

    _initTable(players) 
    {
        let previousCreatedPlayerOnTable = this._headPlayer;

        //1 .. N-1
        for (let i = 1; i < players.length; i++) 
        {
            let player = new PlayerOnTable(players[i]);
            previousCreatedPlayerOnTable.next = player;
            player.previous = previousCreatedPlayerOnTable;
            previousCreatedPlayerOnTable = player;
        }

        //cas N-1
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
                this._playersCount --

                if (this._headPlayer.player == currentPlayer.value.player)
                    this._headPlayer = this._headPlayer.next

                return true;
            }
        }
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
}

export default GameTable;
