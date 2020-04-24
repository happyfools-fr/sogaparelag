import React from 'react';

import CardDeck from 'react-bootstrap';

import PlayerStateTable from '../../game/compoenents/PlayerStateTable';

export default function AllPlayersView(props) {
    return (
        <CardDeck>
            {
                props.players.map(
                    (player) => { return (<PlayerStateTable game={props.game} player={player} />) }
                )
            }
        </CardDeck>
    );
}
