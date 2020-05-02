import React from 'react';

import {Card} from 'react-bootstrap';

export default function RaftComponent(props) {
    return (
        <Card bg="success" text="white" className="mr-1">
            <Card.Body>
                <h2><i className="fas fa-sign-out-alt" />&nbsp;&nbsp;{props.inventory}</h2>
                <span style={{fontSize: 10}}>Rafts</span>
            </Card.Body>
        </Card>
    );
};
