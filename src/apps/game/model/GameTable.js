import SittingPlayer from './SittingPlayer'

export class GameTable 
{
    constructor(players) 
    {
        this.players = players
        this.playersCount = players.length
        this._headPlayer = new SittingPlayer(players[0]);
        this._initTable(players);
    }

    get headPlayer()
    {
        return this._headPlayer.player
    }

    _initTable(players) {
        let previousCreatedPlayerOnTable = this._headPlayer;
        //1 .. N-1
        for (let i = 1; i < players.length; i++) {
            let player = new SittingPlayer(players[i]);
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

                if (this._headPlayer.player == currentPlayer.value.player)
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

        while (true)
        {
            let currentPlayer = playerEnumerator.next()
            if (currentPlayer.done)
                break

            this.players.push(currentPlayer.value.player)
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
}

export default GameTable;
