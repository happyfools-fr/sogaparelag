import React from 'react';

import {Card, Container, Row} from 'react-bootstrap';

import PlayerView from './PlayerView';
import Player from '../model/Player';
import LoggedInUser from '../model/LoggedInUser';

export default function AllPlayersView(props) {

    const players = (props.players.length>1) ? props.players
        : [
            props.players[0],
            props.players[0],
            props.players[0],
            // props.players[0],
            // props.players[0],
            // props.players[0],
            // props.players[0],
            // props.players[0],
            // props.players[0],
            // props.players[0],
            // props.players[0],
            // props.players[0]
        ]

    return (
        <div className="m-2">
            <h6>There are {players.length} survivors on this island</h6>
            <Container>
                <Row>
                    {
                        players.map(
                            (player,i) => {
                                return (
                                        <PlayerView
                                            key={i}
                                            playerId={player._id}
                                            currentPlayerId={props.currentPlayerId}
                                            headPlayerId={props.headPlayerId}
                                            firebaseService={props.firebaseService}
                                        />
                                    )
                                }
                        )
                    }
                </Row>
            </Container>
        </div>
    );
}
