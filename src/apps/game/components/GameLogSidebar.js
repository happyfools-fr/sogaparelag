// React imports
import React, { Component } from 'react';

// Style imports
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup'
import LogItem from './LogItem';

class GameLogSidebar extends Component {

    constructor(props) {
        super(props);
    }
    //     this.state = {
    //         game: props.game,
    //         leading : false,
    //     }
    // }
    // 
    // componentDidMount() {
    //     this.onListenForGame();
    // }
    // 
    // onListenForGame() {
    //     this.setState({ loading: true });
    //     this.unsubscribe = this.props.firebaseService.ft.doc(`game/${this.props.game._id}`)
    //     .onSnapshot(snapshot => {
    //         if (snapshot) {
    //         let game = [];
    //         game = snapshot.data();
    //         this.setState({
    //             game: game,
    //             loading: false,
    //         });
    //         } else {
    //         this.setState({ game: null, loading: false });
    //         }
    //     });
    // };
    // 
    // componentWillUnmount() {
    //     this.unsubscribe();
    // }

    render() {
        return (
            <div>
            <h3>Game Log</h3>
            <ListGroup>
                {
                  
                    this.props.game ? (this.props.game.history.map(state => {
                        return (<LogItem icon="fa-info-circle" value={state} />);
                    })) : <LogItem icon="fa-info-circle" value="Placegholder for game.history.state" />
                }
            </ListGroup>
            </div>
        )
    }
}

export default GameLogSidebar;
