import React from 'react';

import {Card} from 'react-bootstrap';

export default function RaftComponent(props) {
    return (
        <Card bg="success" text="white" className="text-center m-1">
            <Card.Body>
                <h2><i className="fas fa-sign-out-alt" />&nbsp;&nbsp;{props.inventory}</h2>
                <small>Rafts</small>
            </Card.Body>
        </Card>
    );
};
