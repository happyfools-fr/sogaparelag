// Firebase imports
import {withFirebase} from '../../components/firebase/index'
// React imports
import React, { Component } from 'react';

import GameView from './views/GameView';
import GameMenuView from './views/GameMenuView';
import Game from './model/Game';

class GameApp extends Component {

    constructor(props) {
        super(props);
        const currentGameSlugname = this.props.slugname 
          ? this.props.slugname 
          : 'slugname-undefined';
        this.state = {
            currentGame: null,
            currentGameSlugname: currentGameSlugname,
            loading: false,
        };
        this.handleClickCreateNewGame = this.handleClickCreateNewGame.bind(this);
        this.handleJoinGameSubmit = this.handleJoinGameSubmit.bind(this);
        if (currentGameSlugname.length > 0
            && currentGameSlugname !== 'slugname-undefined'
            && this.props.addUserToGame) {
            this.onJoinGame(currentGameSlugname);
        }
    }

    componentDidMount() {
        this.onListenForGame();
    }

    onListenForGame = () => {
        const db = this.props.firebaseService.ft;
        const gameSlugname = this.props.slugname ? this.props.slugname : 'slugname-undefined';

        this.setState({ loading: true });
        this.unsubscribe = db.collection(`game`).where("slugname", "==", gameSlugname)
            .onSnapshot(snapshot => {
                if (snapshot) {
                    let games = [];
                    games = snapshot.docs.map(x => x.data())
                    if (games.length > 0) {
                        const game = games[0];
                        this.setState({
                            currentGame: game,
                            currentGameSlugname: game.slugname,
                            loading: false,
                        });
                    }
                } else {
                    this.setState({
                        currentGame: null,
                        currentGameSlugname: null,
                        loading: false,
                    });
                }
            });
    };

    componentWillUnmount() {
        this.unsubscribe();
    }

    async handleClickCreateNewGame(click) {
        const user = this.props.user;
        const db = this.props.firebaseService.ft;
        const game = await Game.createAndPushNewGame(db, user);
        this.setState({
            currentGame: game,
            currentGameSlugname: game.slugname,
            loading: false,
        });
        alert('New game created, share this: ' + window.location.origin + '/game/' + game.slugname);
        return game;
    }

    handleJoinGameSubmit(submittedSlugName, submit) {
        submit.preventDefault();
        this.onJoinGame(submittedSlugName);
    }

    async onJoinGame(submittedSlugName) {
        const db = this.props.firebaseService.ft;
        const game = await Game.getGameBySlugname(db, submittedSlugName);
        if (game) {
            const user = this.props.user;
            const updatedGame = await Game.createAndAddPlayerToGame(db, game, user);
            const pushedGame = await Game.pushOrUpdateRecord(db, updatedGame);
            this.setState({
                currentGame: pushedGame,
                currentGameSlugname: pushedGame.slugname,
                loading: false,
            });
        } else {
            alert("Provided Gamed Name is not recognized! Please Amend...");
        }
    }

    async updateGameId(gameId) {
        const db = this.props.firebaseService.ft;
        const gameSnapshot = await Game.getGameSnapshotByGameId(db, gameId);
        if (gameSnapshot.exists) {
            this.setState({
                currentGame: gameSnapshot.data(),
            });
            return true;
        } else {
            return false;
        }
    }

    render() {
        const user = this.props.user;
        const game = this.state.currentGame;
        const firebaseService = this.props.firebaseService;
        if (!game) {
            return (
                <GameMenuView
                    handleClickCreateNewGame={this.handleClickCreateNewGame}
                    handleJoinGameSubmit={this.handleJoinGameSubmit}
                    firebaseService={firebaseService}  
                />
            );
        } else {
            return ( 
              <GameView 
                game={game} 
                user={user} 
                firebaseService={firebaseService} 
                /> 
              );
        };
    }
}

export default GameApp;
