// React imports
import React, { Component } from 'react';

// Styles imports
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import {
    Jumbotron,
    Button,
} from 'react-bootstrap';

// Relative imports
import PlayerGameList from './components/PlayerGameList';

export default class GameMenu extends Component {


    constructor(props) {
        super(props);
        this.state = {
            inputValueGameSlugname: '',
            currentGame: null,
        };
        this.handleJoinGameChange = this.handleJoinGameChange.bind(this);
    }

    handleJoinGameChange(change) {
        this.setState({ inputValueGameSlugname: change.target.value });
    }

    render() {
        const user = this.props.user;
        const game = this.state.currentGame;
        if (user && game === null) {
            return (
                <Jumbotron>
                    <Button onClick={(click) => { this.props.handleClickCreateNewGame(click, user) }}>Create a New Game</Button>
                    <p></p>
                    <p></p>
                    <h3>Or</h3>
                    <p></p>
                    <p></p>
                    <h2>Join another Game</h2>
                    <Form onSubmit={(submit) => this.props.handleJoinGameSubmit(this.state.inputValueGameSlugname, submit)}>
                        <Form.Group>
                            <Form.Control size="lg" type="text" placeholder="Enter game name"
                                value={this.state.inputValueGameSlugname}
                                onChange={this.handleJoinGameChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Join
                </Button>
                    </Form>
                    <p></p>
                    <p></p>
                    <h3>Or</h3>
                    <p></p>
                    <p></p>
                    <h2>Join a Game you are registered in</h2>
                    <PlayerGameList user={user} />
                </Jumbotron>
            );
        } else {
            return (<div>Null game...</div>);
        }
    };
}
