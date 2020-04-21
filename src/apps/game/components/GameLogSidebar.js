// React imports
import React, { Component } from 'react';

// Style imports
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup'
import { Jumbotron } from 'react-bootstrap';

// Firebase imports
import * as firebase from 'firebase';
import firebaseApp from '../../../firebaseApp';

const db = firebase.firestore(firebaseApp);

export default class GameLogSidebar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            game: props.game,
            leading : false,
        }
    }

    componentDidMount() {
        this.onListenForGame();
    }

    onListenForGame() {
        this.setState({ loading: true });
        this.unsubscribe = db.doc(`game/${this.props.game._id}`)
        .onSnapshot(snapshot => {
            if (snapshot) {
            let game = [];
            game = snapshot.data();
            this.setState({
                game: game,
                loading: false,
            });
            } else {
            this.setState({ game: null, loading: false });
            }
        });
    };

    componentWillUnmount() {
        this.unsubscribe();
    }
    
    render() {
        return (
            <Jumbotron>
            <h3>Game Log</h3>
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