import React from 'react';

import {CardDeck} from 'react-bootstrap';

import PlayerView from './PlayerView';

export default function AllPlayersView(props) {

    const players = props.players ? props.players : [];

    return (
        <div>
            <h6>{players.length}&nbsp;survivors on the island</h6>
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
        </div>
    );
}
