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

    const logs = (props.game) ? props.game.history : []

    const scrollToBottom = () => {
        logsEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [logs])

    return (
        <>
        <style type="text/css">
          {`
           .no-scoll-div {
               width:100%;
             overflow-y: hidden;
             overflow-x: hidden
           }

          .list-group {
            height: 73vh;
            width: 105%;
            overflow-y: scroll;
          }
          `}
        </style>
        <div>
        <h6>Game Log</h6>
        <div className="no-scoll-div">
            <ListGroup>
                {

                    props.game.history
                        .map(
                            (state,i) => {return (
                                <HistoryItemView
                                    key={i}
                                    icon="fa-info-circle"
                                    type={state.type}
                                    value={state.value}
                                />
                            )}
                        )
                }
                <div ref={logsEndRef} />
            </ListGroup>
        </div>
        </div>
        </>
    )
}
