import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Jumbotron,
    Accordion,
    Card,
    Button,
} from 'react-bootstrap';

import GameMenu from './GameMenu'
import GameView from './GameView'
import Game from './model/Game';

import * as firebase from 'firebase';
import firebaseApp from '../../firebaseApp';
const db = firebase.firestore(firebaseApp);

export default class GameApp extends Component {

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
        const game = Game.createAndPushNewGame(user);
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
        const game = await Game.getGameBySlugname(submittedSlugName);
        if (game) {
            const user = this.props.user;
            const updatedGame = Game.createAndAddPlayerToGame(game, user);
            const pushedGame = Game.pushOrUpdateRecord(updatedGame);
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
        const gameSnapshot = await Game.getGameSnapshotByGameId(gameId);
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
        return (
            <Jumbotron>
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Menu
                    </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <GameMenu
                                    user={user}
                                    handleClickCreateNewGame={this.handleClickCreateNewGame}
                                    handleJoinGameSubmit={this.handleJoinGameSubmit}
                                />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                Active Game
                    </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>{
                                game ? <GameView game={game} user={user} /> : <p></p>
                            }</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </Jumbotron>
        );
    }
}