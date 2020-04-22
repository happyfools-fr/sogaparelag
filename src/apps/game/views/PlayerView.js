import React from 'react';

// Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import {Jumbotron, Table}  from 'react-bootstrap';

export default function PlayerView(props) {
    return (
        <Jumbotron>
        <h4>{props.player ? props.player.nickname : ""}</h4>
        <p>{props.player ? props.player._id : "" }</p>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>Sick</th>
            <th>Dead</th>
            <th>Hand</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>{props.playerStateInGame ? props.playerStateInGame.isSick.toString() : ""}</td>
            <td>{props.playerStateInGame ? props.playerStateInGame.isDead.toString() : ""}</td>
            <td>{props.playerStateInGame ? props.playerStateInGame.currentHand : ""}</td>
            </tr>
        </tbody>
        </Table>
        </Jumbotron>
    );
}