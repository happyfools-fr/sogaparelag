import React, { Component } from 'react';
import * as firebase from 'firebase';
import firebaseApp from '../../firebaseApp';
import Action from './components/Action';
import GameStateTable from './components/GameStateTable';
import PlayerStateTable from './components/PlayerStateTable';
import GameLogSidebar from './components/GameLogSidebar';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron } from 'react-bootstrap';

const db = firebase.firestore(firebaseApp);

class GameView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            game: this.props.game,
            loading: false,
        };
    }

    componentDidMount() {
        this.onListenForGame();
    }

    onListenForGame = () => {
        this.setState({ loading: true });
        this.unsubscribe = db.doc(`game/${this.props.gameId}`)
            .onSnapshot(snapshot => {
                if (snapshot) {
                    let games = [];
                    games.push({ ...snapshot.data() });
                    this.setState({
                        game: games[0],
                        loading: false,
                    });
                } else {
                    this.setState({ game: null, loading: false });
                }
            });
    };

    componentWillUnmount() {
        this.unsubscribe();
    }

    createActionApp(game, user) {
        if (game && game.currentState.isStarted) {
            const currentState = game ? game.currentState : "No currentState";
            const currentPlayerId = game ? currentState.currentPlayerId : "No currentPlayerId";
            if (currentState && currentPlayerId === user.uid) {
                return (
                    <React.Fragment>
                        <Jumbotron>
                            <h1 id='player-turn'>Your turn boo!</h1>
                            <Action game={game} />
                        </Jumbotron>
                    </React.Fragment>
                );
            } else {
                return (
                    <React.Fragment>
                        <Jumbotron>
                            <h1 id='player-turn'>Not your turn Babe! Wait for it...</h1>
                        </Jumbotron>
                    </React.Fragment>
                );
            }
        } else {
            return (
                <React.Fragment>
                    <div></div>
                </React.Fragment>
            );
        }
    }

    createGameLogSidebar(game) {
        if (game) {
            return (<GameLogSidebar game={game} />)
        } else {
            return (<div />)
        }
    };

    render() {
        const user = this.props.user;
        const game = this.props.game;
        return (
            <React.Fragment>
                {
                    game
                        ? <GameStateTable game={game} />
                        : <div>No GameStateTable</div>
                }
                {
                    game && user
                        ? <PlayerStateTable game={game} user={user} />
                        : <div>No PlayerStateTable</div>
                }
                {
                    this.createActionApp(game, user)
                }
                {
                    this.createGameLogSidebar(game)
                }

            </React.Fragment>
        );
    };
}

export default GameView;
