// React imports
import React from 'react';

// Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card}  from 'react-bootstrap';

export default function PlayerView(props) {

    const cards = ["Card1", "Card2", "Card3", "Card4"]

    return (
        <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{props.player ? props.player.nickname : ""}</Card.Title>
            <Card.Text>
                <p> {props.player ? props.player._id : "" } </p>
                <p> IsSick :  {props.playerStateInGame ? (props.playerStateInGame._sickenessLevel !== 0).toString() : ""}</p>
                <p> IsDead :  {props.playerStateInGame ? props.playerStateInGame.isDead.toString() : ""}</p>
            </Card.Text>
        </Card.Body>
        <Card.Body>
            {cards.map((card) => {return(<Card.Link>{card}</Card.Link>) })}
        </Card.Body>
        </Card>
    );
}