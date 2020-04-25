// React imports
import React, { useState } from 'react';

// Styles imports
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Form,
    Jumbotron,
    Button,
} from 'react-bootstrap';

function GameMenuView(props) {

    const [slugname, setSlugname] = useState('')

    const handleJoinGameChange = (change) => {
        setSlugname(change.target.value)
    }

    return (
        <Jumbotron>
            <Button onClick={(click) => {props.handleClickCreateNewGame(click)} }>
                Create a New Game
            </Button>
            <p></p>
            <p></p>
            <h3>Or</h3>
            <p></p>
            <p></p>
            <h2>Join another Game</h2>
            <Form onSubmit={(submit) => {props.handleJoinGameSubmit(slugname, submit)} }>
                <Form.Group>
                    <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Enter game name"
                        value={slugname}
                        onChange={handleJoinGameChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Join
                </Button>
            </Form>
        </Jumbotron>
    );
}

export default GameMenuView;
