import React from 'react';

import {CardDeck} from 'react-bootstrap';

import PlayerStateTable from '../../game/components/PlayerStateTable';

export default function AllPlayersView(props) {
    const game = props.game;
    const players = game ? game._gameTable.players : [];
    return (
        <CardDeck>
            {
                players.map(
                    (player) => { return (<PlayerStateTable game={game} player={player} firebaseService={props.firebaseService} />) }
                )
            }
        </CardDeck>
    );
}
