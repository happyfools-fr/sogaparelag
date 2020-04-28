// React imports
import React, { Component } from 'react';
// Styles imports
import 'bootstrap/dist/css/bootstrap.min.css';

import PlayerView from '../views/PlayerView';

class PlayerStateTable extends Component {

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
        const db = this.props.firebaseService.ft;
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
        const firebaseService = this.props.firebaseService;

        let playerStateInGame;

        if (game && player) {
            playerStateInGame = game.currentState.playerStatesInGame
                .filter(playerStateInGame => playerStateInGame._id === player._id)[0];

            return (
                <PlayerView player={player} playerStateInGame={playerStateInGame} firebaseService={firebaseService}/>
            );

        } else {
            return (<div />)
        };
    };
}

export default PlayerStateTable;
