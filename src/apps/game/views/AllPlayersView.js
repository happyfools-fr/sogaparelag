import React from 'react';

import {CardDeck} from 'react-bootstrap';

import PlayerStateTable from '../../game/components/PlayerStateTable';

export default function AllPlayersView(props) {
    return (
        <CardDeck>
            {
                props.game.players.map(
                    (player) => { return (<PlayerStateTable game={props.game} player={player} firebaseService={props.firebaseService} />) }
                )
            }
        </CardDeck>
    );
}
