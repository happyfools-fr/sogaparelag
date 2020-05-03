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
import SickModal from './SickModal'

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

    useEffect(
        () => {
            const unsubscribe = gameController.listen(gameId, setGame);
            return unsubscribe;
        },
        [gameId, setGame]
    );

    const playerController = new PlayerController(props.firebaseService.ft)
    let thisPlayer = playerController.get(user.id);

    const [poll, setPoll] = useState({show: false, type: "", endValidation: false})

    const [showAction, setShowAction] = useState(false)

    const [showDead, setShowDead] = useState(
        (thisPlayer)
        ? thisPlayer.isDead && !thisPlayer.spectateGame
        : false
    )

    const [showSick, setShowSick] = useState({show : false, click : 0})

    function setShowBoolean(game, user)
    {
        thisPlayer = game._gameTable.players.filter(p => p.id === user.id)[0];

        const shouldShowPoll = (game.pollWater || game.pollFood)
        const shouldShowAction = (thisPlayer.id === game.currentPlayerId) && !thisPlayer.isSick
        const shouldShowSick = (thisPlayer.id === game.currentPlayerId) && thisPlayer.isSick

        if (!poll.show && shouldShowPoll) {
            setPoll( {
                show : true,
                type : (game.pollWater) ? "drink" : "eat",
                endValidation : (thisPlayer.id === game.headPlayerId) && (game.waterVoteEnded || game.footVoteEnded),
            })
        } else if (!showAction && shouldShowAction){
            setShowAction(true)
        } else if (shouldShowSick && !showSick.show) {
            setShowSick({show: true, click: 0})
        } else if (!shouldShowSick && showSick.show) {
            setShowSick({show: false, click: 0})
        }
    }

    (game && user && !showDead && (!showSick.show || showSick.click) && !poll.endValidation) && setShowBoolean(game, user);


    const handleSick = () => {
        setShowSick({show: true, click: showSick.click + 1})
    }

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
        gameController.update(game);
        // Update game in waiting room if needed


        setShowAction(false)
    };

    const handleVoteSubmit = (chosenPlayer) => {

        console.log("chosenPlayer", chosenPlayer);
        const votedPlayer = game._gameTable.players.filter(p => chosenPlayer.id === p.id)[0];
        console.log(`${thisPlayer.nickname} voted for ${votedPlayer.nickname}`)

        const actionToPerform = (poll.type === "drink") ? RoundAction.WaterVote : RoundAction.FoodVote;
        thisPlayer.performVote(game, actionToPerform, votedPlayer.id);
        console.log("thisPlayer after vote", thisPlayer);
        game._gameTable.players.forEach((p, i) => {
          playerController.update(p)
        });
        gameController.update(game);
        // Update game in waiting room if needed

        setPoll({
            show: false,
            type: "",
            endValidation: false,
        })
    };


    const handlePollEndValidation = () => {

        console.log(`You have validated the end of the vote`);
        alert(`You have validated the end of the vote`);
        if (poll.show && poll.type==="drink"){
          game.onWaterVoteEnded()
        } else if (poll.show && poll.type==="eat") {
          game.onFoodVoteEnded()
        } else {
          console.error("PollEndValidation fail");
        }
        game._gameTable.players.forEach((p, i) => {
          playerController.update(p)
        });
        gameController.update(game);
        // Update game in waiting room if needed

        setPoll({
            show: false,
            type: "",
            endValidation: false,
        })
    };

    const handleSpectate = () => {
      alert(`You are dead man!`);
      thisPlayer.spectateGame = true;
      playerController.update(thisPlayer)
      setShowDead(false)
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
                          <SickModal
                              showSick={showSick}
                              handleSick={handleSick}
                          />
                          <PollModal
                              show={poll.show}
                              players={game._gameTable.players.filter(p => !p.isDead)}
                              pollType={poll.type}
                              handleVoteSubmit={handleVoteSubmit}
                          />
                          <PollEndValidationModal
                              show={poll.endValidation}
                              pollType={poll.type}
                              handlePollEndValidation={handlePollEndValidation}
                          />
                          <DeadModal
                              show={showDead}
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
