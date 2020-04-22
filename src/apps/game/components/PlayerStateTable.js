import React, { Component } from 'react';
// Styles imports
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Jumbotron
}  from 'react-bootstrap';
import * as firebase from 'firebase';
import firebaseApp from '../../../firebaseApp';

import PlayerView from '../views/PlayerView';

const db = firebase.firestore(firebaseApp);

export default class PlayerStateTable extends Component {

    constructor(props){
        super(props);
        this.state = {
            player: null,
            loading: false,
        };
    }

    componentDidMount() {
        this.onListenForPlayer();
    }


    componentWillUnmount() {
        this.unsubscribe();
    }


    onListenForPlayer() {
        this.setState({ loading: true });
        this.unsubscribe = db.doc(`player/${this.props.player}`)
            .onSnapshot(snapshot => {
                if (snapshot) {
                    let player = [];
                    player = snapshot.data();
                    this.setState({
                        player: player,
                        loading: false,
                    });
                } else {
                    this.setState({ player: null, loading: false });
                }
            }
        );
    };


    render() {

        // TODO : assume game isStarted

        const game = this.props.game;
        const player = this.state.player;

        let playerStateInGame;

        if (game && player) {
            playerStateInGame = game.currentState.playerStatesInGame
                .filter(playerStateInGame => playerStateInGame.playerId === player._id)[0];

            return (
                <PlayerView player={player} playerStateInGame={playerStateInGame} />
            );

        } else {
            return (<div />)
        };
    };
}
