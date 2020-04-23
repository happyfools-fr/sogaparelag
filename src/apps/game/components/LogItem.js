// React imports
import React from 'react';

// Style imports
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup'

export default function LogItem(props) {
    return (
        <ListGroup.Item>
            <i class={"fas " + props.icon} />
            &nbsp;
            {props.value}
        </ListGroup.Item>
    );
};
