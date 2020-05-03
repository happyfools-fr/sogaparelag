// React imports
import React, {useState, useEffect} from 'react';

// Import bootstrap
import {
  Card,
  Container,
  Row,
  Col,
  Image,
  Media
}  from 'react-bootstrap';

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

        player && console.log("player.photoURL", player.photoURL);
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
            <Card.Header>
                <Media>
                  <img
                    width={40}
                    height={40}
                    className="mr-3"
                    src={player.photoURL}
                    alt="profilePicture"
                  />
                  <Media.Body>
                    <h5><small>{player.nickname}</small></h5>
                  </Media.Body>
                </Media>
            </Card.Header>
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
                </Card.Text>
            </Card.Body>
            </Card>
        );
    } else {
        return (<div />)
    }
}
