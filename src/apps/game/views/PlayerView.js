// React imports
import React, {useState, useEffect} from 'react';

// Import bootstrap
import {Card}  from 'react-bootstrap';

// Controller imports
import PlayerController from "../controller/PlayerController"

export default function PlayerView(props) {

    const playerId = props.playerId;

    const playerController = new PlayerController(props.firebaseService.ft);

    const [player, setPlayer] = useState();


    useEffect(
        () => {
            const unsubscribe = playerController.listen(playerId, setPlayer);
            return unsubscribe;
        },
        [playerId, setPlayer]
    );

    if (player) {

        const currentHand = (player.currentHand) ? player.currentHand : ["Card1", "Card2", "Card3", "Card4"]

        return (
            <Card
                className={
                    (props.currentPlayerId === player.id)
                    ? "text-center m-1 shadow-lg"
                    : "text-center m-1 shadow-none"
                }
                style={{"width": "18vh"}}
                bg={
                    (props.headPlayerId === player.id)
                    ? "secondary"
                    : "light"
                }
                text={
                    (props.headPlayerId === player.id)
                    ? "white"
                    : "dark"
                }

                border={
                    (props.currentPlayerId === player.id)
                    ? "dark"
                    : ""
                }
            >
            <Card.Body>
                <Card.Text>
                    {
                        (player.isDead)
                        ? <i className="fas fa-skull-crossbones fa-5x" />
                        : (player.isSick)
                            ? <i className="fas fa-dizzy fa-5x" />
                            : <i className="fas fa-smile fa-5x" />
                    }
                    <br />
                    <small>{player.nickname}</small>
                </Card.Text>
            </Card.Body>
            </Card>
        );
    } else {
        return (<div />)
    }
}
