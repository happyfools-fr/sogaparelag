// React imports
import React, { useState, useEffect } from 'react';

// Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row } from 'react-bootstrap';

// Component imports
import GameHistoryView from './GameHistoryView';

// Controller imports
import GameController from '../controller/GameController';
import PlayerController from '../controller/PlayerController';

// View imports
import TurnModal from './TurnModal';
import PollModal from './PollModal';
import GameTableView from './GameTableView';
import AllPlayersView from './AllPlayersView';
import SavedView from './SavedView';

import {RoundAction} from '../model/RoundAction'


/**
* @params (Game) game
* @params {LoggedInUser} user
* @params {FirebaseService} firebaseService
*/
function GameView(props) {

    const gameId = props.gameId;
    const user = props.user;
    
    const gameController = new GameController(props.firebaseService.ft)
    const [game, setGame] = useState();

    const playerController = new PlayerController(props.firebaseService.ft)
    
    useEffect(
        () => {
            const unsubscribe = gameController.listen(gameId, setGame);
            return unsubscribe;
        },
        [gameId, setGame]
    );
    
    console.log('After UseEffect');
    const clientPlayer = (game && user) ? game._gameTable.players.filter(p => p.id === user._id)[0] : null;
    const showPollWater = (game && clientPlayer) ? (game.pollWater && !clientPlayer.waterVote) : false;
    const showPollFood = (game && clientPlayer) ? (game.pollFood && !clientPlayer.foodVote) : false;
    const showPoll = (showPollWater && !showPollFood) || (!showPollWater && showPollFood);
    const pollType = showPollWater ? "drink" : "eat";

    const showAction = (game && clientPlayer) ? (game.currentPlayerId === clientPlayer.id && !showPoll): false;
    
    const handleAction = (action, show) => {
      
        const player = game.currentPlayer;
        console.log("Selected action = ", action)
        alert("You have chosen to go to "+ action);
        
        player.performAction(game, action, 0);
        console.log("player.performAction(game ", game)
        game._gameTable.players.forEach((p, i) => {
          playerController.update(p)
        });
        gameController.update(game);
        // Update game in waiting room if needed
    };
    
    const handleVoteSubmit = (chosenPlayer) => {
      
        console.log("chosenPlayer", chosenPlayer);
        const votedPlayer = game._gameTable.players.filter(p => chosenPlayer.id === p.id)[0];
        console.log(`${clientPlayer.nickname} voted for ${votedPlayer.nickname}`)
        alert(`You have voted for ${votedPlayer.nickname}`);
        
        const actionToPerform = showPollWater ? RoundAction.WaterVote : RoundAction.FoodVote;
        clientPlayer.performVote(game, actionToPerform, votedPlayer.id);
        console.log("clientPlayer after vote", clientPlayer);
        game._gameTable.players.forEach((p, i) => {
          playerController.update(p)
        });
        gameController.update(game);

        // Update game in waiting room if needed
    };

    if (game) {
      if(!game._win){
          return (
              <Container fluid>
                  <Row>
                      <Col>
                          <GameTableView className='mt-5' slugname={props.slugname} game={game}/>
                          <AllPlayersView 
                              players={game._gameTable.players} 
                              currentPlayerId={game.currentPlayerId}
                              headPlayerId={game.headPlayerId}
                              firebaseService={props.firebaseService}
                          />
                          <TurnModal
                              show={showAction}
                              onAction={handleAction}
                          />
                          <PollModal
                              show={showPoll}
                              players={game._gameTable.players}
                              pollType={pollType}
                              handleVoteSubmit={handleVoteSubmit}
                          />
                      </Col>
                      <Col sm={4}>
                          <GameHistoryView game={game} />
                      </Col>
                  </Row>
              </Container>
          );
        } else {
            return (
              <SavedView 
                players={game._gameTable.players}
                slugname={props.slugname}
              />
            );
        }
    } else {
        return(<div />)
    }
}


export default GameView;
