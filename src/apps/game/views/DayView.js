import React, { useState } from 'react';

import { Container, Col, Row } from 'react-bootstrap';

import TurnModal from './TurnModal';
import SickModal from './SickModal';

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
    const [showSick, setShowSick] = useState(false)

    console.log("showAction", showAction)
    console.log("showSick", showSick)

    const handleAction = (action, extras) => {
        const intExtras = parseInt(extras);
        thisPlayer.performAction(game, action, intExtras);
        props.updateGameAndPlayers()
        setShowAction(false)
    };

    if (!game._endOfGame) {

        if (thisPlayer.id === game.currentPlayerId) {
            // If player is sick, show sick modal
            if (thisPlayer.isSick && !showSick) {
                setShowSick(true)

            // If player is not sick anymore and he has not closedthe modal, hide it
            } else if (showSick && !thisPlayer.isSick) {
                setShowSick(false)

            // Show action when it is players turn and he is not sick anymore
            } else if (!thisPlayer.isSick && !showAction) {
                setShowAction(true)
            }
        }

        return(
            <div>
                <TurnModal
                    show={showAction}
                    onAction={handleAction}
                />
                <SickModal
                    showSick={showSick}
                    handleSick={() => setShowSick(false)}
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
