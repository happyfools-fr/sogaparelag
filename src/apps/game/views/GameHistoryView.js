// React imports
import React, { Component } from 'react';

// Style imports
import ListGroup from 'react-bootstrap/ListGroup'

// Direct imports
import HistoryItemView from './HistoryItemView';

export default function GameHistoryView(props) {

    return (
        <div>
        <h3>Game Log</h3>
        <ListGroup>
            {

                this.props.game ? (this.props.game.history.map(state => {
                    return (<HistoryItemView icon="fa-info-circle" value={state} />);
                })) : <HistoryItemView icon="fa-info-circle" value="Placeholder for game.history.state" />
            }
        </ListGroup>
        </div>
    )
}
