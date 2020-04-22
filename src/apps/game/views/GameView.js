import React, { Component } from 'react';
import assert from 'assert';

import * as firebase from 'firebase';
import firebaseApp from '../../../firebaseApp';

// Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardDeck, Container, Col, Row } from 'react-bootstrap';

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
            showModal : this.props.game.currentState.currentPlayerId === this.props.user.uid,
            loading: false
        };
        this.handleEndOfAction = this.handleEndOfAction.bind(this)
    }

    componentDidMount() {
        this.onListenForGame();
    }

    onListenForGame = () => {
        this.setState({
            showModal: false,
            loading: true,
        });
        this.unsubscribe = db.doc(`game/${this.props.gameId}`)
            .onSnapshot(snapshot => {
                if (snapshot) {
                    let games = [];
                    games.push({ ...snapshot.data() });
                    let game = games[0];
                    this.setState({
                        game: game,
                        showModal: game.currentState ? this.props.user.uid === game.currentState.currentPlayerId : false,
                        loading: false,
                    });
                } else {
                    this.setState({ game: null, showModal: false, loading: false });
                }
            });
    };

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleEndOfAction(action) {   
        this.setState({
            game: this.state.game,
            showModal : false,
            loading : this.state.loading,
            
        });
        Game.pushUpdateGameState(this.state.game);
        alert(action + ": Game.updateGameState");
    };

    createTurnView(game, user) {
        const currentState = game.currentState;
        const isPlayerTurn = currentState.currentPlayerId === user.uid;
        if (currentState.isStarted & isPlayerTurn) {
            return (<TurnView show={this.state.showModal} handleAction={this.handleEndOfAction}/>);
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
                        <CardDeck>
                            {
                                game.players.map(
                                    (player) => { return (<PlayerStateTable game={game} player={player} />) }
                                )
                            }
                        </CardDeck>
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
