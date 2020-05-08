import React, { useState } from 'react';

import { Container, Col, Row } from 'react-bootstrap';

import {RoundAction} from '../model/RoundAction'

import ActionModal from './ActionModal';
import SickModal from './SickModal';
import ActionResultModal from './ActionResultModal';
import GameTableView from './GameTableView';
import GameHistoryView from './GameHistoryView';

/**
*   @param (String) slugname
*   @param (Game) game
*   @param (Player) player
*   @param (() => void) updateGameAndPlayers
*   @param (?) firebaseService
*/
export default function DayView(props) {

    const game = props.game
    const thisPlayer = props.thisPlayer

    const [showAction, setShowAction] = useState(false)
    const [actionResult, setActionResult] = useState({show:false, summary:""})
    const [showSick, setShowSick] = useState(false)


    const handleAction = (action, extras) => {
        const intExtras = parseInt(extras);
        const [result, resultSummary] = thisPlayer.performAction(game, action, intExtras);
        game.onPlayerTurnEnded(thisPlayer)
        props.updateGameAndPlayers()
        if (action===RoundAction.CollectWood && !result) {
            console.log("gotSick")
            setShowSick(true)
        } else {
            setActionResult({show:true, summary:resultSummary})
        }
        setShowAction(false)
    };

    if (!game._endOfGame) {

        if (thisPlayer.id === game.currentPlayerId) {

            // If player is sick, show sick modal
            if (thisPlayer.isSick && !showSick) {
                setShowSick(true)

            // If player is not sick anymore, hide it
            } else if (showSick && !thisPlayer.isSick) {
                setShowSick(false)

            // Show action when it is players turn and he is not sick anymore
            } else if (!thisPlayer.isSick && !actionResult.show && !showSick && !showAction) {
                setShowAction(!showAction)
            }
        }

        return(
            <div>
                <ActionModal
                    show={showAction}
                    weather={game._waterManager.currentWeather}
                    onAction={handleAction}
                />
                <ActionResultModal
                    actionResult={actionResult}
                    onHide={() => setActionResult({show:false, summary:""})}
                />
                <SickModal
                    showSick={showSick}
                    handleSick={() => {console.log("test");setShowSick(false);}}
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

    } else {
        return(<div />)
    }
}
