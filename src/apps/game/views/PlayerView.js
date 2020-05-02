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
            <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>
                    {
                        (props.headPlayerId === player.id)
                        ? <i className="fas fa-user-ninja" />
                        : <span />
                    }
                    &nbsp;&nbsp;&nbsp;
                    {
                        (props.currentPlayerId === player.id)
                        ? <i className="fas fa-hand-paper" />
                        : <span />
                    }
                    &nbsp;&nbsp;&nbsp;
                    {player.nickname}
                </Card.Title>
                <Card.Text>
                    {/*<span> {player.id} </span>
                    <br />*/}
                    <span>
                        {
                            (player.isDead)
                            ? <i className="fas fa-skull-crossbones fa-5x" />
                            : (player.isSick)
                                ? <i className="fas fa-dizzy fa-5x" />
                                : <i className="fas fa-smile fa-5x" />
                        }
                    </span>
                </Card.Text>
            </Card.Body>
            {/* <Card.Body>
                 {currentHand.map((card, i) => {return(<Card.Link key={i}>{card}</Card.Link>) })}
             </Card.Body>*/}
            </Card>
        );
    } else {
        return (<div />)
    }
}
