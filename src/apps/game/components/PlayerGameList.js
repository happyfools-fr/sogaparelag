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

  onListenForGames = () => {
    this.setState({ loading: true });
    this.unsubscribe = this.props.firebase.ft.collection(`game`).where("players", "array-contains", this.props.user.uid)
      .onSnapshot(snapshot => {
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
        }
      });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }
  
  createTable(listData) {
    return (
      <ListGroup defaultActiveKey="#link1">
        {
          listData.map(element => {
          return (
            <ListGroup.Item variant="light" action href={"/game/"+ element}>{element}</ListGroup.Item>
          );
        })
      }
      </ListGroup>
   );
 }
 
  render() {
    const playerGames = this.state.playerGames;
    return (
      <React.Fragment>
      
        {
          this.createTable(playerGames)
        }
      </React.Fragment>

  )}
}

export default withFirebase(PlayerGameList);