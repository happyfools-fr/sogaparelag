import React from 'react';
// Styles imports
import 'bootstrap/dist/css/bootstrap.min.css';
import {Jumbotron, Button, Spinner}  from 'react-bootstrap';

export default function WaitingRoomView(props) {
    return (
        <Jumbotron>
          <h3>Welcome to {props.slugname}!</h3>
          {
              props.players.map((user,i) => {return (<p key={i}>{user.nickname}</p>)})
          }
          <div>
            {
                (props.isCreator)
                ? <Button variant="primary" onClick={() => {props.onClick()}}>
                    Start the game if everybody is ready!
                </Button>
                : <Button variant="primary" disabled>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    &nbsp; Waiting for all players to join...
                </Button>

            }
          </div>
        </Jumbotron>
    );
};
