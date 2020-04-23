// Firebase imports
import {withFirebase} from '../../../components/firebase/index'

// React imports
import React, { Component } from 'react';
// Styles imports
import ListGroup from 'react-bootstrap/ListGroup'

class PlayerGameList extends Component {
  
    constructor(props){
        super(props);
        this.state = {
            playerGames: [],
            loading: false,
        };
    }

    componentDidMount() {
        this.onListenForGames();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleSnapshot(snapshot) {
        if (snapshot) {
            let playerGames = [];
            playerGames = snapshot.docs.map(x => x.data().slugname)
            this.setState({
                playerGames: playerGames,
                loading: false,
            });
        } else {
            this.setState({
                playerGames: null,
                loading: false
            });
        };
    };

    onListenForGames() {
        const db = this.props.firebase.ft; 
        this.setState({ loading: true });
        this.unsubscribe = db.collection(`game`).where("players", "array-contains", this.props.user.uid)
            .onSnapshot((snapshot) => this.handleSnapshot(snapshot));
    };

    render() {
        const playerGames = this.state.playerGames;
        return (
            <ListGroup defaultActiveKey="#link1">
              {
                playerGames.map(element => {
                return (
                  <ListGroup.Item variant="light" action href={"/game/"+ element}>{element}</ListGroup.Item>
                );
              })
            }
            </ListGroup>

        );
    };
}

export default withFirebase(PlayerGameList);