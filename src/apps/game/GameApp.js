// Firebase imports
import {withFirebase} from '../../components/firebase/index'
// React imports
import React, { Component } from 'react';

import GameMenu from './GameMenu'
import GameView from './views/GameView'
import Game from './model/Game';

class GameApp extends Component {

    constructor(props) {
        super(props);
        const currentGameSlugname = this.props.match
            ? (
                this.props.match.params
                    ? (
                        this.props.match.params.gameSlugname
                            ? this.props.match.params.gameSlugname
                            : 'slugname-undefined'
                    )
                    : 'slugname-undefined'
            )
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
        const db = this.props.firebase.ft;
        const gameSlugname = this.props.match
            ? (
                this.props.match.params
                    ? (
                        this.props.match.params.gameSlugname
                            ? this.props.match.params.gameSlugname
                            : 'slugname-undefined'
                    )
                    : 'slugname-undefined'
            )
            : 'slugname-undefined';

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

    handleClickCreateNewGame(click, user) {
        const db = this.props.firebase.ft;
        const game = Game.createAndPushNewGame(db, user);
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
        const db = this.props.firebase.ft;
        const game = await Game.getGameBySlugname(db, submittedSlugName);
        if (game) {
            const user = this.props.user;
            const updatedGame = Game.createAndAddPlayerToGame(db, game, user);
            const pushedGame = Game.pushOrUpdateRecord(db, updatedGame);
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
        const db = this.props.firebase.ft;
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
        if (game) {
            return (<GameView game={game} user={user} />);
        } else {
            return (
                <GameMenu
                    user={user}
                    handleClickCreateNewGame={this.handleClickCreateNewGame}
                    handleJoinGameSubmit={this.handleJoinGameSubmit}
                />
            );
        };
    }
}

export default  withFirebase(GameApp);