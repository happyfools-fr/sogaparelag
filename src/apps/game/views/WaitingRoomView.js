import React from 'react';
// Styles imports
import 'bootstrap/dist/css/bootstrap.min.css';
import {Jumbotron, Button}  from 'react-bootstrap';

export default function WaitingRoomView(props) {
    return (
        <Jumbotron>
          <h3>Welcome to {props.gameSlugname}!</h3>
          {
              props.players.map((player) => {return (<p>{player}</p>)})
          }
          <div>
            <Button variant="primary" onClick={() => {props.onClick()}}>
                Start the game if everybody is ready!
            </Button>
          </div>
        </Jumbotron>
    );
};
