import React, { Component } from 'react';
import assert from 'assert';

import * as firebase from 'firebase';
import firebaseApp from '../../../firebaseApp';

// Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Col, Row, Container } from 'react-bootstrap';

// View imports
import ActionView from './ActionView';
import GameStateTable from '../components/GameStateTable';
import PlayerStateTable from '../components/PlayerStateTable';
import GameLogSidebar from '../components/GameLogSidebar';

const db = firebase.firestore(firebaseApp);

export default class GameView extends Component {

    /* Here we assume that game exists and is not undefined */

    constructor(props) {
        super(props);
        assert(this.props.game);
        assert(this.props.user);
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
        const currentState = game.currentState;
        const isPlayerTurn = currentState.currentPlayerId === user.uid;
        if (currentState.isStarted & isPlayerTurn) {
            return (<ActionView game={game} show={isPlayerTurn}/>);
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
                        <PlayerStateTable game={game} user={user} />
                        { this.createActionApp(game, user)}
                    </Col>
                    <Col sm={3}>
                        <GameLogSidebar game={game} />
                    </Col>
                </Row>
            </Container>
        );
    };
}
