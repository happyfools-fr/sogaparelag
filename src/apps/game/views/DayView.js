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

    const [showSick, setShowSick] = useState({show : false, click : 0})

    const handleSick = () => {
        setShowSick({show: true, click: showSick.click + 1})
    }

    const handleAction = (action, extras) => {
        let intExtras = parseInt(extras);
        thisPlayer.performAction(game, action, intExtras);
        props.updateGameAndPlayers()
        setShowAction(false)
    };

    if (!game._endOfGame) {

        if (thisPlayer.id === game.currentPlayerId) {
            if (thisPlayer.isSick && !showSick.click && !showSick.show) {
                setShowSick({show : true, click : 0})
            } else if (!showAction) {
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
                    handleSick={handleSick}
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
