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
import DeadModal from './DeadModal';
import PollEndValidationModal from './PollEndValidationModal';
import GameTableView from './GameTableView';
import AllPlayersView from './AllPlayersView';
import SavedView from './SavedView';
import GameOverView from './GameOverView'

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

    console.log('GameView: after UseEffect');
    console.log("Game :",game)
    let clientPlayer = null;
    let showDeadModal = false;
    let showPollEndValidation = false;
    let showPollWater = false;
    let showPollFood = false;
    let showPoll = false;
    let pollType = "unknown";
    let showAction = false;

    function setShowBoolean(game, user)
    {
      if (game && user)
      {
        if (game._gameTable.players.filter(p => p.id === user.id).length > 0){
          clientPlayer = game._gameTable.players.filter(p => p.id === user.id)[0];
          console.log("clientPlayer is found in _gameTable.players", clientPlayer);
        } else {
          clientPlayer = game._gameTable.killedPlayers.filter(p => p.id === user.id)[0];
          console.log("clientPlayer is found in _gameTable.killedPlayers", clientPlayer);
        }
        showDeadModal = clientPlayer.isDead && !clientPlayer.spectateGame;
        if(!showDeadModal && !clientPlayer.isDead)
        {
          showPollEndValidation = (game.headPlayerId === clientPlayer.id) && (game.waterVoteEnded || game.footVoteEnded );
          showPollWater = !showPollEndValidation && game.pollWater && !clientPlayer.waterVote;
          showPollFood = !showPollEndValidation && game.pollFood && !clientPlayer.foodVote;
          showPoll = !showPollEndValidation && ((showPollWater && !showPollFood) || (!showPollWater && showPollFood));
          pollType = showPollWater ? "drink" : "eat";
          showAction = !showPollEndValidation && !showPoll && !clientPlayer.isSick && (game.currentPlayerId === clientPlayer.id);
          return;
        }
        showPollEndValidation = false;
        showPollWater = false;
        showPollFood = false;
        showPoll = false;
        pollType = "unknown";
        showAction = false;
      }
    }

    setShowBoolean(game, user);
    console.log("clientPlayer, showDeadModal, clientPlayer, showPollEndValidation, showPollWater, showPollFood, showPoll, pollType, showAction",
      clientPlayer, showDeadModal, clientPlayer, showPollEndValidation, showPollWater, showPollFood, showPoll, pollType, showAction);


    const handleAction = (action, extras) => {

        const player = game.currentPlayer;
        console.log("Selected action = ", action)
        console.log("extras", extras);

        let intExtras = parseInt(extras);
        console.log("intExtras", intExtras);
        player.performAction(game, action, parseInt(extras));
        console.log("player.performAction(game ", game)
        game._gameTable.players.forEach((p, i) => {
          playerController.update(p)
        });
        game._gameTable.killedPlayers.forEach((p, i) => {
          playerController.update(p)
        });
        gameController.update(game);
        // Update game in waiting room if needed
    };

    const handleVoteSubmit = (chosenPlayer) => {

        console.log("chosenPlayer", chosenPlayer);
        const votedPlayer = game._gameTable.players.filter(p => chosenPlayer.id === p.id)[0];
        console.log(`${clientPlayer.nickname} voted for ${votedPlayer.nickname}`)

        const actionToPerform = showPollWater ? RoundAction.WaterVote : RoundAction.FoodVote;
        clientPlayer.performVote(game, actionToPerform, votedPlayer.id);
        console.log("clientPlayer after vote", clientPlayer);
        game._gameTable.players.forEach((p, i) => {
          playerController.update(p)
        });
        game._gameTable.killedPlayers.forEach((p, i) => {
          playerController.update(p)
        });
        gameController.update(game);
        // Update game in waiting room if needed
    };


    const handlePollEndValidation = () => {
        console.log(`You have validated the end of the vote`);
        alert(`You have validated the end of the vote`);
        if (showPollWater){
          game.onWaterVoteEnded()
        } else {
          game.onFoodVoteEnded()
        }
        game._gameTable.players.forEach((p, i) => {
          playerController.update(p)
        });
        game._gameTable.killedPlayers.forEach((p, i) => {
          playerController.update(p)
        });
        gameController.update(game);
        // Update game in waiting room if needed
    };

    const handleSpectate = () => {
      alert(`You are dead man!`);
      clientPlayer.spectateGame = true;
      playerController.update(clientPlayer)
      game._gameTable.killedPlayers.forEach((p, i) => {
        playerController.update(p)
      });
      gameController.update(game);

    }

    if (game) {
      if(!game._endOfGame){
          return (
              <Container fluid>
                  <Row>
                      <Col className="p-2">
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
                              players={game._gameTable.players.filter(p => !p.isDead)}
                              pollType={pollType}
                              handleVoteSubmit={handleVoteSubmit}
                          />
                          <PollEndValidationModal
                              show={showPollEndValidation}
                              pollType={pollType}
                              handlePollEndValidation={handlePollEndValidation}
                          />
                          <DeadModal
                              show={showDeadModal}
                              handleSpectate={handleSpectate}
                          />
                      </Col>
                      <Col sm={4} className="p-2">
                          <GameHistoryView game={game} />
                      </Col>
                  </Row>
              </Container>
          );
        } else if (game._win){
            return (
              <SavedView
                players={game._gameTable.players}
                slugname={props.slugname}
              />
            );
        } else {
            return (
              <GameOverView
                slugname={props.slugname}
              />
            );
        }
    } else {
        return(<div />)
    }
}


export default GameView;
