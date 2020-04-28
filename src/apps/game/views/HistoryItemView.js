// React imports
import React from 'react';

// Style imports
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup'

export default function HistoryItemView(props) {
    return (
        <ListGroup.Item>
            <i className={"fas " + props.icon} />
            &nbsp;
            {props.value}
        </ListGroup.Item>
    );
};