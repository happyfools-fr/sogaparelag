import React, { useState, useEffect } from 'react';

import { Container, Col, Row } from 'react-bootstrap';

import DeadModal from './DeadModal';
import PollModal from './PollModal';
import PollEndValidationModal from './PollEndValidationModal';

import GameTableView from './GameTableView';
import GameHistoryView from './GameHistoryView';

import {RoundAction} from '../model/RoundAction'

/**
*   @param (String) slugname
*   @param (Game) game
*   @param (Player) player
*   @param (() => void) updateGameAndPlayers
*   @param (?) firebaseService
*
*/
export default function NightView (props) {

    const game = props.game

    const thisPlayer = props.thisPlayer

    const [poll, setPoll] = useState({show: false, type: "", endValidation: false})

    const [showDead, setShowDead] = useState(
        (thisPlayer)
        ? thisPlayer.isDead && !thisPlayer.spectateGame
        : false
    )


    if (!poll.show) {
        setPoll( {
            show : true,
            type : (game.pollWater) ? "drink" : "eat",
            endValidation : (thisPlayer.id === game.headPlayerId) && (game.waterVoteEnded || game.footVoteEnded),
        })
    }

    const handlePoll = (chosenPlayer) => {
        const actionToPerform = (poll.type === "drink") ? RoundAction.WaterVote : RoundAction.FoodVote;
        thisPlayer.performVote(game, actionToPerform, chosenPlayer.id);
        props.updateGameAndPlayers()
        setPoll({
            show: false,
            type: "",
            endValidation: false,
        })
    };

    const handleSpectate = () => {
      thisPlayer.spectateGame = true;
      setShowDead(false)
      props.updateGameAndPlayers()
    };


    const handlePollEndValidation = () => {

        if (poll.show && poll.type==="drink"){
          game.onWaterVoteEnded()
        } else if (poll.show && poll.type==="eat") {
          game.onFoodVoteEnded()
        } else {
          console.error("PollEndValidation fail");
        }

        props.updateGameAndPlayers()

        setPoll({
            show: false,
            type: "",
            endValidation: false,
        })
    };


    return(
        <div>
            <PollModal
                show={poll.show}
                players={game._gameTable.players.filter(p => !p.isDead)}
                pollType={poll.type}
                handlePoll={handlePoll}
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
            <Container fluid>
                <Row>
                    <Col className="p-2">
                        <GameTableView
                            className='mt-5'
                            slugname={props.slugname}
                            game={game}
                            firebaseService={props.firebaseService}
                        />
                    </Col>
                    <Col sm={4} className="p-2">
                        <GameHistoryView game={game} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
