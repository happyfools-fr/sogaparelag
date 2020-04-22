import React from 'react';
// Styles imports
import 'bootstrap/dist/css/bootstrap.min.css';
import {Jumbotron, Button}  from 'react-bootstrap';

export default function WaitingRoomView(props) {
    return (
        <Jumbotron>
          <h3>Welcome to {props.game.slugname}!</h3>
          <div>
            <Button variant="primary" onClick={() => {props.onClick(props.game)}}>
                Start the game if everybody is ready!
            </Button>
          </div>
        </Jumbotron>
    );
};