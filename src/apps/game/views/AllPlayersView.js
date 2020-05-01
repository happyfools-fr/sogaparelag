import React from 'react';

import {CardDeck} from 'react-bootstrap';

import PlayerView from './PlayerView';

export default function AllPlayersView(props) {

    const players = props.players ? props.players : [];

    return (
        <CardDeck>
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
        </CardDeck>
    );
}
