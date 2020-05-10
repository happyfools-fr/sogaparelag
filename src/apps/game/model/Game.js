import Player from "./Player";
import LoggedInUser from "./LoggedInUser";
import {RoundAction} from './RoundAction'
import {WaterManager} from "./WaterManager";
import {FoodManager} from "./FoodManager";
import {WoodManager} from "./WoodManager";
import {Weather} from "./Weather";

//import {GameTable} from "./GameTable";
// import {PollManager} from "./PollManager";
import Utils from './Utils'
import { v1 as uuidv1 } from 'uuid';

export const SERDE_KEYS = [
  '_id', '_lastRound', '_win', '_endOfGame',
  '_waterManager', '_foodManager', '_woodManager',
  'players',
  'history',
  'pollFood', 'pollWater',
  'indexOfHeadPlayer', 'indexOfCurrentPlayer',
  'roundIndex', 'endOfRound',
];

export default class Game {

    constructor(loggedInUsers, waterManager, foodManager, woodManager, indexOfHeadPlayer = 0, indexOfCurrentPlayer = 0 ) {
        this._id = uuidv1();

        this._lastRound = false
        this._win = false
        this._endOfGame = false

        this._waterManager = waterManager
        this._foodManager = foodManager
        this._woodManager = woodManager

        this.players = Game.createPlayers(loggedInUsers)

        this.indexOfHeadPlayer = indexOfHeadPlayer
        this.headPlayer = this.players[indexOfHeadPlayer];

        this._initPlayers(this.players, indexOfHeadPlayer);

        this.indexOfCurrentPlayer = indexOfCurrentPlayer
        this.currentPlayer = this.players[indexOfCurrentPlayer]

        this.history = [];

        this.pollFood = {poll: false, votes: null};
        this.pollWater = {poll: false, votes: null};

        this.roundIndex = 1;
        this.endOfRound = false;

    }


    get id() { return this._id }

    get playersCount() { return this.players.length }

    get headPlayerId() { return this.headPlayer.id }

    get currentPlayerId() { return this.currentPlayer.id }

    get waterSupply() { return this._waterManager.inventory }

    get foodSupply() { return this._foodManager.inventory }

    get woodSupply() { return this._woodManager.inventory }

    get waterVoteEnded() {
       return this.players.filter(p => !p.isDead).every(p => p.waterVote !== null);
    }

    get footVoteEnded() {
       return this.players.filter(p => !p.isDead).every(p => p.foodVote !== null);
    }

    get isNight() {return ( this.pollFood.poll || this.pollWater.poll )}

    get canLeave() {
        let canLeaveWithEnoughWater = this._waterManager.authorizeLeaving(this.playersCount)
        let canLeaveWithEnoughFood = this._foodManager.authorizeLeaving(this.playersCount)
        let canLeaveWithEnoughWood = this._woodManager.authorizeLeaving(this.playersCount)
        return canLeaveWithEnoughWater && canLeaveWithEnoughFood && canLeaveWithEnoughWood
    }

    get mustLeave() {
        return this._waterManager.mustLeave();
    }



    _initPlayers(players, indexOfHeadPlayer = 0) {
        let previousCreatedPlayerOnTable = this.headPlayer;

        //indexOfHeadPlayer+1 .. N-1
        for (let i = indexOfHeadPlayer + 1; i < players.length; i++) {
            let player = players[i];
            previousCreatedPlayerOnTable.next = player.id;
            player.previous = previousCreatedPlayerOnTable.id;
            previousCreatedPlayerOnTable = player;
        }

        //0 .. indexOfHeadPlayer-1
        for (let i = 0; i < indexOfHeadPlayer; i++) {
            let player = players[i];
            previousCreatedPlayerOnTable.next = player.id;
            player.previous = previousCreatedPlayerOnTable.id;
            previousCreatedPlayerOnTable = player;
        }

        //cas indexOfHeadPlayer-1
        this.headPlayer.previous = previousCreatedPlayerOnTable.id;
        previousCreatedPlayerOnTable.next = this.headPlayer.id;
    }

    _assignNextHeadPlayer() {
        const headPlayerId = this.headPlayer.previous;
        this.headPlayer = this.getPlayerFromId(headPlayerId)
        this.indexOfHeadPlayer = this.getIndexFromPlayer(this.headPlayer)

        this.currentPlayer = this.headPlayer;
        this.indexOfCurrentPlayer = this.indexOfHeadPlayer

        // if (this.currentPlayer.isSick) {
        //     this._assignNextCurrentPlayer();
        // } else {
        //     this.indexOfCurrentPlayer = this.indexOfHeadPlayer
        // }
    }

    _assignNextCurrentPlayer(player) {

        const currentPlayerId = player.next

        if (currentPlayerId === this.headPlayerId) {
            this.endOfRound = true
            return
        }

        this.currentPlayer = this.getPlayerFromId(currentPlayerId)

        this.indexOfCurrentPlayer = this.getIndexFromPlayer(this.currentPlayer);

        // while (true) {
        //     currentPlayerId = player.next
        //
        //     if (currentPlayerId === this.headPlayerId) {
        //         this.endOfRound = true
        //         break
        //     }
        //
        //     currentPlayer = this.getPlayerFromId(currentPlayerId)
        //
        //     if (this.currentPlayer.isSick) {
        //         this.currentPlayer.hasPlayedThisRound = true
        //     }
        //
        //     else {
        //       break;
        //     }
        // }
        //
        // this.indexOfCurrentPlayer = this.getIndexFromPlayer(this.currentPlayer);
    }



    onDayStarts() {
        this.endOfRound = false

        this.roundIndex = this.roundIndex + 1;

        this.history.push(
            {
                type: 'newday',
                value: "Well done, you have lived to see another day on the island !"
            }
        );

        this.history.push(
            {
                type: 'info',
                value: "The weather today is " + Weather.weatherToText[this._waterManager.currentWeather] + " (" + this._waterManager.currentWeather + ")"
            }
        );

        for (let player of this.players) {
            player.hasPlayedThisRound = false
            player.onRoundStarts()
        }

        this._assignNextHeadPlayer();
    }



    playerPerformAction(player, selectedAction, additionalRequest=0) {

        let actionResult;

        switch (selectedAction)
        {
            case RoundAction.CollectWater:
                actionResult = this._waterManager.collect();
                break;

            case RoundAction.CollectFood:
                actionResult = this._foodManager.collect();
                break;

            case RoundAction.CollectWood:
                actionResult = this._woodManager.tryCollect(additionalRequest) || player.onGetSick()
                break;

            default :
                throw new Error('Default case in RoundManager for player', this);
          }

        const actionSummary = Game.getActionSummary(player, selectedAction, actionResult);

        this.history.push(
            {
                type: (selectedAction===RoundAction.CollectWood && !actionResult)
                            ? "sick"
                            : selectedAction,
                value: actionSummary
            }
        );

        this.onPlayerActionEnded(player)

        return [actionResult, actionSummary]
    }

    onPlayerActionEnded(player) {
        player.hasPlayedThisRound = true

        this._assignNextCurrentPlayer(player);

        if (this.currentPlayerId === this.headPlayerId)
        {
            this.onDayEnded();
        }
    }



    onDayEnded() {
        this.history.push(
          {
              type: 'info',
              value: "Day " + this.roundIndex + " has ended, all survivors will have to drink and eat."
          }
        );

        // Init SUPPLY MANAGEMENT sequence
        this.waterManagement();
    }



    waterManagement() {
        // There is no water left, everyone dies
        if (this._waterManager.inventory === 0) {
            this._endOfGame = true;
            this._win = false;
            return;
        }

        // Not enough water left, time to vote for water
        else if (this.playersCount - this._waterManager.inventory > 0) {
            this.players.forEach( p => { p.waterVote = null});
            this.pollWater = {poll: true, votes: this._initVote};
            return;
        }

        // Else drink water and keep on
        this._waterManager.drink(this.playersCount);

        // Re-init poll for water
        this.players.forEach( p => { p.waterVote = null });
        this.pollWater = {poll: false, votes: null};

        this.history.push(
            {
                type: 'info',
                value: "There is enough water for all survivors to drink today ..."
            }
        );

        return this.foodManagement();
    }

    foodManagement() {
        // There is no food left, everyone dies
        if (this._foodManager.inventory === 0) {
            this._endOfGame = true;
            this._win = false;
            return;
        }

        // There is not enough food left, start food poll
        else if (this.playersCount - this._foodManager.inventory > 0) {
            this.players.forEach( p => { p.foodVote = null });
            this.pollFood= {poll: true, votes: this._initVote};
            return;

        }

        // Else eat food and keep on
        this._foodManager.eat(this.playersCount);

        // Re-init poll for food
        this.players.forEach( p => { p.foodVote = null });
        this.pollFood= {poll: false, votes: null};

        this.history.push(
            {
                type: 'info',
                value: "There is enough fish for all survivors to eat today ..."
            }
        );

        this.onAllManagementEnded();
    }

    onAllManagementEnded() {

        //Can leave
        if (this.canLeave) {
            this._endOfGame = true
            this._win = true
            return;

        //Must leave
        } else if (this.mustLeave) {
            this._endOfGame = true
            // Need water and food on the raft
            this.waterManagement();
            return;

        //Are leaving but cannot leave
        } else if (this._endOfGame) {
            this._win = false
            return;
        }

        this.onNightEnded();
    }



    onPlayerWaterVote(player, votedPlayerId) {
        player.waterVote = votedPlayerId
        if(!this.waterVoteEnded) { return }
        this._onWaterVoteEnded();
    }

    onPlayerFoodVote(player, votedPlayerId) {
        player.foodVote = votedPlayerId
        if(!this.footVoteEnded) { return }
        this._onFoodVoteEnded();
    }

    _initVote() {
        let votesByPlayerId = {};
        for (let player of this.players) {
            votesByPlayerId[player.id] = 0
        }
        return votesByPlayerId;
    }

    _waterVote() {

        for (let player of this.players) {
            this.pollWater.votes[player.waterVote] ++
        }

        return this._countVotes(this.pollWater.votes)
    }

    _foodVote() {

        for (let player of this.players) {
            this.pollFood.votes[player.waterVote] ++
        }
        return this._countVotes(this.pollFood.votes)
    }

    _countVotes(votes) {
        let max = -1
        let chosenPlayers = []
        for (let playerId in votes) {
            if (votes[playerId] > max) {
                max = votes[playerId];
                chosenPlayers = [playerId];
            } else if (votes[playerId] === max) {
                chosenPlayers.push(playerId);
            };
        };
        return chosenPlayers[0];
    }

    _killPlayer(playerIdToKill) {
        for (let player in this.players) {
            if (player.id === playerIdToKill) {

                player.kill();
                // this.killedPlayers.push(player);

                const previousPlayer = player.previous
                const nextPlayer = player.next

                if (player.id === nextPlayer) {
                  this.headPlayer = player

                } else {
                  previousPlayer.next = nextPlayer
                  nextPlayer.previous = previousPlayer

                  if (this.headPlayer === player)
                      this.headPlayer = this.headPlayer.previous
                }
                return;
            }
        }
    }

    _onWaterVoteEnded() {
        //Kill the voted Player
        let playerIdToKill = this._waterVote()
        this._killPlayer(playerIdToKill)

        // If there is no-one left...
        if (this.playersCount === 0) {

            this._endOfGame = true
            this._win = false
            return
        }

        // Now everyone should be able to drink
        this.waterManagement();
    }

    _onFoodVoteEnded() {
        //Kill the voted Player
        let playerIdToKill = this._foodVote()
        this._killPlayer(playerIdToKill)

        if (this.playersCount === 0) {
            // If there is not one left, well...
            this._endOfGame = true;
            this._win = false;
            return;
        }

        //Otherwise redo vote
        this.foodManagement();
    }



    onNightEnded() {
        this._waterManager.onRoundEnded();
        this.onDayStarts()
    }


    getIndexFromPlayer(player) {
        for (let it = 0; it < this.playersCount; it++) {
            if (this.players[it] === player){
                return it;
            }
        }

        throw Error('Cannot find player ' + player)
    }

    getPlayerFromId(playerId) {
        for (let i = 0; i < this.playersCount; i++) {
            if (this.players[i].id === playerId){
                return this.players[i];
            }
        }

        throw Error('Cannot find player ' + playerId)
    }


    toDoc() {
        return {
            _id : this._id,

            _lastRound : this._lastRound,
            _win : this._win,
            _endOfGame: this._endOfGame,

            _waterManager : this._waterManager ? this._waterManager.toDoc() : null,
            _foodManager : this._foodManager ? this._foodManager.toDoc() : null,
            _woodManager : this._woodManager ? this._woodManager.toDoc() : null,

            players : this.players.map( (p) => { return p.toDoc() }),

            indexOfHeadPlayer: this.indexOfHeadPlayer,
            indexOfCurrentPlayer: this.indexOfCurrentPlayer,

            history: this.history,

            pollFood:  this.pollFood,
            pollWater: this.pollWater,

            roundIndex: this.roundIndex,
            endOfRound: this.endOfRound,

        };
    }

    static fromDoc(doc) {
        let game;
        if(doc && Utils.checker(SERDE_KEYS, Object.keys(doc))){

            const loggedInUsers = doc['players'].map(
                (p) => new LoggedInUser(p['userId'], p['nickname'], p['photoURL']));

            const waterManager = WaterManager.fromDoc(doc['_waterManager']);
            const foodManager = FoodManager.fromDoc(doc['_foodManager']);
            const woodManager = WoodManager.fromDoc(doc['_woodManager']);

            const indexOfHeadPlayer = doc['indexOfHeadPlayer'];
            const indexOfCurrentPlayer = doc['indexOfCurrentPlayer'];

            game = new Game(loggedInUsers, waterManager, foodManager, woodManager, indexOfHeadPlayer, indexOfCurrentPlayer);
            game._id = doc['_id'];
            game._lastRound = doc['_lastRound'];
            game._win = doc['_win'];
            game._endOfGame = doc['_endOfGame'];

            game.history = doc['history'];

            game.pollFood = doc['pollFood'];
            game.pollWater = doc['pollWater'];

            game.roundIndex = doc['roundIndex']
            game.endOfRound = doc['endOfRound']
      } else {
          if (doc) {
              console.log("Missing value in de-serialization", Object.keys(doc).filter((k) => !SERDE_KEYS.includes(k)))
          }
      }
      return game;
    }


    static getActionSummary(player, actionToPerform, actionResult=0) {
        switch (actionToPerform)
        {
            case RoundAction.CollectWater:
                return `${player.nickname} collected ${actionResult} water.`;

            case RoundAction.CollectFood:
                return `${player.nickname} collected ${actionResult} fish.`;;

            case RoundAction.CollectWood:
                return (actionResult)
                    ? `${player.nickname} collected ${actionResult} logs of wood.`
                    : `${player.nickname} got sick while collecting wood !`

            default :
                throw new Error('Default case in getActionSummary for player and action', player, actionToPerform);
          }
    }

    static createPlayers(loggedInUsers) {
        let players = []
        loggedInUsers.map( (user) => { return players.push(new Player(user))} )
        return players
    }
}
