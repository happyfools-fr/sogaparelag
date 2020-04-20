// React imports
import React, { Component } from 'react';

// Style imports
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup'
import { Jumbotron } from 'react-bootstrap';

export default class GameLogSidebar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            game: props.game,
            leading : false,
        }
    }

    componentDidMount() {
        this.onListenForGames();
    }

    onListenForGames() {
        this.setState({ loading: true });
    };

    componentWillUnmount() {
        this.unsubscribe();
    }
    
    render() {
        return (
            <Jumbotron> 
                <ListGroup>
                    {
                        this.state.game.history.map(state => {
                            return (<ListGroup.Item>{state._id}</ListGroup.Item>);
                        })
                    }
                </ListGroup>
            </Jumbotron>
        )
    }
}