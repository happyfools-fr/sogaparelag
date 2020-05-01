// React imports
import React, {useRef, useEffect} from 'react';

// Style imports
import ListGroup from 'react-bootstrap/ListGroup'

// Direct imports
import HistoryItemView from './HistoryItemView';

// Bootstrap
import {Card} from 'react-bootstrap'

export default function GameHistoryView(props) {

    const logsEndRef = useRef(null)


    const scrollToBottom = () => {
        logsEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [props.game.history])

    return (
        <>
        <style type="text/css">
          {`
          .list-group {
            height: 73vh;
            overflow-x: hidden;
          }
          `}
        </style>
        <Card border="light">
        <Card.Body>
        <Card.Title>Game Log</Card.Title>
        <ListGroup>
            {

                props.game.history
                    .map(
                        state => {return (
                            <HistoryItemView icon="fa-info-circle" type={state.type} value={state.value} />
                        )}
                    )
            }
            <div ref={logsEndRef} />
        </ListGroup>
        </Card.Body>
        </Card>
        </>
    )
}
