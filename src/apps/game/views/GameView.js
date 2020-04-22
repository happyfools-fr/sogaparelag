import React, { Component } from 'react';
import assert from 'assert';

import * as firebase from 'firebase';
import firebaseApp from '../../../firebaseApp';

// Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row } from 'react-bootstrap';

// View imports
import TurnView from './TurnView';
import GameStateTable from '../components/GameStateTable';
import PlayerStateTable from '../components/PlayerStateTable';
import GameLogSidebar from '../components/GameLogSidebar';
import Game from '../model/Game';

const db = firebase.firestore(firebaseApp);

export default class GameView extends Component {

    /* Here we assume that game exists and is not undefined */

    constructor(props) {
        super(props);
        assert(this.props.game);
        assert(this.props.user);
        this.state = {
            game: this.props.game,
            loading: false
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

    handleEndOfAction(action) {
        
        const currentState = this.props.game.currentState;

        const newState = JSON.parse(JSON.stringify(currentState))

        newState.currentPlayerId = currentState.nextPlayerId===currentState.currentPlayerId 
            ? undefined
            : currentState.nextPlayerId ;
        
        newState.nextPlayerId = currentState.nextPlayerId===currentState.currentPlayerId 
            ? currentState.currentPlayerId
            : undefined ;

        const game = JSON.parse(JSON.stringify(this.props.game))

        game.currentState = newState;

        this.setState(
            {
                game: game,
                loading: false,
            }
        );

        Game.pushUpdateGameState(game);

        alert(action + ": Game.updateGameState");
    };

    createTurnView(game, user) {
        const currentState = game.currentState;
        const isPlayerTurn = currentState.currentPlayerId === user.uid;
        if (currentState.isStarted & isPlayerTurn) {
            return (<TurnView show={isPlayerTurn} handleAction={this.handleEndOfAction}/>);
        } else {
           return ( <div /> ); 
        }
    }

    render() {
        const user = this.props.user;
        const game = this.props.game;
        return (
            <Container>
                <Row>
                    <Col>
                        <GameStateTable game={game} />
                        {
                            game.players.map(
                                (player) => { return (<PlayerStateTable game={game} player={player} />) }
                            )
                        }
                        { this.createTurnView(game, user)}
                    </Col>
                    <Col sm={3}>
                        <GameLogSidebar game={game} />
                    </Col>
                </Row>
            </Container>
        );
    };
}
