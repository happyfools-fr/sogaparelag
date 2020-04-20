import SittingPlayer from './SittingPlayer'

export class GameTable {
    constructor(players) {
        this._playersCount = players.length
        this._headSittingPlayer = new SittingPlayer(players[0]);
        this._initTable(players);
    }

    get headSittingPlayer()
    {
        return this._headSittingPlayer
    }
    

    _initTable(players) 
    {
        let previousCreatedSittingPlayerOnTable = this._headSittingPlayer;

        //1 .. N-1
        for (let i = 1; i < players.length; i++) 
        {
            let sittingPlayer = new SittingPlayer(players[i]);
            previousCreatedSittingPlayerOnTable.next = sittingPlayer;
            sittingPlayer.previous = previousCreatedSittingPlayerOnTable;
            previousCreatedSittingPlayerOnTable = sittingPlayer;
        }

        //cas N-1
        this._headSittingPlayer.previous = previousCreatedSittingPlayerOnTable;
        previousCreatedSittingPlayerOnTable.next = this._headSittingPlayer;
    }

    killSittingPlayer(sittingPlayerToKill)
    {
        let checkedPlayerCount = 0;
        let sittingPlayerEnumerator = this.getSittingPlayerEnumerator()

        while (true)
        {
            let currentSittingPlayer = sittingPlayerEnumerator.next()
            if (currentSittingPlayer.done)
                return false

            if (currentSittingPlayer.value.id == sittingPlayerToKill)
            {
                let previousSittingPlayer = currentSittingPlayer.value.previous
                let nextSittingPlayer = currentSittingPlayer.value.next
                previousSittingPlayer.next = nextSittingPlayer
                nextSittingPlayer.previous = previousSittingPlayer
                this._playersCount --

                if (this._headSittingPlayer.player == currentSittingPlayer.value.player)
                    this._headSittingPlayer = this._headSittingPlayer.next

                return true;
            }
        }
    }

    assignNextHeadSittingPlayer()
    {
        this._headSittingPlayer = this._headSittingPlayer.previous;
    }

    * getSittingPlayerEnumerator()
    {
        yield this._headSittingPlayer;
        let currentPlayer = this._headSittingPlayer.next;
        
        while (currentPlayer.player != this._headSittingPlayer.player)
        {
            yield currentPlayer;
            currentPlayer = currentPlayer.next
        }
    }

    * getHealthySittingPlayerEnumerator()
    {
        if (!this._headSittingPlayer.player.isSick)
            yield this._headSittingPlayer;

        let currentSittingPlayer = this._headSittingPlayer.next;
        
        while (currentSittingPlayer.player != this._headSittingPlayer.player)
        {
            if (!currentSittingPlayer.player.isSick)
                yield currentSittingPlayer;

            currentSittingPlayer = currentSittingPlayer.next
        }
    }
}

export default GameTable;
